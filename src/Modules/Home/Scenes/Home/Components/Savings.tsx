import { Button, Checkbox, Container, LinearProgress, Slider, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import {
    blueBright,
    green,
    navy,
    onDarkBody,
    onDarkEyebrow,
    onDarkFaint,
    onDarkMuted,
    onDarkSoft,
    onDarkStrong,
    steel,
    white,
} from 'src/colors';
import { calculateSavings, formatEuro, minimumPrice } from 'src/Modules/Home/Logic/savings';
import { borderRadius, cardRadius, sectionSpacing } from 'src/Theme/sizes';
import { serifFontFamily } from 'src/Theme/typography';

import SectionHeading from './SectionHeading';

const personMarks = [1, 2, 3, 4, 5, 6].map(value => ({ value, label: String(value) }));

const useStyles = makeStyles()(theme => ({
    root: {
        backgroundColor: navy,
        color: onDarkStrong,
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    headerText: {
        maxWidth: 620,
    },
    lead: {
        maxWidth: 380,
        fontSize: '1rem',
        lineHeight: 1.6,
        color: onDarkBody,
    },
    columns: {
        marginTop: 40,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(26px, 3.5vw, 60px)',
    },
    inputs: {
        flex: '1 1 320px',
    },
    personsHeader: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 12,
    },
    label: {
        color: onDarkEyebrow,
    },
    personsValue: {
        fontFamily: serifFontFamily,
        fontWeight: 300,
        fontSize: 26,
        lineHeight: 1,
        color: white,
    },
    slider: {
        marginTop: 6,
        '& .MuiSlider-markLabel': {
            color: onDarkMuted,
            fontSize: 12,
        },
        '& .MuiSlider-rail': {
            backgroundColor: alpha(white, 0.3),
            opacity: 1,
        },
    },
    contract: {
        marginTop: 26,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        padding: 18,
        backgroundColor: alpha(white, 0.06),
        border: `1px solid ${alpha(white, 0.16)}`,
        borderRadius: cardRadius,
        cursor: 'pointer',
        '&:hover, &:focus-within': {
            borderColor: alpha(green, 0.7),
        },
    },
    checkbox: {
        padding: 0,
        color: alpha(white, 0.4),
        '& .MuiSvgIcon-root': {
            borderRadius,
        },
    },
    contractTitle: {
        display: 'block',
        fontWeight: 600,
        fontSize: 15,
        lineHeight: 1.3,
        color: white,
    },
    contractText: {
        display: 'block',
        marginTop: 5,
        fontSize: 14,
        lineHeight: 1.45,
        color: onDarkBody,
    },
    bars: {
        marginTop: 26,
        display: 'grid',
        gap: 14,
    },
    barLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 8,
        fontSize: 14,
        lineHeight: 1,
        color: onDarkSoft,
    },
    barValue: {
        color: white,
    },
    barAppliances: {
        backgroundColor: blueBright,
    },
    barContract: {
        backgroundColor: green,
    },
    barSalt: {
        backgroundColor: steel,
    },
    result: {
        flex: '1 1 320px',
        borderLeft: `1px solid ${alpha(white, 0.16)}`,
        paddingLeft: 'clamp(24px, 3vw, 48px)',
        [theme.breakpoints.down('sm')]: {
            borderLeft: 0,
            paddingLeft: 0,
            paddingTop: 26,
            borderTop: `1px solid ${alpha(white, 0.16)}`,
        },
    },
    net: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 12,
        marginTop: 16,
    },
    netValue: {
        fontFamily: serifFontFamily,
        fontWeight: 300,
        fontSize: 'clamp(48px, 6vw, 82px)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        color: white,
    },
    netUnit: {
        fontSize: 15,
        color: onDarkBody,
    },
    figures: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 20,
        marginTop: 34,
        paddingTop: 26,
        borderTop: `1px solid ${alpha(white, 0.16)}`,
    },
    figureValue: {
        fontFamily: serifFontFamily,
        fontWeight: 300,
        fontSize: 26,
        lineHeight: 1,
        color: white,
    },
    figureLabel: {
        marginTop: 7,
        fontSize: 13.5,
        lineHeight: 1.4,
        color: onDarkMuted,
    },
    cta: {
        marginTop: 32,
    },
    disclaimer: {
        marginTop: 20,
        fontSize: 12.5,
        lineHeight: 1.55,
        color: onDarkFaint,
    },
}));

