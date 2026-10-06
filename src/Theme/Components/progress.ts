import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

import { white } from 'src/colors';

type Overrides = NonNullable<Theme['components']>;

// Dunne, rechte balken; de vulkleur zet de component zelf.
export function overrideMuiLinearProgress(): Overrides['MuiLinearProgress'] {
    return {
        styleOverrides: {
            root: {
                height: 6,
                borderRadius: 0,
                backgroundColor: alpha(white, 0.12),
            },
            bar: {
                transition: 'transform .35s ease',
            },
        },
    };
}
