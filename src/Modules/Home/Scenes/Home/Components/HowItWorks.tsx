import { Container, ToggleButton, Typography } from '@mui/material';
import { useState } from 'react';
import { keyframes } from 'tss-react';
import { makeStyles } from 'tss-react/mui';

import { blueBright, blueStripe, borderSoft, navy, slate, track, white } from 'src/colors';
import Photo from 'src/Components/Photo';
import SectionHeading from 'src/Components/SectionHeading';
import howItWorks from 'src/Resources/Images/howItWorks.jpg';
import { cardRadius, sectionSpacing } from 'src/Theme/sizes';

const steps = [
    {
        label: 'Harscilinder',
        title: 'Een cilinder gevuld met hars',
        text: 'De ontharder wordt aangesloten op de waterleiding, bij voorkeur direct na de watermeter — meestal in de meter- of trapkast. Al het water dat u in huis gebruikt stroomt door de harscilinder. Daar vindt de ionenuitwisseling plaats en wordt kalk aan uw leidingwater onttrokken. Die kalk (calcium) hecht zich aan de harsbolletjes in het harsvat.',
    },
    {
        label: 'Zoutvoorraadvat',
        title: 'Een zoutvoorraadvat',
        text: 'Het zoutvat bewaart de zouttabletten waarmee de hars wordt gereinigd. Reken op ongeveer één zak van 25 kg per persoon per jaar. Onze e-mailservice herinnert u elke 2 maanden om het zoutvat na te kijken, zodat u er zelf niet aan hoeft te denken.',
    },
    {
        label: 'Besturingsklep',
        title: 'De besturingsklep — zonder elektra',
        text: 'Kinetico regenereert op waterdruk, ná volumemeting: niet op tijd, maar precies wanneer het nodig is. In of op de ontharder zit geen elektra. Daardoor is het toestel energiebesparend, stil en nauwelijks storingsgevoelig.',
    },
    {
        label: 'Regeneratie',
        title: 'Volautomatische regeneratie',
        text: 'Raakt de hars verzadigd met kalk, dan regenereert de ontharder volautomatisch: een zoutwateroplossing spoelt door het harsvat en weekt de kalkdeeltjes los van de harsbolletjes. De natriumdeeltjes hechten zich weer aan de hars, het zoute water met kalk wordt geloosd op het riool. Daarna is de capaciteit van de hars hersteld.',
    },
];

const flow = keyframes({
    from: { backgroundPosition: '0 0' },
    to: { backgroundPosition: '40px 0' },
});

const fadeIn = keyframes({
    from: { opacity: 0, transform: 'translateY(6px)' },
    to: { opacity: 1, transform: 'none' },
});

const useStyles = makeStyles()({
    root: {
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
        backgroundColor: white,
        borderBottom: `1px solid ${borderSoft}`,
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(28px, 4vw, 72px)',
    },
    intro: {
        flex: '0 1 320px',
    },
    lead: {
        marginTop: 16,
        color: slate,
    },
    visual: {
        position: 'relative',
        marginTop: 26,
        aspectRatio: '16 / 10',
        borderRadius: cardRadius,
        overflow: 'hidden',
        backgroundColor: navy,
    },
    steps: {
        flex: '1 1 480px',
    },
    stepButtons: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
    },
    progress: {
        marginTop: 14,
        height: 4,
        backgroundColor: track,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        background: `repeating-linear-gradient(115deg, ${blueBright} 0 12px, ${blueStripe} 12px 20px)`,
        backgroundSize: '40px 100%',
        animation: `${flow} 1.1s linear infinite`,
        transition: 'width .4s ease',
        '@media (prefers-reduced-motion: reduce)': {
            animation: 'none',
        },
    },
    panel: {
        marginTop: 28,
        minHeight: 220,
        animation: `${fadeIn} .35s ease both`,
    },
    panelTitle: {
        fontSize: 26,
        color: navy,
    },
    panelText: {
        marginTop: 14,
        maxWidth: '46em',
        lineHeight: 1.7,
        color: slate,
    },
});

export default function HowItWorks() {
    const { classes } = useStyles();

    const [activeStep, setActiveStep] = useState(0);

    const step = steps[activeStep];

    return (
        <section id="werking" className={classes.root} aria-labelledby="werking-title">
            <Container className={classes.layout}>
                <div className={classes.intro}>
                    <SectionHeading
                        id="werking-title"
                        eyebrow="02 · De werking"
                        title="Hoe werkt een waterontharder?"
                    />
                    <Typography className={classes.lead}>
                        De werking is gebaseerd op ionenuitwisseling: calciumionen (kalk) worden
                        vervangen door natriumionen (zout). Dit wordt bewerkstelligd door de hars.
                    </Typography>
                    <div className={classes.visual}>
                        <Photo src={howItWorks} alt="Witte waterleidingen langs een muur" />
                    </div>
                </div>
                <div className={classes.steps}>
                    <div
                        className={classes.stepButtons}
                        role="group"
                        aria-label="Onderdelen van de ontharder"
                    >
                        {steps.map((item, index) => (
                            <ToggleButton
                                key={item.label}
                                value={index}
                                selected={index === activeStep}
                                onChange={() => setActiveStep(index)}
                                aria-controls="werking-panel"
                            >
                                {String(index + 1).padStart(2, '0')} {item.label}
                            </ToggleButton>
                        ))}
                    </div>
                    <div className={classes.progress} aria-hidden="true">
                        <div
                            className={classes.progressBar}
                            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                    <div
                        key={activeStep}
                        id="werking-panel"
                        className={classes.panel}
                        aria-live="polite"
                    >
                        <Typography variant="h3" className={classes.panelTitle}>
                            {step.title}
                        </Typography>
                        <Typography className={classes.panelText}>{step.text}</Typography>
                    </div>
                </div>
            </Container>
        </section>
    );
}
