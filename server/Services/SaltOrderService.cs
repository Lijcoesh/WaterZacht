using System.Text;
using Microsoft.Extensions.Options;
using WaterZacht.API.Commands;
using WaterZacht.API.Configuration;
using WaterZacht.API.Constants;
using WaterZacht.API.Enums;
using WaterZacht.API.Exceptions;
using WaterZacht.API.Interfaces;

namespace WaterZacht.API.Services;

public class SaltOrderService : ISaltOrderService
{
    private const string ConfirmationSubject = "Uw zoutbestelling bij Water Zacht";

    private readonly ISaltOrderValidator _saltOrderValidator;
    private readonly ISaltOrderEmailLimiter _saltOrderEmailLimiter;
    private readonly IBrevoEmailService _brevoEmailService;
    private readonly IOptions<MailOptions> _mailOptions;
    private readonly ILogger<SaltOrderService> _logger;

    public SaltOrderService(
        ISaltOrderValidator saltOrderValidator,
        ISaltOrderEmailLimiter saltOrderEmailLimiter,
        IBrevoEmailService brevoEmailService,
        IOptions<MailOptions> mailOptions,
        ILogger<SaltOrderService> logger)
    {
        _saltOrderValidator = saltOrderValidator;
        _saltOrderEmailLimiter = saltOrderEmailLimiter;
        _brevoEmailService = brevoEmailService;
        _mailOptions = mailOptions;
        _logger = logger;
    }

    public async Task AddSaltOrderAsync(AddSaltOrder command, CancellationToken cancellationToken)
    {
        _saltOrderValidator.ValidateAdd(command);

        if (!_saltOrderEmailLimiter.TryAcquire(command.Email))
            throw new TooManyRequestsException("Too many orders for this email address");

        var recipient = _mailOptions.Value.SaltOrderRecipient;
        var methodLabel = GetMethodLabel(command.Method);

        await _brevoEmailService.SendAsync(
            recipient,
            command.Email,
            $"Zoutbestelling ({methodLabel.ToLowerInvariant()}): {command.Name}",
            CreateOrderText(command),
            cancellationToken);

        try
        {
            await _brevoEmailService.SendAsync(command.Email, recipient, ConfirmationSubject, CreateConfirmationText(command), CancellationToken.None);
        }
        catch (Exception ex)
        {
            // de bestelling is al bij Water Zacht binnen: een falende bevestiging mag hem niet laten mislukken
            _logger.LogError(ex, "Failed to send salt order confirmation");
        }
    }

    private static string CreateOrderText(AddSaltOrder command)
    {
        var text = new StringBuilder()
            .AppendLine($"Wijze: {GetMethodLabel(command.Method)}")
            .AppendLine($"Zout: {DescribeBags(command.Bags)}")
            .AppendLine()
            .AppendLine($"Naam: {command.Name}")
            .AppendLine($"Telefoon: {command.Phone}")
            .AppendLine($"E-mail: {command.Email}");

        if (command.Address is not null)
        {
            text.AppendLine()
                .AppendLine("Bezorgadres:")
                .AppendLine(command.Address.Street)
                .AppendLine($"{command.Address.PostalCode} {command.Address.City}");
        }

        if (command.Note.Length > 0)
        {
            text.AppendLine()
                .AppendLine($"Opmerking: {command.Note}");
        }

        return text
            .AppendLine()
            .Append("Betaling: achteraf op rekening.")
            .ToString();
    }

    private static string CreateConfirmationText(AddSaltOrder command)
    {
        var text = new StringBuilder()
            .AppendLine($"Beste {command.Name},")
            .AppendLine()
            .AppendLine("Bedankt voor uw bestelling. Wij hebben hem ontvangen en nemen hem in behandeling.")
            .AppendLine()
            .AppendLine($"Zout: {DescribeBags(command.Bags)}")
            .AppendLine($"Wijze: {GetMethodLabel(command.Method)}");

        if (command.Address is not null)
            text.AppendLine($"Bezorgadres: {command.Address.Street}, {command.Address.PostalCode} {command.Address.City}");

        text.AppendLine("Betaling: achteraf, op rekening");

        if (command.Method == DeliveryMethod.Pickup)
        {
            text.AppendLine()
                .AppendLine($"Afhalen bij {ContactConstants.PickupAddress}. Wij laten u weten wanneer uw zout klaarstaat.");
        }

        return text
            .AppendLine()
            .AppendLine($"Heeft u een vraag of wilt u iets wijzigen? Bel ons op {ContactConstants.PhoneDisplay} of beantwoord deze mail.")
            .AppendLine()
            .AppendLine("Met vriendelijke groet,")
            .Append(ContactConstants.CompanyName)
            .ToString();
    }

    private static string GetMethodLabel(DeliveryMethod method)
    {
        return method == DeliveryMethod.Delivery ? "Bezorgen" : "Zelf afhalen";
    }

    private static string DescribeBags(List<SaltOrderBag> bags)
    {
        return string.Join(" en ", bags.Select(b => $"{b.Count} {(b.Count == 1 ? "zak" : "zakken")} van {b.Size} kg"));
    }
}
