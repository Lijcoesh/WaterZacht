import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { blue, navy, slate, surface, border } from 'src/colors';
import { postalCodeCity, street } from 'src/Config/contact';
import {
    expectedPickupDate,
    formatPickupDate,
} from 'src/Modules/SaltOrder/Logic/expectedPickupDate';
import { cardRadius } from 'src/Theme/sizes';

const useStyles = makeStyles()({
    root: {
        display: 'flex',
        gap: 14,
        padding: '16px 18px',
        backgroundColor: surface,
        border: `1px solid ${border}`,
        borderRadius: cardRadius,
    },
    icon: {
        flexShrink: 0,
        color: blue,
    },
    title: {
        fontWeight: 600,
        fontSize: 15.5,
        lineHeight: 1.4,
        color: navy,
    },
    text: {
        marginTop: 2,
        fontSize: 14.5,
        lineHeight: 1.55,
        color: slate,
    },
});

export default function PickupNotice() {
    const { classes } = useStyles();

    const date = expectedPickupDate();

    return (
        <div className={classes.root}>
            <EventAvailableIcon className={classes.icon} aria-hidden="true" />
            <div>
                <Typography className={classes.title}>
                    {date
                        ? `Verwachte ophaaldatum: ${formatPickupDate(date)}`
                        : 'Wij laten u weten wanneer uw zout klaarstaat'}
                </Typography>
                <Typography className={classes.text}>
                    Afhalen bij {street}, {postalCodeCity}.
                </Typography>
            </div>
        </div>
    );
}
