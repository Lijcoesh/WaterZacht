import { Button, Container, Link, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import { background, blue, green, greenLight, navy, onDarkHero, white } from 'src/colors';
import SectionHeading from 'src/Components/SectionHeading';
import { phoneDisplay, phoneHref } from 'src/Config/contact';
import { cardRadius, sectionSpacing } from 'src/Theme/sizes';

const useStyles = makeStyles()({
    root: {
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
        backgroundColor: background,
    },
    card: {
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'clamp(28px, 4vw, 64px)',
        padding: 'clamp(32px, 5vw, 72px)',
        borderRadius: cardRadius,
        backgroundColor: navy,
        // Zelfde gloed en groene rand als het LMVW-blok op Over ons
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
    text: {
        flex: '1 1 440px',
        position: 'relative',
    },
    lead: {
        marginTop: 18,
        maxWidth: '36em',
        lineHeight: 1.7,
        color: onDarkHero,
    },
    actions: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 14,
    },
    buttons: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
    },
    outlined: {
        borderColor: alpha(white, 0.4),
        color: white,
        '&:hover': {
            borderColor: alpha(white, 0.4),
            backgroundColor: alpha(white, 0.12),
        },
    },
    phone: {
        fontSize: 15,
        color: onDarkHero,
        '& a': {
            fontWeight: 600,
            color: white,
            '&:hover': {
                color: greenLight,
            },
        },
    },
});

export default function ClosingCta() {
    const { classes } = useStyles();

    return (
        <section className={classes.root} aria-labelledby="afsluiting-title">
            <Container>
                <div className={classes.card}>
                    <div className={classes.text}>
                        <SectionHeading
                            id="afsluiting-title"
                            title="Zacht water in huis? Wij komen graag bij u langs."
                            dark
                        />
                        <Typography className={classes.lead}>
                            Vraag een offerte op maat aan en Martin geeft u persoonlijk advies bij u
                            thuis. Heeft u al een ontharder? Dan bestelt u hier ook uw zout.
                        </Typography>
                    </div>
                    <div className={classes.actions}>
                        <div className={classes.buttons}>
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
                                component={RouterLink}
                                to="/zout-bestellen"
                                variant="outlined"
                                size="large"
                                className={classes.outlined}
                            >
                                Zout bestellen
                            </Button>
                        </div>
                        <Typography className={classes.phone}>
                            Of bel direct: <Link href={phoneHref}>{phoneDisplay}</Link>
                        </Typography>
                    </div>
                </div>
            </Container>
        </section>
    );
}
