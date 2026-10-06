import type { PaletteOptions } from '@mui/material/styles';

import {
    background,
    blue,
    border,
    error,
    green,
    greenDark,
    greenHover,
    ink,
    navy,
    navyDeep,
    slate,
    white,
} from 'src/colors';

const palette: PaletteOptions = {
    primary: {
        main: green,
        dark: greenHover,
        // Wit op het merkgroen haalt maar 2.3:1; navy haalt 7.2:1.
        contrastText: navy,
    },
    secondary: {
        main: navy,
        dark: navyDeep,
        contrastText: white,
    },
    info: { main: blue },
    success: { main: greenDark },
    error: { main: error },
    background: {
        default: background,
        paper: white,
    },
    text: {
        primary: ink,
        secondary: slate,
    },
    divider: border,
};

export default palette;
