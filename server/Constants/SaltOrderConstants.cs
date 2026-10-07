namespace WaterZacht.API.Constants;

// De frontend toont dezelfde regels uit src/Config/saltOrder.ts: wijzig ze samen.
public static class SaltOrderConstants
{
    public const int SmallBagSize = 15;

    public const int LargeBagSize = 25;

    public const int BagSizeCount = 2;

    public const int MaxPickupBagsPerSize = 99;

    public static readonly IReadOnlyList<(int Size, int Count)> DeliveryPackages = [(SmallBagSize, 6), (LargeBagSize, 4)];
}
