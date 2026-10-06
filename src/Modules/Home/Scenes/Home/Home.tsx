import { useDocumentTitle } from 'src/Hooks/useDocumentTitle';

import Benefits from './Components/Benefits';
import ClosingCta from './Components/ClosingCta';
import Comparison from './Components/Comparison';
import DrinkingWater from './Components/DrinkingWater';
import Guarantees from './Components/Guarantees';
import Hero from './Components/Hero';
import HowItWorks from './Components/HowItWorks';
import Kinetico from './Components/Kinetico';

export default function Home() {
    useDocumentTitle();

    return (
        <>
            <Hero />
            <Benefits />
            <HowItWorks />
            <Comparison />
            <Kinetico />
            <Guarantees />
            <DrinkingWater />
            <ClosingCta />
        </>
    );
}
