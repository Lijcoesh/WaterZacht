using WaterZacht.API.Commands;

namespace WaterZacht.API.Interfaces;

public interface ISaltOrderValidator
{
    void ValidateAdd(AddSaltOrder command);
}
