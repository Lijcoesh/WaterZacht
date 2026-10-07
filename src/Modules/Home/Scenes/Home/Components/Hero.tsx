import { Button, Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import { navy, onDarkHero, onDarkMuted, white } from 'src/colors';
import Photo from 'src/Components/Photo';
import { phoneDisplay, phoneHref } from 'src/Config/contact';
import hero from 'src/Resources/Images/hero.jpg';
import { serifFontFamily } from 'src/Theme/typography';

const stats = [
    { value: '€ 250,-', label: 'gemiddelde besparing per jaar' },
    { value: '10 jaar', label: 'garantie zonder onderhoudscontract' },
    { value: 'Geen elektra', label: 'regeneratie op waterdruk, sinds 1970' },
    { value: '30%', label: 'zuiniger in zoutverbruik' },
];

const useStyles = makeStyles()(theme => ({
    root: {
        position: 'relative',
        backgroundColor: navy,
    },
    visual: {
        position: 'relative',
        minHeight: 'min(84vh, 720px)',
        display: 'flex',
        alignItems: 'flex-end',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(100deg, ${alpha(navy, 0.92)} 0%, ${alpha(navy, 0.58)} 42%, ${alpha(navy, 0.12)} 78%, ${alpha(navy, 0.04)} 100%)`,
        pointerEvents: 'none',
        [theme.breakpoints.down('md')]: {
            background: alpha(navy, 0.72),
        },
    },
    content: {
        position: 'relative',
        paddingTop: 'clamp(56px, 8vw, 110px)',
        paddingBottom: 'clamp(44px, 5vw, 72px)',
    },
    text: {
        maxWidth: 680,
    },
    title: {
        color: white,
    },
    intro: {
        marginTop: 24,
        maxWidth: '33em',
        fontSize: 'clamp(17px, 1.4vw, 20px)',
        lineHeight: 1.6,
        color: onDarkHero,
    },
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 34,
    },
    outlined: {
        borderColor: alpha(white, 0.4),
        color: white,
        '&:hover': {
            borderColor: alpha(white, 0.4),
            backgroundColor: alpha(white, 0.12),
        },
    },
    stats: {
        borderTop: `1px solid ${alpha(white, 0.14)}`,
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
    },
    stat: {
        padding: '24px 26px',
        borderRight: `1px solid ${alpha(white, 0.14)}`,
        '&:first-of-type': {
            paddingLeft: 0,
        },
        '&:last-of-type': {
            paddingRight: 0,
            borderRight: 0,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '18px 0',
            borderRight: 0,
            borderBottom: `1px solid ${alpha(white, 0.14)}`,
            '&:last-of-type': {
                borderBottom: 0,
            },
        },
    },
    statValue: {
        fontFamily: serifFontFamily,
        fontWeight: 300,
        fontSize: 'clamp(28px, 2.6vw, 38px)',
        lineHeight: 1,
        color: white,
    },
    statLabel: {
        marginTop: 7,
        fontSize: 13.5,
        lineHeight: 1.4,
        color: onDarkMuted,
    },
}));

export default function Hero() {
    const { classes } = useStyles();

    return (
        <section id="top" className={classes.root} aria-labelledby="hero-title">
            <div className={classes.visual}>
                <Photo src={hero} alt="" />
                <div className={classes.overlay} />
                <Container className={classes.content}>
                    <div className={classes.text}>
                        <Typography id="hero-title" variant="h1" className={classes.title}>
                            Dé bescherming van uw apparatuur en gezondheid
                        </Typography>
                        <Typography className={classes.intro}>
                            In steeds meer huishoudens is hij inmiddels te vinden: de
                            waterontharder. Voorkom kalkaanslag, bescherm uw apparatuur, verbeter de
                            smaak en verzacht huidproblemen.
                        </Typography>
                        <div className={classes.actions}>
                            <Button
                                component={RouterLink}
                                to="/contact"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Gratis offerte op maat
                            </Button>
                            <Button
                                href={phoneHref}
                                variant="outlined"
                                size="large"
                                className={classes.outlined}
                            >
                                Bel {phoneDisplay}
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
            <div className={classes.stats}>
                <Container>
                    <div className={classes.statsGrid}>
                        {stats.map(stat => (
                            <div key={stat.label} className={classes.stat}>
                                <div className={classes.statValue}>{stat.value}</div>
                                <div className={classes.statLabel}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </section>
    );
}
