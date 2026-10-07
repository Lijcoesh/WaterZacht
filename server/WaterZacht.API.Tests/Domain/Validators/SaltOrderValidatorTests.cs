using WaterZacht.API.Constants;
using WaterZacht.API.Exceptions;
using WaterZacht.API.Tests.Dummies;
using WaterZacht.API.Validators;

namespace WaterZacht.API.Tests.Domain.Validators;

public class SaltOrderValidatorTests
{
    private readonly SaltOrderValidator validator = new();

    [Fact]
    public void ValidateAdd_WithDeliveryPackage_DoesNotThrow()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder([Dummy.CreateBag(SaltOrderConstants.LargeBagSize, 4)]);

        // Act
        var exception = Record.Exception(() => validator.ValidateAdd(command));

        // Assert
        Assert.Null(exception);
    }

    [Fact]
    public void ValidateAdd_WithDeliveryWithoutAddress_ThrowsBadRequest()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder() with { Address = null };

        // Act & Assert
        Assert.Throws<BadRequestException>(() => validator.ValidateAdd(command));
    }

    [Fact]
    public void ValidateAdd_WithDeliveryOfOtherCount_ThrowsBadRequest()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder([Dummy.CreateBag(SaltOrderConstants.SmallBagSize, 4)]);

        // Act & Assert
        Assert.Throws<BadRequestException>(() => validator.ValidateAdd(command));
    }

    [Fact]
    public void ValidateAdd_WithDeliveryOfTwoPackages_ThrowsBadRequest()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder([
            Dummy.CreateBag(SaltOrderConstants.SmallBagSize, 6),
            Dummy.CreateBag(SaltOrderConstants.LargeBagSize, 4),
        ]);

        // Act & Assert
        Assert.Throws<BadRequestException>(() => validator.ValidateAdd(command));
    }

    [Fact]
    public void ValidateAdd_WithPickupOfBothSizes_DoesNotThrow()
    {
        // Arrange
        var command = Dummy.CreatePickupOrder();

        // Act
        var exception = Record.Exception(() => validator.ValidateAdd(command));

        // Assert
        Assert.Null(exception);
    }

    [Fact]
    public void ValidateAdd_WithPickupWithAddress_ThrowsBadRequest()
    {
        // Arrange
        var command = Dummy.CreatePickupOrder(address: Dummy.CreateAddress());

        // Act & Assert
        Assert.Throws<BadRequestException>(() => validator.ValidateAdd(command));
    }

    [Fact]
    public void ValidateAdd_WithPickupOfSameSizeTwice_ThrowsBadRequest()
    {
        // Arrange
        var command = Dummy.CreatePickupOrder([
            Dummy.CreateBag(SaltOrderConstants.SmallBagSize, 1),
            Dummy.CreateBag(SaltOrderConstants.SmallBagSize, 2),
        ]);

        // Act & Assert
        Assert.Throws<BadRequestException>(() => validator.ValidateAdd(command));
    }
}
