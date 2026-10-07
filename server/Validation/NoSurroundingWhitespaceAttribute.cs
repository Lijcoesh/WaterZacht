using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Text;

namespace WaterZacht.API.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public sealed class NoSurroundingWhitespaceAttribute : ValidationAttribute
{
    public NoSurroundingWhitespaceAttribute()
        : base("The {0} field may not start or end with whitespace or invisible characters.")
    {
    }

    public override bool IsValid(object? value)
    {
        return value switch
        {
            null => true,
            string text => text.Length == 0 || (IsVisibleEdge(text, fromEnd: false) && IsVisibleEdge(text, fromEnd: true)),
            _ => false,
        };
    }

    // per Rune, want een onzichtbaar teken kan buiten de BMP liggen (tag-tekens, U+E0020)
    private static bool IsVisibleEdge(string text, bool fromEnd)
    {
        if (fromEnd)
        {
            Rune.DecodeLastFromUtf16(text, out var last, out _);
            return IsVisible(last);
        }

        Rune.DecodeFromUtf16(text, out var first, out _);
        return IsVisible(first);
    }

    private static bool IsVisible(Rune rune)
    {
        if (Rune.IsWhiteSpace(rune) || Rune.IsControl(rune))
        {
            return false;
        }

        // Format: zero-width space (U+200B), U+FEFF e.d. De overige zijn letters of symbolen die leeg getoond worden
        // (Hangul fillers, braille blank); char.IsWhiteSpace ziet geen van beide
        return Rune.GetUnicodeCategory(rune) != UnicodeCategory.Format
            && rune.Value is not 0x115F and not 0x1160 and not 0x2800 and not 0x3164 and not 0xFFA0;
    }
}
