import { Container, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { background, border, slate, slateDark } from 'src/colors';
import Photo from 'src/Components/Photo';
import SectionHeading from 'src/Components/SectionHeading';
import drinkingWater from 'src/Resources/Images/drinkingWater.jpg';
import { cardRadius, sectionSpacing } from 'src/Theme/sizes';

import UnderlineLink from './UnderlineLink';

const services = ['Waterontijzering', 'Drukverhoging', 'Vloeistoffilters'];

const useStyles = makeStyles()(theme => ({
    // Staat tussen de navy vergelijking en de witte Kinetico-sectie
    root: {
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
        backgroundColor: background,
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
        borderRadius: cardRadius,
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            aspectRatio: '4 / 3',
        },
    },
    text: {
        flex: '1 1 340px',
    },
    lead: {
        marginTop: 16,
        lineHeight: 1.7,
        color: slate,
    },
    // Gewone opsomming, gescheiden door haarlijnen: geen vlakken die op knoppen lijken
    services: {
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: 8,
        margin: '24px 0 0',
        padding: 0,
        listStyle: 'none',
    },
    service: {
        padding: '0 16px',
        borderLeft: `1px solid ${border}`,
        fontWeight: 500,
        lineHeight: 1.4,
        color: slateDark,
        '&:first-of-type': {
            paddingLeft: 0,
            borderLeft: 0,
        },
    },
    cta: {
        marginTop: 24,
    },
}));

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
                        <UnderlineLink to="/contact">Vraag een advies aan huis aan</UnderlineLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}
