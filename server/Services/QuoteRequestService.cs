using Microsoft.Extensions.Options;
using WaterZacht.API.Commands;
using WaterZacht.API.Configuration;
using WaterZacht.API.Interfaces;

namespace WaterZacht.API.Services;

public class QuoteRequestService : IQuoteRequestService
{
    private readonly IBrevoEmailService _brevoEmailService;
    private readonly IOptions<MailOptions> _mailOptions;

    public QuoteRequestService(IBrevoEmailService brevoEmailService, IOptions<MailOptions> mailOptions)
    {
        _brevoEmailService = brevoEmailService;
        _mailOptions = mailOptions;
    }

    public async Task AddQuoteRequestAsync(AddQuoteRequest command, CancellationToken cancellationToken)
    {
        var subject = $"Offerteaanvraag: {command.Name}";
        var textContent = $"""
            Naam: {command.Name}
            Telefoon: {command.Phone}
            E-mail: {command.Email}

            Bericht:
            {command.Message}
            """;

        await _brevoEmailService.SendAsync(_mailOptions.Value.QuoteRequestRecipient, command.Email, subject, textContent, cancellationToken);
    }
}
