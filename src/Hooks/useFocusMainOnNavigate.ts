import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

// Na navigatie naar een andere pagina de focus op <main>, zodat toetsenbord en screenreader
// bij de nieuwe inhoud beginnen in plaats van bij de aangeklikte link. Niet bij het laden
// van de site en niet bij een anker op dezelfde pagina.
export function useFocusMainOnNavigate() {
    const { pathname } = useLocation();
    const previousPathname = useRef(pathname);

    useEffect(() => {
        if (previousPathname.current === pathname) return;

        previousPathname.current = pathname;
        document.getElementById('main')?.focus({ preventScroll: true });
    }, [pathname]);
}
