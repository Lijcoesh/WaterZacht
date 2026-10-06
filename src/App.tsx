import { Navigate, Route, Routes } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import Footer from 'src/Components/Footer';
import Header from 'src/Components/Header';
import { useScrollToHash } from 'src/Hooks/useScrollToHash';
import About from 'src/Modules/About/Scenes/About/About';
import Contact from 'src/Modules/Contact/Scenes/Contact/Contact';
import Faq from 'src/Modules/Faq/Scenes/Faq/Faq';
import Home from 'src/Modules/Home/Scenes/Home/Home';
import SaltOrder from 'src/Modules/SaltOrder/Scenes/SaltOrder/SaltOrder';
import Systems from 'src/Modules/Systems/Scenes/Systems/Systems';

// Minstens schermhoog, zodat de footer op korte pagina's onderaan blijft
// in plaats van dat de body-achtergrond eronder zichtbaar wordt.
const useStyles = makeStyles()({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
});

export default function App() {
    const { classes } = useStyles();

    useScrollToHash();

    return (
        <div className={classes.root}>
            <Header />
            <main id="main" tabIndex={-1} className={classes.main}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/systemen" element={<Systems />} />
                    <Route path="/over-ons" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/zout-bestellen" element={<SaltOrder />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
