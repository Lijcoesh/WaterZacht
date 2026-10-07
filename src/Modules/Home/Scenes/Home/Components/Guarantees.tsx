import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { blue, green, navy, white } from 'src/colors';
import SectionHeading from 'src/Components/SectionHeading';
import { sansFontFamily } from 'src/Theme/typography';

// De balk toont de periodes naar verhouding: 2 van de 10 jaar all-in, de rest op onderdelen
const periods = [
    {
        years: 2,
        label: 'Jaar 1 - 2',
        title: 'All-in garantie',
        text: 'Alles inbegrepen, zonder onderhoud te hoeven plegen.',
    },
    {
        years: 8,
        label: 'Jaar 3 - 10',
        title: 'Garantie op onderdelen',
        text: 'Daarna blijven alle onderdelen nog acht jaar onder garantie.',
    },
];

const useStyles = makeStyles()(theme => ({
    // Blauwe band als rustpunt tussen de lichte secties. Alle tekst is wit:
    // lichtere tinten halen geen 4.5:1 op dit blauw.
    root: {
        paddingTop: 'clamp(48px, 5.6vw, 80px)',
        paddingBottom: 'clamp(48px, 5.6vw, 80px)',
        backgroundColor: blue,
        backgroundImage: `linear-gradient(110deg, ${alpha(navy, 0)} 30%, ${alpha(navy, 0.35)} 100%)`,
    },
    layout: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
        gap: 'clamp(32px, 5vw, 80px)',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
        },
    },
    subtitle: {
        marginTop: 10,
        fontSize: 17,
        color: white,
    },
    bar: {
        display: 'flex',
        gap: 3,
        marginTop: 32,
        height: 10,
    },
    segment: {
        borderRadius: 5,
        backgroundColor: alpha(white, 0.35),
        '&:first-of-type': {
            backgroundColor: green,
        },
    },
    periods: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(20px, 3vw, 40px)',
        marginTop: 22,
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    },
    periodLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: white,
        '&::before': {
            content: '""',
            width: 18,
            height: 6,
            borderRadius: 3,
            backgroundColor: alpha(white, 0.35),
        },
    },
    periodLabelFirst: {
        '&::before': {
            backgroundColor: green,
        },
    },
    periodTitle: {
        marginTop: 8,
        fontFamily: sansFontFamily,
        fontSize: 16.5,
        color: white,
    },
    text: {
        marginTop: 6,
        fontSize: 15.5,
        lineHeight: 1.6,
        color: white,
    },
    service: {
        alignSelf: 'center',
        paddingLeft: 'clamp(32px, 4vw, 56px)',
        borderLeft: `1px solid ${alpha(white, 0.22)}`,
        [theme.breakpoints.down('md')]: {
            paddingLeft: 0,
            paddingTop: 32,
            borderLeft: 0,
            borderTop: `1px solid ${alpha(white, 0.22)}`,
        },
    },
    serviceIcon: {
        display: 'grid',
        placeItems: 'center',
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: `1px solid ${alpha(white, 0.35)}`,
        color: white,
    },
    serviceTitle: {
        marginTop: 18,
        fontFamily: sansFontFamily,
        fontSize: 16.5,
        color: white,
    },
}));

export default function Guarantees() {
    const { classes, cx } = useStyles();

    return (
        <section className={classes.root} aria-labelledby="guarantees-title">
            <Container className={classes.layout}>
                <div>
                    <SectionHeading id="guarantees-title" title="10 jaar garantie" dark />
                    <Typography className={classes.subtitle}>Zonder onderhoudscontract.</Typography>
                    <div className={classes.bar} aria-hidden="true">
                        {periods.map(period => (
                            <div
                                key={period.label}
                                className={classes.segment}
                                style={{ flexGrow: period.years }}
                            />
                        ))}
                    </div>
                    <div className={classes.periods}>
                        {periods.map((period, index) => (
                            <div key={period.label}>
                                <Typography
                                    variant="caption"
                                    component="p"
                                    className={cx(
                                        classes.periodLabel,
                                        index === 0 && classes.periodLabelFirst,
                                    )}
                                >
                                    {period.label}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    className={classes.periodTitle}
                                >
                                    {period.title}
                                </Typography>
                                <Typography className={classes.text}>{period.text}</Typography>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.service}>
                    <div className={classes.serviceIcon} aria-hidden="true">
                        <EmailOutlinedIcon />
                    </div>
                    <Typography variant="h4" component="h3" className={classes.serviceTitle}>
                        E-mailservice zoutvat
                    </Typography>
                    <Typography className={classes.text}>
                        Elke twee maanden een herinnering om uw zoutvat na te kijken.
                    </Typography>
                </div>
            </Container>
        </section>
    );
}