export default function Savings() {
    const { classes } = useStyles();

    const [persons, setPersons] = useState(4);
    const [noContract, setNoContract] = useState(true);

    const savings = useMemo(() => calculateSavings(persons, noContract), [persons, noContract]);
    const maxBar = savings.appliances + savings.contract;
    const percentage = (value: number) => (value / maxBar) * 100;

    const bars = [
        {
            label: 'Energie, onderhoud en wasmiddelen',
            value: formatEuro(savings.appliances),
            percentage: percentage(savings.appliances),
            className: classes.barAppliances,
        },
        {
            label: 'Geen onderhoudscontract',
            value: formatEuro(savings.contract),
            percentage: percentage(savings.contract),
            className: classes.barContract,
        },
        {
            label: 'Kosten zouttabletten',
            value: `− ${formatEuro(savings.salt)}`,
            percentage: percentage(savings.salt),
            className: classes.barSalt,
        },
    ];

    return (
        <section id="besparing" className={classes.root} aria-labelledby="besparing-title">
            <Container>
                <div className={classes.header}>
                    <div className={classes.headerText}>
                        <SectionHeading
                            id="besparing-title"
                            eyebrow="02 · Bespaar"
                            title="Wat levert zacht water u per jaar op?"
                            dark
                        />
                    </div>
                    <Typography className={classes.lead}>
                        U bespaart op energie, onderhoud en wasmiddelen doordat er geen kalk meer op
                        de warmte-elementen komt.
                    </Typography>
                </div>

                <div className={classes.columns}>
                    <div className={classes.inputs}>
                        <div className={classes.personsHeader}>
                            <Typography
                                id="savings-persons"
                                variant="caption"
                                className={classes.label}
                            >
                                Personen in het huishouden
                            </Typography>
                            <span className={classes.personsValue} aria-hidden="true">
                                {persons}
                            </span>
                        </div>
                        <Slider
                            aria-labelledby="savings-persons"
                            value={persons}
                            min={1}
                            max={6}
                            step={1}
                            marks={personMarks}
                            onChange={(_event, value) => setPersons(value)}
                            className={classes.slider}
                        />

                        <label className={classes.contract}>
                            <Checkbox
                                checked={noContract}
                                onChange={event => setNoContract(event.target.checked)}
                                className={classes.checkbox}
                            />
                            <span>
                                <span className={classes.contractTitle}>
                                    Geen onderhoudscontract nodig
                                </span>
                                <span className={classes.contractText}>
                                    Kinetico geeft 10 jaar garantie zonder contract: al snel € 100,-
                                    per jaar.
                                </span>
                            </span>
                        </label>

                        <div className={classes.bars}>
                            {bars.map(bar => (
                                <div key={bar.label}>
                                    <div className={classes.barLabel}>
                                        <span>{bar.label}</span>
                                        <span className={classes.barValue}>{bar.value}</span>
                                    </div>
                                    <LinearProgress
                                        variant="determinate"
                                        value={bar.percentage}
                                        aria-label={bar.label}
                                        classes={{ bar: bar.className }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={classes.result}>
                        <Typography variant="caption" component="p" className={classes.label}>
                            Uw netto besparing
                        </Typography>
                        <div className={classes.net} aria-live="polite">
                            <span className={classes.netValue}>{formatEuro(savings.net)}</span>
                            <span className={classes.netUnit}>per jaar</span>
                        </div>
                        <div className={classes.figures}>
                            <div>
                                <div className={classes.figureValue}>
                                    {savings.paybackYears.toFixed(1).replace('.', ',')} jaar
                                </div>
                                <div className={classes.figureLabel}>
                                    terugverdiend vanaf {formatEuro(minimumPrice)}
                                </div>
                            </div>
                            <div>
                                <div className={classes.figureValue}>
                                    {formatEuro(savings.tenYears)}
                                </div>
                                <div className={classes.figureLabel}>besparing over 10 jaar</div>
                            </div>
                            <div>
                                <div className={classes.figureValue}>
                                    {persons} {persons === 1 ? 'zak' : 'zakken'}
                                </div>
                                <div className={classes.figureLabel}>zout per jaar</div>
                            </div>
                        </div>
                        <Button
                            href="#contact"
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.cta}
                        >
                            Vraag uw offerte op maat aan
                        </Button>
                        <Typography className={classes.disclaimer}>
                            Indicatie op basis van de opgave van Water Zacht: gemiddeld € 250,- per
                            jaar bij een gezin. Zoutverbruik ± 1 zak van 25 kg per persoon per jaar,
                            € 15,- per zak incl. btw.
                        </Typography>
                    </div>
                </div>
            </Container>
        </section>
    );
}
