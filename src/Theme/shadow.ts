// Schaduwtokens. Gebruik deze in makeStyles en component-overrides;
// overrideShadows() mapt ze op de 25 MUI elevation-niveaus.

import { alpha } from '@mui/material/styles';
import type { Shadows } from '@mui/material/styles';

import { navy } from 'src/colors';

export const softShadow = `0 1px 2px ${alpha(navy, 0.06)}`;
export const mediumShadow = `0 8px 20px -8px ${alpha(navy, 0.6)}`;
export const strongShadow = `0 12px 24px -12px ${alpha(navy, 0.6)}`;

export default function overrideShadows(): Shadows {
    return Array.from({ length: 25 }, (_, elevation) => {
        if (elevation === 0) return 'none';
        if (elevation <= 2) return softShadow;
        if (elevation <= 8) return mediumShadow;

        return strongShadow;
    }) as Shadows;
}
