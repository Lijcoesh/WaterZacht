import { Container, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { blueBright, border, navy, slate } from 'src/colors';
import SectionHeading from 'src/Components/SectionHeading';
import { sectionSpacing } from 'src/Theme/sizes';
import { serifFontFamily } from 'src/Theme/typography';

import UnderlineLink from './UnderlineLink';

const benefits = [
    {
        title: 'Kalkvrije douche en badkamer',
        text: 'Cabines, kranen en tegels drogen streeploos op. Antikalk en andere agressieve middelen heeft u niet meer nodig.',
    },
    {
        title: 'Uw apparatuur gaat langer mee',
        text: 'Geen kalk op de warmte-elementen van cv-ketel, vaatwasser, wasmachine, waterkoker, Quooker en koffieapparaat.',
    },
    {
        title: 'Verzachtend voor uw huid',
        text: 'Onthard water kan een verzachting geven op de huid en bij huidproblemen zoals eczeem.',
    },
    {
        title: 'Lagere was- en energierekening',
        text: 'De was wordt schoon op een lagere temperatuur, kleuren blijven beter behouden en wasverzachter is niet meer nodig.',
    },
    {
        title: 'Streeploos ramen en auto',
        text: 'Zonder kalk in het water wast u ramen en auto zonder moeite streeploos schoon.',
    },
    {
        title: 'Betere kwaliteit water',
        text: 'Minder kalk, een betere smaak. En met drinkwaterzuivering filtert u tot 98% van wat niet in water thuishoort.',
    },
];

const useStyles = makeStyles()({
    root: {
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(28px, 4vw, 72px)',
    },
    intro: {
        flex: '0 1 300px',
    },
    lead: {
        marginTop: 16,
        color: slate,
    },
    cta: {
        marginTop: 22,
    },
    list: {
        flex: '1 1 520px',
        margin: 0,
        padding: 0,
        listStyle: 'none',
        borderBottom: `1px solid ${border}`,
    },
    item: {
        display: 'flex',
        gap: 22,
        padding: '24px 0',
        borderTop: `1px solid ${border}`,
    },
    number: {
        flex: 'none',
        width: 44,
        fontFamily: serifFontFamily,
        fontWeight: 300,
        fontSize: 24,
        lineHeight: 1,
        color: blueBright,
    },
    itemTitle: {
        color: navy,
    },
    itemText: {
        marginTop: 8,
        maxWidth: '46em',
        fontSize: '1rem',
        lineHeight: 1.6,
        color: slate,
    },
});

export default function Benefits() {
    const { classes } = useStyles();

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
                </div>
                <ol className={classes.list}>
                    {benefits.map((benefit, index) => (
                        <li key={benefit.title} className={classes.item}>
                            <span className={classes.number} aria-hidden="true">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <div>
                                <Typography
                                    variant="h4"
                                    component="h3"
                                    className={classes.itemTitle}
                                >
                                    {benefit.title}
                                </Typography>
                                <Typography className={classes.itemText}>{benefit.text}</Typography>
                            </div>
                        </li>
                    ))}
                </ol>
            </Container>
        </section>
    );
}
