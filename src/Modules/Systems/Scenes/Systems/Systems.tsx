import { Button, ButtonBase, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import {
    background,
    border,
    greenDark,
    greenTint,
    muted,
    navy,
    slate,
    surface,
    white,
} from 'src/colors';
import Photo from 'src/Components/Photo';
import SectionHeading from 'src/Components/SectionHeading';
import { useDocumentTitle } from 'src/Hooks/useDocumentTitle';
import installation from 'src/Resources/Images/installation.jpg';
import meterCupboard from 'src/Resources/Images/meterCupboard.jpg';
import systemDuplex from 'src/Resources/Images/systemDuplex.jpg';
import systemExternal from 'src/Resources/Images/systemExternal.jpg';
import systemSimplex from 'src/Resources/Images/systemSimplex.jpg';
import { sectionSpacing } from 'src/Theme/sizes';
import { serifFontFamily } from 'src/Theme/typography';

import PhotoStrip from './Components/PhotoStrip';
import type { PhotoStripItem } from './Components/PhotoStrip';

type SystemKey = 'simplex' | 'duplex' | 'external';

const systems: {
    key: SystemKey;
    tag: string;
    highlight?: boolean;
    title: string;
    image: string;
    text: string;
    specs: { tanks: string; rinsing: string; placement: string; suitable: string };
}[] = [
    {
        key: 'simplex',
        tag: 'Voordeligst',
        title: 'Simplex systeem',
        image: systemSimplex,
        text: 'Eén harstank: het meest compact en hiermee bent u het goedkoopste uit.',
        specs: {
            tanks: 'Eén harstank',
            rinsing: 'Kort in bypass',
            placement: 'Meterkast of trapkast',
            suitable: '1–4 personen',
        },
    },
    {
        key: 'duplex',
        tag: 'Altijd zacht water',
        highlight: true,
        title: 'Duplex systeem',
        image: systemDuplex,
        text: 'Dubbele tank met alternerende spoeling, waardoor u altijd van zacht water geniet.',
        specs: {
            tanks: 'Dubbele harstank',
            rinsing: 'Altijd zacht water',
            placement: 'Meterkast of trapkast',
            suitable: 'Elk huishouden',
        },
    },
    {
        key: 'external',
        tag: 'Flexibel te plaatsen',
        title: 'External systeem',
        image: systemExternal,
        text: 'Harstanken en zoutvat los van elkaar te monteren, bijvoorbeeld onder de vloer.',
        specs: {
            tanks: 'Losse harstanken',
            rinsing: 'Afhankelijk van uitvoering',
            placement: 'Tanks onder de vloer, zoutvat tot 5 m',
            suitable: 'Krappe ruimtes',
        },
    },
];

const specLabels = [
    { key: 'tanks', label: 'Harstanken' },
    { key: 'rinsing', label: 'Tijdens spoeling' },
    { key: 'placement', label: 'Plaatsing' },
    { key: 'suitable', label: 'Geschikt voor' },
] as const;

const installationPhotos: PhotoStripItem[] = [
    {
        src: meterCupboard,
        alt: 'Leidingen en meters in een technische ruimte',
        caption: 'Plaatsing direct na de watermeter — meestal in de meter- of trapkast.',
    },
    {
        src: installation,
        alt: 'Geïnstalleerde Kinetico-waterontharder met zoutvat in een kast',
        caption: 'Installatie en service door onze eigen loodgieters.',
    },
];

const useStyles = makeStyles()(theme => ({
    root: {
        flex: 1,
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
        backgroundColor: background,
    },
    photos: {
        marginTop: sectionSpacing,
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    lead: {
        maxWidth: 400,
        fontSize: '1rem',
        lineHeight: 1.6,
        color: slate,
    },
    cards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 1,
        marginTop: 34,
        backgroundColor: border,
        border: `1px solid ${border}`,
    },
    card: {
        display: 'block',
        padding: 24,
        textAlign: 'left',
        backgroundColor: white,
        transition: 'background-color .2s ease',
        '&:hover': {
            backgroundColor: surface,
        },
    },
    cardSelected: {
        '&, &:hover': {
            backgroundColor: greenTint,
        },
    },
    cardImage: {
        display: 'block',
        position: 'relative',
        aspectRatio: '4 / 3',
        backgroundColor: surface,
    },
    tag: {
        display: 'block',
        marginTop: 20,
        color: muted,
    },
    tagHighlight: {
        color: greenDark,
    },
    cardTitle: {
        display: 'block',
        marginTop: 10,
        color: navy,
    },
    cardText: {
        display: 'block',
        marginTop: 8,
        fontSize: 15.5,
        lineHeight: 1.6,
        color: slate,
    },
    specs: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        margin: '22px 0 0',
        borderTop: `1px solid ${border}`,
    },
    spec: {
        padding: '20px 22px',
        borderLeft: `1px solid ${border}`,
        '&:first-of-type': {
            paddingLeft: 0,
            borderLeft: 0,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '16px 0',
            borderLeft: 0,
            borderBottom: `1px solid ${border}`,
        },
    },
    specLabel: {
        color: muted,
    },
    specValue: {
        margin: '9px 0 0',
        fontFamily: serifFontFamily,
        fontSize: 20,
        lineHeight: 1.3,
        color: navy,
    },
    footer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'center',
        marginTop: 30,
    },
}));

