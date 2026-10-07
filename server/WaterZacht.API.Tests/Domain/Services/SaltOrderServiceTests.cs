using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;
using WaterZacht.API.Configuration;
using WaterZacht.API.Exceptions;
using WaterZacht.API.Interfaces;
using WaterZacht.API.Services;
using WaterZacht.API.Tests.Dummies;
using WaterZacht.API.Tests.Fixtures;

namespace WaterZacht.API.Tests.Domain.Services;

public class SaltOrderServiceTests
{
    private const string Recipient = "zout@example.com";

    private readonly Mock<ISaltOrderValidator> saltOrderValidatorMock = new();
    private readonly Mock<ISaltOrderEmailLimiter> saltOrderEmailLimiterMock = new();
    private readonly Mock<IBrevoEmailService> brevoEmailServiceMock = new();
    private readonly FakeLogger<SaltOrderService> logger = new();

    public SaltOrderServiceTests()
    {
        saltOrderEmailLimiterMock
            .Setup(l => l.TryAcquire(It.IsAny<string>()))
            .Returns(true);
    }

    [Fact]
    public async Task AddSaltOrderAsync_WhenValidationFails_ThrowsBadRequestWithoutSending()
    {
        // Arrange
        var command = Dummy.CreatePickupOrder();

        saltOrderValidatorMock
            .Setup(v => v.ValidateAdd(command))
            .Throws(new BadRequestException("A pickup order has no address"));

        var service = CreateService();

        // Act
        await Assert.ThrowsAsync<BadRequestException>(
            () => service.AddSaltOrderAsync(command, CancellationToken.None));

        // Assert
        VerifyNothingSent();
    }

    [Fact]
    public async Task AddSaltOrderAsync_WithExhaustedEmailLimit_ThrowsTooManyRequestsWithoutSending()
    {
        // Arrange
        saltOrderEmailLimiterMock
            .Setup(l => l.TryAcquire(Dummy.Email))
            .Returns(false);

        var service = CreateService();

        // Act
        await Assert.ThrowsAsync<TooManyRequestsException>(
            () => service.AddSaltOrderAsync(Dummy.CreatePickupOrder(), CancellationToken.None));

        // Assert
        VerifyNothingSent();
    }

    [Fact]
    public async Task AddSaltOrderAsync_WithDeliveryOrder_SendsOrderWithAddressToRecipient()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder();
        var service = CreateService();

        // Act
        await service.AddSaltOrderAsync(command, CancellationToken.None);

        // Assert
        brevoEmailServiceMock.Verify(
            s => s.SendAsync(
                Recipient,
                command.Email,
                It.Is<string>(subject => subject.Contains("bezorgen") && subject.Contains(command.Name)),
                It.Is<string>(text => text.Contains("6 zakken van 15 kg") && text.Contains(Dummy.CreateAddress().Street)),
                It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Fact]
    public async Task AddSaltOrderAsync_WithPickupOrder_SendsConfirmationToCustomerWithReplyToRecipient()
    {
        // Arrange
        var command = Dummy.CreatePickupOrder();
        var service = CreateService();

        // Act
        await service.AddSaltOrderAsync(command, CancellationToken.None);

        // Assert
        brevoEmailServiceMock.Verify(
            s => s.SendAsync(
                command.Email,
                Recipient,
                It.IsAny<string>(),
                It.Is<string>(text => text.Contains("1 zak van 15 kg en 3 zakken van 25 kg") && text.Contains("Afhalen bij")),
                CancellationToken.None),
            Times.Once);
    }

    [Fact]
    public async Task AddSaltOrderAsync_WithNote_SendsNoteToRecipient()
    {
        // Arrange
        var command = Dummy.CreatePickupOrder(note: "Graag na 17:00");
        var service = CreateService();

        // Act
        await service.AddSaltOrderAsync(command, CancellationToken.None);

        // Assert
        brevoEmailServiceMock.Verify(
            s => s.SendAsync(Recipient, It.IsAny<string?>(), It.IsAny<string>(), It.Is<string>(text => text.Contains("Opmerking: Graag na 17:00")), It.IsAny<CancellationToken>()),
            Times.Once);
    }

    [Fact]
    public async Task AddSaltOrderAsync_WhenOrderMailFails_ThrowsWithoutConfirmation()
    {
        // Arrange
        brevoEmailServiceMock
            .Setup(s => s.SendAsync(Recipient, It.IsAny<string?>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new HttpRequestException("Brevo returned 500"));

        var service = CreateService();

        // Act
        await Assert.ThrowsAsync<HttpRequestException>(
            () => service.AddSaltOrderAsync(Dummy.CreatePickupOrder(), CancellationToken.None));

        // Assert
        brevoEmailServiceMock.Verify(
            s => s.SendAsync(Dummy.Email, It.IsAny<string?>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()),
            Times.Never);
    }

    [Fact]
    public async Task AddSaltOrderAsync_WhenConfirmationFails_LogsAndSucceeds()
    {
        // Arrange
        brevoEmailServiceMock
            .Setup(s => s.SendAsync(Dummy.Email, It.IsAny<string?>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new HttpRequestException("Brevo returned 400"));

        var service = CreateService();

        // Act
        await service.AddSaltOrderAsync(Dummy.CreatePickupOrder(), CancellationToken.None);

        // Assert
        var entry = Assert.Single(logger.Entries);
        Assert.Equal(LogLevel.Error, entry.Level);
    }

    private SaltOrderService CreateService()
    {
        return new SaltOrderService(
            saltOrderValidatorMock.Object,
            saltOrderEmailLimiterMock.Object,
            brevoEmailServiceMock.Object,
            Options.Create(new MailOptions { QuoteRequestRecipient = "info@example.com", SaltOrderRecipient = Recipient }),
            logger);
    }

    private void VerifyNothingSent()
    {
        brevoEmailServiceMock.Verify(
            s => s.SendAsync(It.IsAny<string>(), It.IsAny<string?>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()),
            Times.Never);
    }
}
