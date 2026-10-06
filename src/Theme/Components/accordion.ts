import type { Theme } from '@mui/material/styles';

import { border, navy, slate } from 'src/colors';

type Overrides = NonNullable<Theme['components']>;

// Platte accordion: alleen een lijn eronder, geen kaart of schaduw.
export function overrideMuiAccordion(): Overrides['MuiAccordion'] {
    return {
        defaultProps: {
            disableGutters: true,
            elevation: 0,
            square: true,
        },
        styleOverrides: {
            root: {
                backgroundColor: 'transparent',
                borderBottom: `1px solid ${border}`,
                '&::before': {
                    display: 'none',
                },
            },
        },
    };
}

export function overrideMuiAccordionSummary(theme: Theme): Overrides['MuiAccordionSummary'] {
    return {
        styleOverrides: {
            root: {
                padding: 0,
                gap: theme.spacing(2),
                // Een <button> erft het lettertype niet van de body
                fontFamily: theme.typography.fontFamily,
            },
            content: {
                margin: '20px 0',
                fontWeight: 600,
                fontSize: '1.06rem',
                lineHeight: 1.4,
                color: navy,
            },
            expandIconWrapper: {
                transition: 'transform .25s ease',
                '&.Mui-expanded': {
                    transform: 'rotate(45deg)',
                },
            },
        },
    };
}

export function overrideMuiAccordionDetails(): Overrides['MuiAccordionDetails'] {
    return {
        styleOverrides: {
            root: {
                padding: '0 40px 22px 0',
                color: slate,
                lineHeight: 1.7,
            },
        },
    };
}
