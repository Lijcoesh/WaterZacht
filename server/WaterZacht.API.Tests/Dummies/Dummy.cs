using WaterZacht.API.Commands;
using WaterZacht.API.Constants;
using WaterZacht.API.Enums;

namespace WaterZacht.API.Tests.Dummies;

public static class Dummy
{
    public const string Email = "klant@example.com";

    public static AddQuoteRequest CreateAddQuoteRequest()
    {
        return new AddQuoteRequest
        {
            Name = "Jan de Vries",
            Phone = "0612345678",
            Email = Email,
            Message = "Ik wil graag een offerte.",
        };
    }

    public static AddSaltOrder CreateDeliveryOrder(List<SaltOrderBag>? bags = null, SaltOrderAddress? address = null)
    {
        return CreateAddSaltOrder(
            DeliveryMethod.Delivery,
            bags ?? [CreateBag(SaltOrderConstants.SmallBagSize, 6)],
            address ?? CreateAddress());
    }

    public static AddSaltOrder CreatePickupOrder(List<SaltOrderBag>? bags = null, SaltOrderAddress? address = null, string note = "")
    {
        return CreateAddSaltOrder(
            DeliveryMethod.Pickup,
            bags ?? [CreateBag(SaltOrderConstants.SmallBagSize, 1), CreateBag(SaltOrderConstants.LargeBagSize, 3)],
            address,
            note);
    }

    public static SaltOrderBag CreateBag(int size, int count)
    {
        return new SaltOrderBag { Size = size, Count = count };
    }

    public static SaltOrderAddress CreateAddress()
    {
        return new SaltOrderAddress { Street = "Dorpsstraat 1", PostalCode = "2678 AB", City = "De Lier" };
    }

    private static AddSaltOrder CreateAddSaltOrder(DeliveryMethod method, List<SaltOrderBag> bags, SaltOrderAddress? address, string note = "")
    {
        return new AddSaltOrder
        {
            Method = method,
            Bags = bags,
            Name = "Jan de Vries",
            Phone = "0612345678",
            Email = Email,
            Address = address,
            Note = note,
        };
    }
}