export default function Systems() {
    const { classes, cx } = useStyles();

    useDocumentTitle('Onze systemen');

    const [selected, setSelected] = useState<SystemKey>('duplex');

    const selectedSystem = systems.find(system => system.key === selected) ?? systems[1];

    return (
        <section id="systemen" className={classes.root} aria-labelledby="systemen-title">
            <Container>
                <div className={classes.header}>
                    <div>
                        <SectionHeading
                            id="systemen-title"
                            level="h1"
                            title="Simplex, duplex of external"
                        />
                    </div>
                    <Typography className={classes.lead}>
                        Welk systeem past hangt af van de gewenste capaciteit en de ruimte in uw
                        meterkast. Kies en vergelijk.
                    </Typography>
                </div>

                <div
                    className={classes.cards}
                    role="group"
                    aria-label="Kies een systeem om te vergelijken"
                >
                    {systems.map(system => (
                        <ButtonBase
                            key={system.key}
                            focusRipple
                            aria-pressed={system.key === selected}
                            onClick={() => setSelected(system.key)}
                            className={cx(
                                classes.card,
                                system.key === selected && classes.cardSelected,
                            )}
                        >
                            <span className={classes.cardImage}>
                                <Photo src={system.image} alt="" />
                            </span>
                            <Typography
                                variant="caption"
                                className={cx(
                                    classes.tag,
                                    system.highlight && classes.tagHighlight,
                                )}
                            >
                                {system.tag}
                            </Typography>
                            <Typography variant="h3" component="span" className={classes.cardTitle}>
                                {system.title}
                            </Typography>
                            <Typography component="span" className={classes.cardText}>
                                {system.text}
                            </Typography>
                        </ButtonBase>
                    ))}
                </div>

                <dl className={classes.specs} aria-live="polite">
                    {specLabels.map(spec => (
                        <div key={spec.key} className={classes.spec}>
                            <Typography
                                variant="caption"
                                component="dt"
                                className={classes.specLabel}
                            >
                                {spec.label}
                            </Typography>
                            <dd className={classes.specValue}>{selectedSystem.specs[spec.key]}</dd>
                        </div>
                    ))}
                </dl>

                <div className={classes.footer}>
                    <Button
                        component={RouterLink}
                        to="/contact"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Bekijk ons aanbod van waterontharders
                    </Button>
                </div>
            </Container>
            <PhotoStrip
                items={installationPhotos}
                minColumnWidth={280}
                className={classes.photos}
            />
        </section>
    );
}
