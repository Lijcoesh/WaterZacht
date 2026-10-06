import type { Theme } from '@mui/material/styles';

import { blue, greenHover } from 'src/colors';
import { contentMaxWidth, pageGutter, pageGutterSmall } from 'src/Theme/sizes';

type Overrides = NonNullable<Theme['components']>;

export function overrideMuiCssBaseline(): Overrides['MuiCssBaseline'] {
    return {
        styleOverrides: {
            body: {
                WebkitFontSmoothing: 'antialiased',
                textWrap: 'pretty',
            },
            'html:focus-within': {
                scrollBehavior: 'smooth',
            },
            '@media (prefers-reduced-motion: reduce)': {
                'html:focus-within': {
                    scrollBehavior: 'auto',
                },
            },
            // Ruimte voor de sticky header bij springen naar een anker
            '[id]': {
                scrollMarginTop: 80,
            },
        },
    };
}

// Eén inhoudsbreedte voor de hele site: 1280px + gutters.
export function overrideMuiContainer(theme: Theme): Overrides['MuiContainer'] {
    return {
        defaultProps: {
            maxWidth: false,
        },
        styleOverrides: {
            root: {
                maxWidth: contentMaxWidth + 2 * pageGutter,
                paddingLeft: pageGutter,
                paddingRight: pageGutter,
                [theme.breakpoints.down('sm')]: {
                    paddingLeft: pageGutterSmall,
                    paddingRight: pageGutterSmall,
                },
            },
        },
    };
}

export function overrideMuiLink(): Overrides['MuiLink'] {
    return {
        defaultProps: {
            underline: 'none',
        },
        styleOverrides: {
            root: {
                color: blue,
                '&:hover': {
                    color: greenHover,
                },
            },
        },
    };
}
