import { createTheme } from '@mui/material/styles';

import {
    overrideMuiAccordion,
    overrideMuiAccordionDetails,
    overrideMuiAccordionSummary,
} from './Components/accordion';
import {
    overrideMuiButton,
    overrideMuiIconButton,
    overrideMuiToggleButton,
} from './Components/buttons';
import { overrideMuiFilledInput } from './Components/inputs';
import { overrideMuiContainer, overrideMuiCssBaseline, overrideMuiLink } from './Components/layout';
import { overrideMuiPaper } from './Components/paper';
import palette from './palette';
import overrideShadows from './shadow';
import { borderRadius } from './sizes';
import typography from './typography';

const theme = createTheme({
    palette,
    typography,
    shape: {
        borderRadius,
    },
});

theme.components = {
    MuiAccordion: overrideMuiAccordion(),
    MuiAccordionDetails: overrideMuiAccordionDetails(),
    MuiAccordionSummary: overrideMuiAccordionSummary(theme),
    MuiButton: overrideMuiButton(theme),
    MuiContainer: overrideMuiContainer(theme),
    MuiCssBaseline: overrideMuiCssBaseline(),
    MuiFilledInput: overrideMuiFilledInput(),
    MuiIconButton: overrideMuiIconButton(),
    MuiLink: overrideMuiLink(),
    MuiPaper: overrideMuiPaper(theme),
    MuiToggleButton: overrideMuiToggleButton(),
};

theme.shadows = overrideShadows();

export default theme;
