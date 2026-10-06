import { makeStyles } from 'tss-react/mui';

import { useDocumentTitle } from 'src/Hooks/useDocumentTitle';
import appliances from 'src/Resources/Images/appliances.jpg';
import bathroom from 'src/Resources/Images/bathroom.jpg';
import meterCupboard from 'src/Resources/Images/meterCupboard.jpg';
import tapGlass from 'src/Resources/Images/tapGlass.jpg';
import { sectionSpacing } from 'src/Theme/sizes';

import About from './Components/About';
import Benefits from './Components/Benefits';
import Comparison from './Components/Comparison';
import DrinkingWater from './Components/DrinkingWater';
import Faq from './Components/Faq';
import Guarantees from './Components/Guarantees';
import Hero from './Components/Hero';
import HowItWorks from './Components/HowItWorks';
import Kinetico from './Components/Kinetico';
import PhotoStrip from './Components/PhotoStrip';
import type { PhotoStripItem } from './Components/PhotoStrip';
import Systems from './Components/Systems';

const benefitPhotos: PhotoStripItem[] = [
    {
        src: bathroom,
        alt: 'Douchecabine met glazen wand en marmeren tegels',
        caption: 'Cabines, kranen en tegels drogen streeploos op — antikalk kan de deur uit.',
    },
    {
        src: appliances,
        alt: 'Leidingwerk in een technische ruimte',
        caption: 'Geen kalk op de warmte-elementen van cv-ketel, vaatwasser en wasmachine.',
    },
    {
        src: tapGlass,
        alt: 'Glas dat onder de keukenkraan wordt gevuld',
        caption: 'Minder kalk in het water, een merkbaar betere smaak.',
    },
];

const installationPhotos: PhotoStripItem[] = [
    {
        src: meterCupboard,
        alt: 'Leidingen en meters in een technische ruimte',
        caption: 'Plaatsing direct na de watermeter — meestal in de meter- of trapkast.',
    },
    {
        alt: 'Martin tijdens de installatie',
        placeholder: 'Foto nodig: Martin tijdens de installatie',
        caption: 'Installatie en service door onze eigen loodgieters.',
    },
];

const useStyles = makeStyles()({
    benefitPhotos: {
        paddingBottom: sectionSpacing,
    },
    installationPhotos: {
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
    },
});

export default function Home() {
    const { classes } = useStyles();

    useDocumentTitle();

    return (
        <>
            <Hero />
            <Benefits />
            <PhotoStrip
                items={benefitPhotos}
                minColumnWidth={240}
                className={classes.benefitPhotos}
            />
            <HowItWorks />
            <Comparison />
            <Kinetico />
            <Systems />
            <Guarantees />
            <DrinkingWater />
            <About />
            <Faq />
            <PhotoStrip
                items={installationPhotos}
                minColumnWidth={280}
                className={classes.installationPhotos}
            />
        </>
    );
}
