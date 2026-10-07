using WaterZacht.API.Constants;
using WaterZacht.API.Exceptions;
using WaterZacht.API.Tests.Dummies;
using WaterZacht.API.Validators;

namespace WaterZacht.API.Tests.Domain.Validators;

public class SaltOrderValidatorTests
{
    private readonly SaltOrderValidator validator = new();

    [Fact]
    public void ValidateAdd_WithDeliveryOfMinimum_DoesNotThrow()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder([Dummy.CreateBag(SaltOrderConstants.LargeBagSize, 4)]);

        // Act
        var exception = Record.Exception(() => validator.ValidateAdd(command));

        // Assert
        Assert.Null(exception);
    }

    [Fact]
    public void ValidateAdd_WithDeliveryAboveMinimum_DoesNotThrow()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder([Dummy.CreateBag(SaltOrderConstants.SmallBagSize, 10)]);

        // Act
        var exception = Record.Exception(() => validator.ValidateAdd(command));

        // Assert
        Assert.Null(exception);
    }

    [Fact]
    public void ValidateAdd_WithDeliveryOfBothSizesAtMinimum_DoesNotThrow()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder([
            Dummy.CreateBag(SaltOrderConstants.SmallBagSize, 6),
            Dummy.CreateBag(SaltOrderConstants.LargeBagSize, 4),
        ]);

        // Act
        var exception = Record.Exception(() => validator.ValidateAdd(command));

        // Assert
        Assert.Null(exception);
    }

    [Fact]
    public void ValidateAdd_WithDeliveryOfOneSizeBelowMinimum_ThrowsBadRequest()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder([
            Dummy.CreateBag(SaltOrderConstants.SmallBagSize, 6),
            Dummy.CreateBag(SaltOrderConstants.LargeBagSize, 1),
        ]);

        // Act & Assert
        Assert.Throws<BadRequestException>(() => validator.ValidateAdd(command));
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
    public void ValidateAdd_WithDeliveryBelowMinimum_ThrowsBadRequest()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder([Dummy.CreateBag(SaltOrderConstants.SmallBagSize, 5)]);

        // Act & Assert
        Assert.Throws<BadRequestException>(() => validator.ValidateAdd(command));
    }

    [Fact]
    public void ValidateAdd_WithDeliveryOfBothSizesBelowMinimum_ThrowsBadRequest()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder([
            Dummy.CreateBag(SaltOrderConstants.SmallBagSize, 5),
            Dummy.CreateBag(SaltOrderConstants.LargeBagSize, 3),
        ]);

        // Act & Assert
        Assert.Throws<BadRequestException>(() => validator.ValidateAdd(command));
    }

    [Fact]
    public void ValidateAdd_WithDeliveryOfSameSizeTwice_ThrowsBadRequest()
    {
        // Arrange
        var command = Dummy.CreateDeliveryOrder([
            Dummy.CreateBag(SaltOrderConstants.SmallBagSize, 6),
            Dummy.CreateBag(SaltOrderConstants.SmallBagSize, 6),
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
