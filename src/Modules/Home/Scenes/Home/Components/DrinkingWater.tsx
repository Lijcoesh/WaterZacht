import { Container, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { border, slate, slateDark, white } from 'src/colors';
import drinkingWater from 'src/Resources/Images/drinkingWater.jpg';
import { cardRadius, sectionSpacing } from 'src/Theme/sizes';

import Photo from './Photo';
import SectionHeading from './SectionHeading';
import UnderlineLink from './UnderlineLink';

const services = ['Waterontijzering', 'Drukverhoging', 'Vloeistoffilters'];

const useStyles = makeStyles()({
    root: {
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(28px, 4vw, 64px)',
        alignItems: 'center',
    },
    visual: {
        flex: '1 1 340px',
        position: 'relative',
        aspectRatio: '16 / 11',
        minHeight: 280,
        borderRadius: cardRadius,
        overflow: 'hidden',
    },
    text: {
        flex: '1 1 340px',
    },
    lead: {
        marginTop: 16,
        lineHeight: 1.7,
        color: slate,
    },
    services: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        margin: '24px 0 0',
        padding: 0,
        listStyle: 'none',
    },
    service: {
        padding: '9px 15px',
        backgroundColor: white,
        border: `1px solid ${border}`,
        fontWeight: 500,
        fontSize: 14.5,
        lineHeight: 1,
        color: slateDark,
    },
    cta: {
        marginTop: 24,
    },
});

export default function DrinkingWater() {
    const { classes } = useStyles();

    return (
        <section id="drinkwater" className={classes.root} aria-labelledby="drinkwater-title">
            <Container className={classes.layout}>
                <div className={classes.visual}>
                    <Photo src={drinkingWater} alt="Hand die een glas water vasthoudt" />
                </div>
                <div className={classes.text}>
                    <SectionHeading
                        id="drinkwater-title"
                        eyebrow="06 · Drinkwaterzuivering"
                        title="Tot 98% eruit gefilterd wat er niet in thuishoort"
                    />
                    <Typography className={classes.lead}>
                        Kinetico heeft ook een programma voor drinkwaterzuivering waarmee tot wel
                        98% van alle stoffen die niet in water thuishoren eruit gefilterd kan
                        worden. En dat is wel zo gezond: volgens het RIVM zitten er nog steeds te
                        veel verkeerde stoffen en deeltjes in ons (drink)water.
                    </Typography>
                    <ul className={classes.services}>
                        {services.map(service => (
                            <li key={service} className={classes.service}>
                                {service}
                            </li>
                        ))}
                    </ul>
                    <div className={classes.cta}>
                        <UnderlineLink href="#contact">Meer over drinkwaterzuivering</UnderlineLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}
