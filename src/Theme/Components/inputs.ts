import type { Theme } from '@mui/material/styles';

import { blue, borderInput, ink, inputBackground, muted } from 'src/colors';

type Overrides = NonNullable<Theme['components']>;

export function overrideMuiFilledInput(): Overrides['MuiFilledInput'] {
    return {
        defaultProps: {
            hiddenLabel: true,
            fullWidth: true,
        },
        styleOverrides: {
            root: {
                borderRadius: 0,
                backgroundColor: inputBackground,
                color: ink,
                '&:hover, &.Mui-focused': {
                    backgroundColor: inputBackground,
                },
                '&::before': {
                    borderBottomColor: borderInput,
                },
                '&::after': {
                    borderBottomColor: blue,
                },
            },
            input: {
                padding: '13px 14px',
                '&::placeholder': {
                    color: muted,
                    opacity: 1,
                },
            },
            // De textarea krijgt zelf de padding van `input`
            multiline: {
                padding: 0,
            },
        },
    };
}
