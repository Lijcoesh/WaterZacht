import { Container, Link, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { navy, white } from 'src/colors';
import {
    companyName,
    email,
    emailHref,
    parentCompanyName,
    phoneDisplay,
    phoneHref,
    postalCodeCity,
    street,
} from 'src/Config/contact';
import { useDocumentTitle } from 'src/Hooks/useDocumentTitle';
import { sectionSpacing } from 'src/Theme/sizes';

import OpenPoint from './Components/OpenPoint';
import PolicySection from './Components/PolicySection';

// De link uit de oude verklaring (/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons)
// stuurt door naar deze pagina
const supervisoryAuthorityUrl =
    'https://autoriteitpersoonsgegevens.nl/een-tip-of-klacht-indienen-bij-de-ap';

const useStyles = makeStyles()({
    root: {
        flex: 1,
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
        backgroundColor: white,
    },
    content: {
        maxWidth: '46em',
    },
    title: {
        color: navy,
    },
    draft: {
        marginTop: 24,
    },
});

// De tekst is de privacyverklaring van de oude site (mei 2018). Wat daar niet in staat of niet
// meer klopt, staat in een OpenPoint en moet vóór de livegang zijn opgelost.
export default function Privacy() {
    const { classes } = useStyles();

    useDocumentTitle('Privacyverklaring');

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.content}>
                    <Typography variant="h2" component="h1" className={classes.title}>
                        Privacyverklaring
                    </Typography>
                    <Typography className={classes.draft}>
                        <OpenPoint>
                            Dit is een concept. De tekst komt uit de privacyverklaring van de oude
                            site (mei 2018). De gemarkeerde punten ontbreken daarin of kloppen niet
                            meer met de nieuwe site. Daarna laten nalezen door de eigenaar of een
                            jurist.
                        </OpenPoint>
                    </Typography>

                    <PolicySection title="Wie is verantwoordelijk?">
                        <Typography>
                            {companyName}, gevestigd aan {street}, {postalCodeCity}, is
                            verantwoordelijk voor de verwerking van persoonsgegevens zoals
                            weergegeven in deze privacyverklaring.{' '}
                            <OpenPoint>
                                Is {companyName} een handelsnaam van {parentCompanyName}, of een
                                eigen bedrijf? Dat bepaalt wie hier als verantwoordelijke staat.
                            </OpenPoint>
                        </Typography>
                        <Typography component="ul">
                            <li>
                                {street}, {postalCodeCity}
                            </li>
                            <li>
                                Telefoon: <Link href={phoneHref}>{phoneDisplay}</Link>
                            </li>
                            <li>
                                E-mail: <Link href={emailHref}>{email}</Link>
                            </li>
                            <li>
                                KvK-nummer: 27282590 <OpenPoint>Dubbel checken</OpenPoint>
                            </li>
                        </Typography>
                    </PolicySection>

                    <PolicySection title="Persoonsgegevens die wij verwerken">
                        <Typography>
                            {companyName} verwerkt uw persoonsgegevens doordat u gebruik maakt van
                            onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt
                            u een overzicht van de persoonsgegevens die wij verwerken:
                        </Typography>
                        <Typography component="ul">
                            <li>Voor- en achternaam</li>
                            <li>Adresgegevens</li>
                            <li>Telefoonnummer</li>
                            <li>E-mailadres</li>
                            <li>IP-adres</li>
                            <li>
                                Gegevens over uw activiteiten op onze website{' '}
                                <OpenPoint>
                                    De nieuwe site meet geen bezoekersgedrag. Kan dit punt weg?
                                </OpenPoint>
                            </li>
                            <li>
                                <OpenPoint>
                                    Ontbreekt: het bericht of de opmerking die u in een formulier
                                    invult, en wat u bestelt.
                                </OpenPoint>
                            </li>
                        </Typography>
                    </PolicySection>

                    <PolicySection title="Bijzondere en/of gevoelige persoonsgegevens die wij verwerken">
                        <Typography>
                            Onze website en/of dienst heeft niet de intentie gegevens te verzamelen
                            over websitebezoekers die jonger zijn dan 16 jaar, tenzij ze toestemming
                            hebben van ouders of voogd. We kunnen echter niet controleren of een
                            bezoeker ouder dan 16 is. Wij raden ouders dan ook aan betrokken te zijn
                            bij de online activiteiten van hun kinderen, om zo te voorkomen dat er
                            gegevens over kinderen verzameld worden zonder ouderlijke toestemming.
                            Als u ervan overtuigd bent dat wij zonder die toestemming persoonlijke
                            gegevens hebben verzameld over een minderjarige, neem dan contact met
                            ons op via <Link href={emailHref}>{email}</Link>, dan verwijderen wij
                            deze informatie.
                        </Typography>
                    </PolicySection>

                    <PolicySection title="Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken">
                        <Typography>
                            {companyName} verwerkt uw persoonsgegevens voor de volgende doelen:
                        </Typography>
                        <Typography component="ul">
                            <li>
                                U te kunnen bellen of e-mailen indien dit nodig is om onze
                                dienstverlening uit te kunnen voeren
                            </li>
                            <li>
                                U te informeren over wijzigingen van onze diensten en producten{' '}
                                <OpenPoint>Gebeurt dit nog? Zo ja, hoe?</OpenPoint>
                            </li>
                            <li>Om goederen en diensten bij u af te leveren</li>
                            <li>
                                <OpenPoint>
                                    Ontbreekt: de zoutherinnering per e-mail, iedere twee maanden
                                    (staat in de FAQ). Hoe werkt die, en kan een klant zich
                                    afmelden?
                                </OpenPoint>
                            </li>
                        </Typography>
                        <Typography>
                            <OpenPoint>
                                De kop noemt een grondslag, maar de oude verklaring geeft er geen.
                                Per doel invullen.
                            </OpenPoint>
                        </Typography>
                    </PolicySection>

                    <PolicySection title="Geautomatiseerde besluitvorming">
                        <Typography>
                            {companyName} neemt niet op basis van geautomatiseerde verwerkingen
                            besluiten over zaken die (aanzienlijke) gevolgen kunnen hebben voor
                            personen. Het gaat hier om besluiten die worden genomen door
                            computerprogramma&apos;s of -systemen, zonder dat daar een mens
                            (bijvoorbeeld een medewerker van {companyName}) tussen zit.
                        </Typography>
                    </PolicySection>

                    <PolicySection title="Hoe lang we persoonsgegevens bewaren">
                        <Typography>
                            {companyName} bewaart uw persoonsgegevens niet langer dan strikt nodig
                            is om de doelen te realiseren waarvoor uw gegevens worden verzameld. Wij
                            hanteren de volgende bewaartermijn voor de persoonsgegevens: 7 jaar in
                            verband met de belastingwet.{' '}
                            <OpenPoint>
                                Geldt dat ook voor offerteaanvragen die niets worden?
                            </OpenPoint>
                        </Typography>
                    </PolicySection>

                    <PolicySection title="Delen van persoonsgegevens met derden">
                        <Typography>
                            {companyName} verstrekt uitsluitend aan derden en alleen als dit nodig
                            is voor de uitvoering van onze overeenkomst met u of om te voldoen aan
                            een wettelijke verplichting.{' '}
                            <OpenPoint>
                                Ontbreekt: wie dat zijn. In elk geval Brevo (verstuurt de mails van
                                de formulieren) en de hosting (TransIP, beheerd door de
                                ontwikkelaar), met een verwerkersovereenkomst. Nog meer, zoals een
                                boekhouder?
                            </OpenPoint>
                        </Typography>
                    </PolicySection>

                    <PolicySection title="Cookies, of vergelijkbare technieken, die wij gebruiken">
                        <Typography>
                            {companyName} gebruikt alleen technische en functionele cookies. En
                            analytische cookies die geen inbreuk maken op uw privacy. Een cookie is
                            een klein tekstbestand dat bij het eerste bezoek aan deze website wordt
                            opgeslagen op uw computer, tablet of smartphone. De cookies die wij
                            gebruiken zijn noodzakelijk voor de technische werking van de website en
                            uw gebruiksgemak. Ze zorgen ervoor dat de website naar behoren werkt en
                            onthouden bijvoorbeeld uw voorkeursinstellingen. Ook kunnen wij hiermee
                            onze website optimaliseren. U kunt zich afmelden voor cookies door uw
                            internetbrowser zo in te stellen dat deze geen cookies meer opslaat.
                            Daarnaast kunt u ook alle informatie die eerder is opgeslagen via de
                            instellingen van uw browser verwijderen.{' '}
                            <OpenPoint>
                                De nieuwe site plaatst geen cookies, ook geen analytische. Deze
                                tekst moet daarop worden aangepast.
                            </OpenPoint>
                        </Typography>
                    </PolicySection>

                    <PolicySection title="Gegevens inzien, aanpassen of verwijderen">
                        <Typography>
                            U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te
                            verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming
                            voor de gegevensverwerking in te trekken of bezwaar te maken tegen de
                            verwerking van uw persoonsgegevens door {companyName} en heeft u het
                            recht op gegevensoverdraagbaarheid. Dat betekent dat u bij ons een
                            verzoek kunt indienen om de persoonsgegevens die wij van u beschikken in
                            een computerbestand naar u of een ander, door u genoemde organisatie, te
                            sturen.
                        </Typography>
                        <Typography>
                            U kunt een verzoek tot inzage, correctie, verwijdering,
                            gegevensoverdraging van uw persoonsgegevens of verzoek tot intrekking
                            van uw toestemming of bezwaar op de verwerking van uw persoonsgegevens
                            sturen naar <Link href={emailHref}>{email}</Link>. Om er zeker van te
                            zijn dat het verzoek tot inzage door u is gedaan, vragen wij u een kopie
                            van uw identiteitsbewijs met het verzoek mee te sturen. Maak in deze
                            kopie uw pasfoto, MRZ (machine readable zone, de strook met nummers
                            onderaan het paspoort), paspoortnummer en Burgerservicenummer (BSN)
                            zwart. Dit ter bescherming van uw privacy.{' '}
                            <OpenPoint>
                                Is een kopie van het identiteitsbewijs nog nodig? Liever niet om
                                vragen als het ook anders kan.
                            </OpenPoint>
                        </Typography>
                        <Typography>
                            We reageren zo snel mogelijk, maar binnen vier weken, op uw verzoek.{' '}
                            {companyName} wil u er tevens op wijzen dat u de mogelijkheid heeft om
                            een klacht in te dienen bij de nationale toezichthouder, de{' '}
                            <Link href={supervisoryAuthorityUrl}>Autoriteit Persoonsgegevens</Link>.
                        </Typography>
                    </PolicySection>

                    <PolicySection title="Hoe wij persoonsgegevens beveiligen">
                        <Typography>
                            {companyName} neemt de bescherming van uw gegevens serieus en neemt
                            passende maatregelen om misbruik, verlies, onbevoegde toegang,
                            ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als
                            u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er
                            aanwijzingen zijn van misbruik, neem dan contact op met onze
                            klantenservice of via <Link href={emailHref}>{email}</Link>.
                        </Typography>
                    </PolicySection>

                    <Typography className={classes.draft}>
                        <OpenPoint>Datum van deze versie invullen bij publicatie.</OpenPoint>
                    </Typography>
                </div>
            </Container>
        </div>
    );
}
