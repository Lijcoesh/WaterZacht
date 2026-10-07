import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import { muted } from 'src/colors';

interface IProps {
    // Wat de bezoeker verstuurt, zoals "aanvraag" of "bestelling"
    subject: string;
    className?: string;
}

const useStyles = makeStyles()({
    root: {
        fontSize: 13.5,
        lineHeight: 1.5,
        color: muted,
    },
});

export default function PrivacyNotice(props: IProps) {
    const { subject, className } = props;

    const { classes, cx } = useStyles();

    // Nieuw tabblad, zodat wat al is ingevuld niet verloren gaat
    return (
        <Typography className={cx(classes.root, className)}>
            Wij gebruiken uw gegevens alleen om uw {subject} af te handelen. Lees meer in onze{' '}
            <Link component={RouterLink} to="/privacy" target="_blank" rel="noopener">
                privacyverklaring (opent in een nieuw tabblad)
            </Link>
            .
        </Typography>
    );
}
