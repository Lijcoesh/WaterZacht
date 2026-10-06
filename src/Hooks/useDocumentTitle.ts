import { useEffect } from 'react';

import { companyName } from 'src/Config/contact';

// Zet de paginatitel als "<titel> | Water Zacht"; zonder titel alleen de standaardtitel.
export function useDocumentTitle(title?: string) {
    useEffect(() => {
        const defaultTitle = `${companyName} — waterontharders & waterzuivering in het Westland`;
        document.title = title ? `${title} | ${companyName}` : defaultTitle;
    }, [title]);
}
