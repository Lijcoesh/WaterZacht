import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { blue, green, navy, onDarkHero, onDarkMuted, onDarkNav, white } from 'src/colors';
import SectionHeading from 'src/Components/SectionHeading';
import { parentCompanyDomain, parentCompanyName, parentCompanyUrl } from 'src/Config/contact';
import { cardRadius, sectionSpacing } from 'src/Theme/sizes';
import { serifFontFamily } from 'src/Theme/typography';

const services = [
    'Badkamers en toiletten',
    'Cv-ketels en vloerverwarming',
    'Mechanische ventilatie',
    'Loodgieterswerk en reparaties',
    'Verstoppingen en rioolinspectie',
];

const useStyles = makeStyles()(theme => ({
    root: {
        marginTop: sectionSpacing,
    },
    card: {
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(32px, 5vw, 80px)',
        padding: 'clamp(28px, 5vw, 64px)',
        borderRadius: cardRadius,
        backgroundColor: navy,
        // Zachte blauwe gloed rechtsboven, zoals het water in het logo
        backgroundImage: `radial-gradient(circle at 100% 0%, ${alpha(blue, 0.45)} 0%, ${alpha(blue, 0)} 55%)`,
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: green,
        },
    },
    story: {
        flex: '1 1 420px',
        position: 'relative',
    },
    paragraph: {
        marginTop: 20,
        maxWidth: '38em',
        lineHeight: 1.7,
        color: onDarkHero,
    },
    action: {
        marginTop: 30,
        borderColor: alpha(white, 0.4),
        color: white,
        '&:hover': {
            borderColor: alpha(white, 0.4),
            backgroundColor: alpha(white, 0.12),
        },
    },
    visuallyHidden: {
        position: 'absolute',
        width: 1,
        height: 1,
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        whiteSpace: 'nowrap',
    },
    facts: {
        flex: '1 1 300px',
        position: 'relative',
        alignSelf: 'center',
    },
    year: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 14,
        paddingBottom: 22,
        borderBottom: `1px solid ${alpha(white, 0.14)}`,
    },
    yearValue: {
        fontFamily: serifFontFamily,
        fontWeight: 300,
        fontSize: 'clamp(48px, 5vw, 68px)',
        lineHeight: 1,
        color: white,
    },
    yearLabel: {
        fontSize: 14,
        lineHeight: 1.4,
        color: onDarkMuted,
    },
    list: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 0',
        borderBottom: `1px solid ${alpha(white, 0.14)}`,
        fontSize: 15.5,
        lineHeight: 1.4,
        color: onDarkNav,
        '&::before': {
            content: '""',
            flexShrink: 0,
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: green,
        },
        '&:last-of-type': {
            borderBottom: 0,
            paddingBottom: 0,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 15,
        },
    },
}));

export default function ParentCompany() {
    const { classes } = useStyles();

    return (
        <section className={classes.root} aria-labelledby="lmvw-title">
            <Container>
                <div className={classes.card}>
                    <div className={classes.story}>
                        <SectionHeading
                            id="lmvw-title"
                            eyebrow="Het moederbedrijf"
                            title={parentCompanyName}
                            dark
                        />
                        <Typography className={classes.paragraph}>
                            Achter Water Zacht staat het loodgietersbedrijf dat Martin in 2006
                            oprichtte en dat door mond-tot-mondreclame is uitgegroeid tot een
                            vertrouwd adres in het Westland. Vanuit het bedrijfspand in De Lier, met
                            een eigen presentatieruimte voor sanitair en radiatoren, verzorgt het
                            team het installatiewerk in en om het huis.
                        </Typography>
                        <Button
                            href={parentCompanyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            size="large"
                            endIcon={<OpenInNewIcon />}
                            className={classes.action}
                        >
                            Bezoek {parentCompanyDomain}
                            <span className={classes.visuallyHidden}>
                                {' '}
                                (opent in een nieuw tabblad)
                            </span>
                        </Button>
                    </div>
                    <div className={classes.facts}>
                        <div className={classes.year}>
                            <span className={classes.yearValue}>2006</span>
                            <span className={classes.yearLabel}>
                                opgericht door
                                <br />
                                Martin van Wingerden
                            </span>
                        </div>
                        <ul
                            className={classes.list}
                            aria-label="Diensten van het loodgietersbedrijf"
                        >
                            {services.map(service => (
                                <li key={service} className={classes.item}>
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </section>
    );
}
