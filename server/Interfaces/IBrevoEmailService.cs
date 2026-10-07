namespace WaterZacht.API.Interfaces;

public interface IBrevoEmailService
{
    Task SendAsync(string toEmail, string? replyToEmail, string subject, string textContent, CancellationToken cancellationToken);
}
