import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Container,
    Link,
    Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { blueBright, border, slate, white } from 'src/colors';
import SectionHeading from 'src/Components/SectionHeading';
import { phoneDisplay, phoneHref } from 'src/Config/contact';
import { useDocumentTitle } from 'src/Hooks/useDocumentTitle';
import { sectionSpacing } from 'src/Theme/sizes';
import { serifFontFamily } from 'src/Theme/typography';

const questions = [
    {
        question: 'Wat is het verschil tussen simplex en duplex waterontharders?',
        answer: 'Een simplex is één harstank en daarom het meest compact — hiermee bent u het goedkoopste uit. Een duplex ontharder heeft een dubbele tank en spoelt alternerend, waardoor u altijd van zacht water geniet.',
    },
    {
        question: 'Wat zijn de kosten van een waterontharder?',
        answer: 'Vanaf € 1.700,- incl. btw kunnen wij een waterontharder bij u thuis plaatsen. Dit is afhankelijk van een simplex of duplex ontharder en welke capaciteit gewenst is.',
    },
    {
        question: 'Wat is het zoutverbruik per jaar?',
        answer: 'Ongeveer 1 zak van 25 kg per persoon per jaar. In verband met de garantie willen wij dat u het zout bij ons afneemt: € 15,00 incl. btw per zak. Onze e-mailservice herinnert u iedere twee maanden.',
    },
    {
        question: 'Wat is de besparing per jaar ongeveer?',
        answer: 'Ongeveer € 250,- per jaar als u er bewust mee omgaat. Komt daar de besparing van geen onderhoudscontract bij, dan loopt dat verder op.',
    },
    {
        question: 'Waar wordt een waterontharder geplaatst en wat zijn de voorwaarden?',
        answer: 'Plaatsing kan op verschillende plekken, zoals in de meterkast of trapkast. Bij een mini waterontharder (bijvoorbeeld de mini KB 20-20 of 20-40) kunnen de harstanken onder de vloer en de zoutbak boven de vloer geplaatst worden, tot maximaal 5 meter van de harstanken. De ontharder heeft een onderbreking na de watermeter van de toevoerleiding nodig, zodat er een doorlus gemaakt kan worden. Belangrijk is dat er een afvoer aanwezig is in de ruimte. De spoeling kan maximaal 2 meter omhoog.',
    },
    {
        question: 'Heeft het invloed op de waterdruk?',
        answer: 'Ja, alles wat tussen de waterleiding wordt gemonteerd geeft een stukje weerstand — maar dat is zo minimaal dat u het nauwelijks zult merken.',
    },
    {
        question: 'Kan een resthardheid ingesteld worden?',
        answer: 'Ja, dat is zeker mogelijk met de waterontharders van Kinetico. Kalk zet zich af op 2,7 dH; voor de smaak van water is het beste om tussen 1 en 2 dH af te stellen — uiteraard naar uw wens.',
    },
    {
        question: 'Helpt het tegen huidklachten zoals eczeem?',
        answer: 'Het kan zeker helpen. Onthard water kan een verzachting geven op de huid en bij eventuele huidproblemen. Er zijn veel positieve verhalen over zacht water en huidklachten, maar we kunnen het nooit garanderen omdat er veel typen huid(klachten) bestaan.',
    },
    {
        question: 'Wat is de levensduur van de ontharder?',
        answer: 'Tussen de 20 en de 30 jaar.',
    },
    {
        question: 'Moet ik het zout bij Water Zacht afnemen?',
        answer: "In verband met de garantie willen wij dat u zout bij ons afneemt. De prijs van zo'n zak van 25 kg is € 15,00 incl. btw. Wij hebben een e-mailservice die u iedere twee maanden herinnert.",
    },
];

const useStyles = makeStyles()({
    root: {
        flex: 1,
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
        backgroundColor: white,
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(28px, 4vw, 72px)',
    },
    intro: {
        flex: '0 1 280px',
    },
    lead: {
        marginTop: 16,
        fontSize: '1rem',
        color: slate,
    },
    list: {
        flex: '1 1 520px',
        borderTop: `1px solid ${border}`,
    },
    expandIcon: {
        fontFamily: serifFontFamily,
        fontWeight: 300,
        fontSize: 22,
        lineHeight: 1,
        color: blueBright,
    },
    answer: {
        maxWidth: '60em',
    },
});

export default function Faq() {
    const { classes } = useStyles();

    useDocumentTitle('Veelgestelde vragen');

    return (
        <div className={classes.root}>
            <Container className={classes.layout}>
                <div className={classes.intro}>
                    <SectionHeading
                        id="faq-title"
                        eyebrow="Veelgestelde vragen"
                        level="h1"
                        title="Alles wat u wilt weten"
                    />
                    <Typography className={classes.lead}>
                        Staat uw vraag er niet bij? Bel <Link href={phoneHref}>{phoneDisplay}</Link>{' '}
                        — u spreekt direct iemand die het toestel zelf plaatst.
                    </Typography>
                </div>
                <div className={classes.list}>
                    {questions.map((item, index) => (
                        <Accordion key={item.question} defaultExpanded={index === 0}>
                            <AccordionSummary
                                expandIcon={
                                    <span className={classes.expandIcon} aria-hidden="true">
                                        +
                                    </span>
                                }
                            >
                                {item.question}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.answer}>{item.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </Container>
        </div>
    );
}
