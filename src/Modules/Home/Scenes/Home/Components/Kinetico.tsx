import { Container, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { background, borderSoft, green, muted, slate, slateDark, white } from 'src/colors';
import Photo from 'src/Components/Photo';
import SectionHeading from 'src/Components/SectionHeading';
import { cardRadius, sectionSpacing } from 'src/Theme/sizes';

const advantages = [
    'Geen elektra in of op het toestel: minder storingsgevoelig én energiebesparend',
    'Regeneratie op waterdruk ná volumemeting, dus niet op tijd',
    'Zuinig in zoutverbruik: 30% minder dan andere toestellen',
    'Geen onderhoudscontract en toch 10 jaar garantie',
    'Regenereert met onthard water en is erg stil tijdens de regeneratie',
    'Harsen van de hoogste kwaliteit, gevuld tot aan de hals van de flessen',
    'Zeer laag verbruik van afvalwater bij regeneratie',
    'CE- en Vras-certificaat',
    'Het meest compacte systeem mét het hoogste rendement',
    'Bij de mini KB zijn harstank en zoutvat los te monteren',
    'Levensduur tussen de 20 en 30 jaar',
];

const useStyles = makeStyles()({
    root: {
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
        backgroundColor: white,
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(28px, 4vw, 72px)',
    },
    story: {
        flex: '1 1 420px',
    },
    paragraph: {
        marginTop: 14,
        maxWidth: '44em',
        fontSize: 17,
        lineHeight: 1.7,
        color: slate,
        '&:first-of-type': {
            marginTop: 20,
        },
    },
    dealer: {
        position: 'relative',
        marginTop: 26,
        width: 180,
        height: 60,
        backgroundColor: white,
        border: `1px solid ${borderSoft}`,
    },
    card: {
        flex: '1 1 380px',
        backgroundColor: background,
        border: `1px solid ${borderSoft}`,
        borderRadius: cardRadius,
        padding: 'clamp(24px, 3vw, 36px)',
    },
    cardTitle: {
        margin: 0,
        color: muted,
    },
    list: {
        margin: '20px 0 0',
        padding: 0,
        listStyle: 'none',
        display: 'grid',
        gap: 13,
    },
    item: {
        display: 'flex',
        gap: 12,
        fontSize: 15.5,
        lineHeight: 1.55,
        color: slateDark,
        '&::before': {
            content: '"✓"',
            color: green,
        },
    },
});

export default function Kinetico() {
    const { classes } = useStyles();

    return (
        <section id="kinetico" className={classes.root} aria-labelledby="kinetico-title">
            <Container className={classes.layout}>
                <div className={classes.story}>
                    <SectionHeading
                        id="kinetico-title"
                        eyebrow="04 · Het merk"
                        title="Kinetico: de Ferrari van de waterzuivering"
                    />
                    <Typography className={classes.paragraph}>
                        Water Zacht werkt met ontharders van Kinetico. Het bedrijf bestaat al sinds
                        1970 en heeft het regenereren op waterdruk uitgevonden. Kinetico geeft 10
                        jaar garantie op de onderdelen, waarvan de eerste 2 jaar all-in — zonder
                        onderhoud te hoeven plegen.
                    </Typography>
                    <Typography className={classes.paragraph}>
                        De ontharders werken geheel zonder elektra. Ze zijn daardoor veel minder
                        storingsgevoelig, energiebesparend en 30% zuiniger in het verbruik van zout.
                    </Typography>
                    <div className={classes.dealer}>
                        <Photo
                            alt="Kinetico Approved Dealer"
                            placeholder="Logo nodig: Kinetico dealer"
                            fit="contain"
                        />
                    </div>
                </div>
                <div className={classes.card}>
                    <Typography variant="caption" component="h3" className={classes.cardTitle}>
                        Voordelen t.o.v. andere merken
                    </Typography>
                    <ul className={classes.list}>
                        {advantages.map(advantage => (
                            <li key={advantage} className={classes.item}>
                                {advantage}
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </section>
    );
}
