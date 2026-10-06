import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Na elke navigatie: naar het anker scrollen als de URL er een heeft ("/#voordelen"),
// anders naar boven. Afhankelijk van `key`, zodat ook een tweede klik op hetzelfde
// anker weer scrollt.
export function useScrollToHash() {
    const { hash, key } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }

        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    }, [hash, key]);
}
