import { Alert, Link } from '@mui/material';

import { email, emailHref, phoneDisplay, phoneHref } from 'src/Config/contact';

interface IProps {
    // Statuscode van de API, of null bij een netwerkfout
    status: number | null;
    className?: string;
}

export default function SubmitErrorAlert(props: IProps) {
    const { status, className } = props;

    const contact = (
        <>
            bel ons op <Link href={phoneHref}>{phoneDisplay}</Link> of mail naar{' '}
            <Link href={emailHref}>{email}</Link>
        </>
    );

    if (status === 400) {
        return (
            <Alert severity="error" className={className}>
                Een of meer gegevens kloppen niet. Controleer het formulier en probeer het opnieuw,
                of {contact}.
            </Alert>
        );
    }

    if (status === 429) {
        return (
            <Alert severity="warning" className={className}>
                U heeft kort geleden al iets verstuurd. Probeer het later opnieuw, of {contact}.
            </Alert>
        );
    }

    return (
        <Alert severity="error" className={className}>
            Verzenden is niet gelukt. Probeer het later opnieuw, of {contact}.
        </Alert>
    );
}
