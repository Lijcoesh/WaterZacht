import Footer from 'src/Components/Footer';
import Header from 'src/Components/Header';
import Home from 'src/Modules/Home/Scenes/Home/Home';

export default function App() {
    return (
        <>
            <Header />
            <main id="main" tabIndex={-1}>
                <Home />
            </main>
            <Footer />
        </>
    );
}
