import type { Theme } from '@mui/material/styles';

import { border, ink, navy, surface, white } from 'src/colors';
import { borderRadius } from 'src/Theme/sizes';

type Overrides = NonNullable<Theme['components']>;

export function overrideMuiButton(theme: Theme): Overrides['MuiButton'] {
    return {
        defaultProps: {
            disableElevation: true,
        },
        styleOverrides: {
            root: {
                borderRadius,
            },
            sizeMedium: {
                padding: '11px 18px',
                fontSize: '0.9rem',
            },
            sizeLarge: {
                padding: '16px 28px',
                fontSize: '1rem',
            },
        },
        variants: [
            {
                props: { variant: 'contained', color: 'primary' },
                style: {
                    '&:hover': {
                        // Kleur gelijk houden en iets donkerder filteren, zoals in het design
                        backgroundColor: theme.palette.primary.main,
                        filter: 'brightness(0.93)',
                    },
                },
            },
        ],
    };
}

export function overrideMuiIconButton(): Overrides['MuiIconButton'] {
    return {
        styleOverrides: {
            root: {
                borderRadius,
            },
        },
    };
}

// Keuzeknoppen (stappen in "De werking"): licht vlak, actief navy.
export function overrideMuiToggleButton(): Overrides['MuiToggleButton'] {
    return {
        styleOverrides: {
            root: {
                padding: '12px 16px',
                borderRadius,
                border: `1px solid ${border}`,
                backgroundColor: surface,
                color: ink,
                fontWeight: 600,
                fontSize: '0.9rem',
                lineHeight: 1,
                textTransform: 'none',
                transition: 'all .2s ease',
                '&:hover': {
                    backgroundColor: border,
                },
                '&.Mui-selected, &.Mui-selected:hover': {
                    backgroundColor: navy,
                    borderColor: navy,
                    color: white,
                },
            },
        },
    };
}
