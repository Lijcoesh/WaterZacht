import {
    Alert,
    Button,
    FilledInput,
    FormControl,
    FormLabel,
    Link,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { keyframes } from 'tss-react';
import { makeStyles } from 'tss-react/mui';

import { greenDark, greenTintStrong, muted, navy, slate } from 'src/colors';
import { email, emailHref, phoneDisplay, phoneHref } from 'src/Config/contact';
import { sendQuoteRequest } from 'src/Modules/Home/Logic/sendQuoteRequest';
import type { QuoteRequest } from 'src/Modules/Home/Logic/sendQuoteRequest';

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
    label: {
        marginBottom: 8,
        color: muted,
        '&.Mui-focused': {
            color: muted,
        },
        '& .MuiFormLabel-asterisk': {
            display: 'none',
        },
    },
    error: {
        marginTop: 20,
    },
    submit: {
        marginTop: 24,
        fontSize: 16.5,
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

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setRequest(current => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('sending');

        try {
            await sendQuoteRequest(request);
            setStatus('sent');
            setRequest(emptyRequest);
        } catch {
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
        <form onSubmit={handleSubmit} aria-labelledby="quote-title">
            <div className={classes.header}>
                <Typography id="quote-title" variant="h3" className={classes.title}>
                    Vraag uw offerte aan
                </Typography>
                <span className={classes.required}>Velden met * zijn verplicht</span>
            </div>
            <div className={classes.fields}>
                {fields.map(field => (
                    <FormControl key={field.name} required>
                        <FormLabel htmlFor={`quote-${field.name}`} className={classes.label}>
                            <Typography variant="caption">{field.label} *</Typography>
                        </FormLabel>
                        <FilledInput
                            id={`quote-${field.name}`}
                            name={field.name}
                            type={field.type}
                            value={request[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            autoComplete={field.autoComplete}
                            multiline={field.multiline}
                            minRows={field.multiline ? 4 : undefined}
                        />
                    </FormControl>
                ))}
            </div>
            {status === 'error' && (
                <Alert severity="error" className={classes.error}>
                    Verzenden is niet gelukt. Bel ons op{' '}
                    <Link href={phoneHref}>{phoneDisplay}</Link> of mail naar{' '}
                    <Link href={emailHref}>{email}</Link>.
                </Alert>
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
        </form>
    );
}
