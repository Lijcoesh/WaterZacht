import { Navigate, Route, Routes } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import Footer from 'src/Components/Footer';
import Header from 'src/Components/Header';
import { useScrollToHash } from 'src/Hooks/useScrollToHash';
import Contact from 'src/Modules/Contact/Scenes/Contact/Contact';
import Home from 'src/Modules/Home/Scenes/Home/Home';

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
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
