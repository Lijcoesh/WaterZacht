import type { TypographyVariantsOptions } from '@mui/material/styles';

export const sansFontFamily = '"IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif';
export const serifFontFamily = '"Newsreader", Georgia, serif';

const typography: TypographyVariantsOptions = {
    fontFamily: sansFontFamily,
    h1: {
        fontFamily: serifFontFamily,
        fontWeight: 400,
        fontSize: 'clamp(38px, 5.2vw, 72px)',
        lineHeight: 1.02,
        letterSpacing: '-0.02em',
    },
    h2: {
        fontFamily: serifFontFamily,
        fontWeight: 400,
        fontSize: 'clamp(28px, 3.2vw, 44px)',
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
    },
    h3: {
        fontFamily: serifFontFamily,
        fontWeight: 400,
        fontSize: '1.5rem',
        lineHeight: 1.2,
    },
    h4: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.3,
    },
    body1: {
        fontSize: '1.03rem',
        lineHeight: 1.65,
    },
    body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
    },
    // Kleine labels boven waarden en velden
    caption: {
        fontWeight: 500,
        fontSize: '0.69rem',
        lineHeight: 1.4,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
    },
    button: {
        fontWeight: 600,
        textTransform: 'none',
        lineHeight: 1,
    },
};

export default typography;
