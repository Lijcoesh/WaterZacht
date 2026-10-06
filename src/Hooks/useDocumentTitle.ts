import { useEffect } from 'react';

import { companyName } from 'src/Config/contact';

// Zet de paginatitel als "<titel> | Water Zacht"; zonder titel alleen "Water Zacht".
export function useDocumentTitle(title?: string) {
    useEffect(() => {
        document.title = title ? `${title} | ${companyName}` : companyName;
    }, [title]);
}
