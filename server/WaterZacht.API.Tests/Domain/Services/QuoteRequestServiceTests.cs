using Microsoft.Extensions.Options;
using Moq;
using WaterZacht.API.Configuration;
using WaterZacht.API.Interfaces;
using WaterZacht.API.Services;
using WaterZacht.API.Tests.Dummies;

namespace WaterZacht.API.Tests.Domain.Services;

public class QuoteRequestServiceTests
{
    private const string Recipient = "info@example.com";

    private readonly Mock<IBrevoEmailService> brevoEmailServiceMock = new();

    [Fact]
    public async Task AddQuoteRequestAsync_WithRequest_SendsToRecipientWithReplyToCustomer()
    {
        // Arrange
        var command = Dummy.CreateAddQuoteRequest();
        var service = CreateService();

        // Act
        await service.AddQuoteRequestAsync(command, CancellationToken.None);

        // Assert
        brevoEmailServiceMock.Verify(
            s => s.SendAsync(
                Recipient,
                command.Email,
                It.Is<string>(subject => subject.Contains(command.Name)),
                It.Is<string>(text => text.Contains(command.Phone) && text.Contains(command.Message)),
                It.IsAny<CancellationToken>()),
            Times.Once);
    }

    private QuoteRequestService CreateService()
    {
        return new QuoteRequestService(
            brevoEmailServiceMock.Object,
            Options.Create(new MailOptions { QuoteRequestRecipient = Recipient, SaltOrderRecipient = "zout@example.com" }));
    }
}
