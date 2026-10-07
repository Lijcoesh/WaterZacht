import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { keyframes } from 'tss-react';
import { makeStyles } from 'tss-react/mui';

import { greenDark, greenTintStrong, muted, navy, slate } from 'src/colors';
import FormField from 'src/Components/FormField';
import PrivacyNotice from 'src/Components/PrivacyNotice';
import SubmitErrorAlert from 'src/Components/SubmitErrorAlert';
import {
    hasErrors,
    maxLengths,
    validateEmail,
    validatePhone,
    validateRequired,
} from 'src/Helpers/formValidation';
import type { FieldErrors } from 'src/Helpers/formValidation';
import { ApiError } from 'src/Logic/postJson';
import { sendQuoteRequest } from 'src/Modules/Contact/Logic/sendQuoteRequest';
import type { QuoteRequest } from 'src/Modules/Contact/Logic/sendQuoteRequest';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const fields: {
    name: keyof QuoteRequest;
    label: string;
    type: string;
    placeholder: string;
    multiline?: boolean;
    autoComplete: string;
}[] = [
    { name: 'name', label: 'Naam', type: 'text', placeholder: 'Uw naam', autoComplete: 'name' },
    {
        name: 'phone',
        label: 'Telefoonnummer',
        type: 'tel',
        placeholder: 'Uw telefoonnummer',
        autoComplete: 'tel',
    },
    {
        name: 'email',
        label: 'E-mailadres',
        type: 'email',
        placeholder: 'Uw e-mailadres',
        autoComplete: 'email',
    },
    {
        name: 'message',
        label: 'Bericht',
        type: 'text',
        placeholder: 'Waar kunnen wij u mee helpen?',
        multiline: true,
        autoComplete: 'off',
    },
];

const emptyRequest: QuoteRequest = { name: '', phone: '', email: '', message: '' };

function validate(request: QuoteRequest): FieldErrors<QuoteRequest> {
    return {
        name: validateRequired(request.name, 'Vul uw naam in.'),
        phone: validatePhone(request.phone),
        email: validateEmail(request.email),
        message: validateRequired(request.message, 'Vul uw bericht in.'),
    };
}

const fadeIn = keyframes({
    from: { opacity: 0, transform: 'translateY(6px)' },
    to: { opacity: 1, transform: 'none' },
});

const useStyles = makeStyles()({
    header: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap',
    },
    title: {
        color: navy,
    },
    required: {
        fontSize: 13,
        color: muted,
    },
    fields: {
        display: 'grid',
        gap: 16,
        marginTop: 24,
    },
    error: {
        marginTop: 20,
    },
    submit: {
        marginTop: 24,
        fontSize: 16.5,
    },
    privacy: {
        marginTop: 14,
    },
    sent: {
        padding: '24px 0',
        animation: `${fadeIn} .35s ease both`,
    },
    check: {
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: greenTintStrong,
        color: greenDark,
        fontWeight: 600,
        fontSize: 22,
    },
    sentTitle: {
        marginTop: 22,
        fontSize: 26,
        lineHeight: 1.25,
        color: navy,
    },
    sentText: {
        marginTop: 14,
        lineHeight: 1.7,
        color: slate,
    },
});

export default function QuoteForm() {
    const { classes } = useStyles();

    const [request, setRequest] = useState<QuoteRequest>(emptyRequest);
    const [status, setStatus] = useState<Status>('idle');
    const [errors, setErrors] = useState<FieldErrors<QuoteRequest>>({});
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setRequest(current => ({ ...current, [name]: value }));
        setErrors(current => ({ ...current, [name]: null }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const fieldErrors = validate(request);
        setErrors(fieldErrors);
        if (hasErrors(fieldErrors)) {
            const firstInvalid = fields.find(field => fieldErrors[field.name]);
            document.getElementById(`quote-${firstInvalid?.name}`)?.focus();
            return;
        }

        setStatus('sending');

        try {
            await sendQuoteRequest(request);
            setStatus('sent');
            setRequest(emptyRequest);
        } catch (error) {
            setErrorStatus(error instanceof ApiError ? error.status : null);
            setStatus('error');
        }
    };

    if (status === 'sent') {
        return (
            <div className={classes.sent} role="status">
                <div className={classes.check} aria-hidden="true">
                    ✓
                </div>
                <Typography variant="h3" className={classes.sentTitle}>
                    Uw bericht is in goede orde aangekomen.
                </Typography>
                <Typography className={classes.sentText}>
                    Ik neem zo snel mogelijk contact met u op.
                    <br />
                    Met vriendelijke groet, Water Zacht
                </Typography>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} aria-labelledby="quote-title" noValidate>
            <div className={classes.header}>
                <Typography id="quote-title" variant="h3" className={classes.title}>
                    Vraag uw offerte aan
                </Typography>
                <span className={classes.required}>Velden met * zijn verplicht</span>
            </div>
            <div className={classes.fields}>
                {fields.map(field => (
                    <FormField
                        key={field.name}
                        id={`quote-${field.name}`}
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        value={request[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        multiline={field.multiline}
                        minRows={4}
                        maxLength={maxLengths[field.name]}
                        error={errors[field.name]}
                        required
                    />
                ))}
            </div>
            {status === 'error' && (
                <SubmitErrorAlert status={errorStatus} className={classes.error} />
            )}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={status === 'sending'}
                className={classes.submit}
            >
                {status === 'sending' ? 'Bezig met verzenden…' : 'Verzenden'}
            </Button>
            <PrivacyNotice subject="aanvraag" className={classes.privacy} />
        </form>
    );
}
