import { Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { navy, onDarkBody, onDarkMuted, onDarkStrong, white } from 'src/colors';
import SectionHeading from 'src/Components/SectionHeading';
import { sectionSpacing } from 'src/Theme/sizes';

import Photo from './Photo';

const highlights = [
    { title: 'Westland en omgeving', text: 'Persoonlijk advies bij u thuis' },
    { title: 'Eigen loodgieters', text: 'Installatie en service in eigen hand' },
];

const useStyles = makeStyles()({
    root: {
        backgroundColor: navy,
        color: onDarkStrong,
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(28px, 4vw, 72px)',
        alignItems: 'center',
    },
    portrait: {
        flex: '0 1 340px',
        position: 'relative',
        aspectRatio: '4 / 4.4',
        minHeight: 340,
        overflow: 'hidden',
    },
    text: {
        flex: '1 1 420px',
    },
    paragraph: {
        marginTop: 14,
        maxWidth: '46em',
        lineHeight: 1.7,
        color: onDarkBody,
        '&:first-of-type': {
            marginTop: 20,
        },
    },
    highlights: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 34,
        marginTop: 30,
        paddingTop: 26,
        borderTop: `1px solid ${alpha(white, 0.16)}`,
    },
    highlightTitle: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 1.2,
        color: white,
    },
    highlightText: {
        marginTop: 6,
        fontSize: 14,
        lineHeight: 1.4,
        color: onDarkMuted,
    },
});

export default function About() {
    const { classes } = useStyles();

    return (
        <section className={classes.root} aria-labelledby="over-title">
            <Container className={classes.layout}>
                <div className={classes.portrait}>
                    <Photo
                        alt="Martin van Wingerden"
                        placeholder="Foto nodig: Martin van Wingerden"
                    />
                </div>
                <div className={classes.text}>
                    <SectionHeading
                        id="over-title"
                        eyebrow="07 · Wie is Water Zacht"
                        title="De loodgieter uit het Westland die van zacht water zijn vak maakte"
                        dark
                    />
                    <Typography className={classes.paragraph}>
                        Water Zacht is een dochteronderneming van Loodgietersbedrijf Martin van
                        Wingerden en is gevestigd in het Westland. Martin installeerde al vaker
                        waterontharders bij klanten die direct enthousiast waren over de positieve
                        effecten. Hij is zich verder gaan verdiepen en specialiseren in de werking
                        en installatie van waterontharders.
                    </Typography>
                    <Typography className={classes.paragraph}>
                        De keuze voor Kinetico is dan ook heel bewust — zowel technisch als in
                        onderhoud en gebruiksvriendelijkheid. Nu wil Martin zoveel mogelijk
                        huishoudens in het Westland en omgeving de kracht van zacht water laten
                        ervaren.
                    </Typography>
                    <div className={classes.highlights}>
                        {highlights.map(item => (
                            <div key={item.title}>
                                <div className={classes.highlightTitle}>{item.title}</div>
                                <div className={classes.highlightText}>{item.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
