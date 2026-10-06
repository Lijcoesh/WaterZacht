import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import ShowerIcon from '@mui/icons-material/Shower';
import SpaIcon from '@mui/icons-material/Spa';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { Container, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { background, greenDark, greenTintStrong, navy, slate, white } from 'src/colors';
import Photo from 'src/Components/Photo';
import SectionHeading from 'src/Components/SectionHeading';
import appliances from 'src/Resources/Images/appliances.jpg';
import bathroom from 'src/Resources/Images/bathroom.jpg';
import tapGlass from 'src/Resources/Images/tapGlass.jpg';
import { cardRadius, sectionSpacing } from 'src/Theme/sizes';

import UnderlineLink from './UnderlineLink';

const benefits = [
    {
        icon: <ShowerIcon />,
        title: 'Kalkvrije douche en badkamer',
        text: 'Cabines, kranen en tegels drogen streeploos op. Antikalk en andere agressieve middelen heeft u niet meer nodig.',
    },
    {
        icon: <KitchenIcon />,
        title: 'Uw apparatuur gaat langer mee',
        text: 'Geen kalk op de warmte-elementen van cv-ketel, vaatwasser, wasmachine, waterkoker, Quooker en koffieapparaat.',
    },
    {
        icon: <SpaIcon />,
        title: 'Verzachtend voor uw huid',
        text: 'Onthard water kan een verzachting geven op de huid en bij huidproblemen zoals eczeem.',
    },
    {
        icon: <LocalLaundryServiceIcon />,
        title: 'Lagere was- en energierekening',
        text: 'De was wordt schoon op een lagere temperatuur, kleuren blijven beter behouden en wasverzachter is niet meer nodig.',
    },
    {
        icon: <DirectionsCarIcon />,
        title: 'Streeploos ramen en auto',
        text: 'Zonder kalk in het water wast u ramen en auto zonder moeite streeploos schoon.',
    },
    {
        icon: <WaterDropIcon />,
        title: 'Betere kwaliteit water',
        text: 'Minder kalk, een betere smaak. En met drinkwaterzuivering filtert u tot 98% van wat niet in water thuishoort.',
    },
];

const useStyles = makeStyles()(theme => ({
    root: {
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
        backgroundColor: white,
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(28px, 4vw, 64px)',
    },
    intro: {
        flex: '1 1 340px',
    },
    lead: {
        marginTop: 16,
        maxWidth: '30em',
        color: slate,
    },
    cta: {
        marginTop: 22,
    },
    // Eén grote foto met twee kleinere eronder
    collage: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        marginTop: 34,
    },
    photo: {
        position: 'relative',
        aspectRatio: '4 / 3',
        borderRadius: cardRadius,
        overflow: 'hidden',
    },
    photoLarge: {
        gridColumn: '1 / -1',
        aspectRatio: '16 / 9',
    },
    cards: {
        flex: '1.4 1 520px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 14,
        alignContent: 'start',
        margin: 0,
        padding: 0,
        listStyle: 'none',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    },
    card: {
        padding: 'clamp(20px, 2.2vw, 28px)',
        backgroundColor: background,
        borderRadius: cardRadius,
    },
    icon: {
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: greenTintStrong,
        color: greenDark,
        '& svg': {
            fontSize: 24,
        },
    },
    cardTitle: {
        marginTop: 18,
        color: navy,
    },
    cardText: {
        marginTop: 8,
        fontSize: 15.5,
        lineHeight: 1.6,
        color: slate,
    },
}));

export default function Benefits() {
    const { classes, cx } = useStyles();

    return (
        <section id="voordelen" className={classes.root} aria-labelledby="voordelen-title">
            <Container className={classes.layout}>
                <div className={classes.intro}>
                    <SectionHeading
                        id="voordelen-title"
                        eyebrow="01 · Voordelen"
                        title="Geen kalk meer, in uw hele huis"
                    />
                    <Typography className={classes.lead}>
                        Agressieve schoonmaakmiddelen voor uw douche of bad kunnen de deur uit. Met
                        een waterontharder droogt uw badkamer streeploos en kalkvrij op.
                    </Typography>
                    <div className={classes.cta}>
                        <UnderlineLink to="/contact">Vraag een advies aan huis aan</UnderlineLink>
                    </div>
                    <div className={classes.collage}>
                        <div className={cx(classes.photo, classes.photoLarge)}>
                            <Photo
                                src={bathroom}
                                alt="Douchecabine met glazen wand en marmeren tegels"
                            />
                        </div>
                        <div className={classes.photo}>
                            <Photo src={appliances} alt="Leidingwerk in een technische ruimte" />
                        </div>
                        <div className={classes.photo}>
                            <Photo
                                src={tapGlass}
                                alt="Glas dat onder de keukenkraan wordt gevuld"
                            />
                        </div>
                    </div>
                </div>
                <ul className={classes.cards}>
                    {benefits.map(benefit => (
                        <li key={benefit.title} className={classes.card}>
                            <span className={classes.icon} aria-hidden="true">
                                {benefit.icon}
                            </span>
                            <Typography variant="h4" component="h3" className={classes.cardTitle}>
                                {benefit.title}
                            </Typography>
                            <Typography className={classes.cardText}>{benefit.text}</Typography>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
