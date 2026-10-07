import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Button, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

import { border, muted, navy, slate, surface } from 'src/colors';
import FormField from 'src/Components/FormField';
import PrivacyNotice from 'src/Components/PrivacyNotice';
import SubmitErrorAlert from 'src/Components/SubmitErrorAlert';
import { bagSizes, deliveryMinimums, maxBagsPerSize } from 'src/Config/saltOrder';
import {
    hasErrors,
    maxLengths,
    validateEmail,
    validatePhone,
    validatePostalCode,
    validateRequired,
} from 'src/Helpers/formValidation';
import type { FieldErrors } from 'src/Helpers/formValidation';
import { ApiError } from 'src/Logic/postJson';
import type {
    BagLine,
    BagSize,
    DeliveryMethod,
    SaltOrder,
} from 'src/Modules/SaltOrder/Definitions/SaltOrder';
import {
    describeBags,
    describeDeliveryMinimum,
    meetsDeliveryMinimum,
} from 'src/Modules/SaltOrder/Logic/describeBags';
import { sendSaltOrder } from 'src/Modules/SaltOrder/Logic/sendSaltOrder';
import { cardRadius } from 'src/Theme/sizes';

import BagCounter from './BagCounter';
import ChoiceCard from './ChoiceCard';
import OrderConfirmation from './OrderConfirmation';
import OrderStep from './OrderStep';
import PickupNotice from './PickupNotice';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Details {
    name: string;
    phone: string;
    email: string;
    street: string;
    postalCode: string;
    city: string;
    note: string;
}

const emptyDetails: Details = {
    name: '',
    phone: '',
    email: '',
    street: '',
    postalCode: '',
    city: '',
    note: '',
};

const emptyCounts: Record<BagSize, number> = { 15: 0, 25: 0 };

// Op volgorde van het formulier, zodat de focus naar het eerste foute veld gaat
function validate(details: Details, method: DeliveryMethod): FieldErrors<Details> {
    const isDelivery = method === 'delivery';

    return {
        name: validateRequired(details.name, 'Vul uw naam in.'),
        phone: validatePhone(details.phone),
        email: validateEmail(details.email),
        street: isDelivery
            ? validateRequired(details.street, 'Vul uw straat en huisnummer in.')
            : null,
        postalCode: isDelivery ? validatePostalCode(details.postalCode) : null,
        city: isDelivery ? validateRequired(details.city, 'Vul uw woonplaats in.') : null,
    };
}

const methods: {
    value: DeliveryMethod;
    title: string;
    description: string;
    icon: ReactNode;
}[] = [
    {
        value: 'delivery',
        title: 'Bezorgen',
        description: `Wij brengen het zout bij u thuis. Vanaf ${describeDeliveryMinimum()}.`,
        icon: <LocalShippingOutlinedIcon />,
    },
    {
        value: 'pickup',
        title: 'Zelf afhalen',
        description: 'U haalt het zout op in De Lier en bepaalt zelf hoeveel zakken.',
        icon: <StorefrontOutlinedIcon />,
    },
];

const useStyles = makeStyles()(theme => ({
    header: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap',
        marginBottom: 28,
    },
    title: {
        color: navy,
    },
    required: {
        fontSize: 13,
        color: muted,
    },
    choices: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: 12,
    },
    counters: {
        display: 'grid',
        gap: 10,
    },
    notice: {
        marginTop: 14,
    },
    minimum: {
        marginTop: 14,
        fontSize: 14.5,
        lineHeight: 1.55,
        color: slate,
    },
    fields: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
        },
    },
    full: {
        gridColumn: '1 / -1',
    },
    summary: {
        marginTop: 26,
        padding: '18px 20px',
        backgroundColor: surface,
        border: `1px solid ${border}`,
        borderRadius: cardRadius,
    },
    summaryLabel: {
        color: muted,
    },
    summaryValue: {
        marginTop: 6,
        fontWeight: 600,
        fontSize: 17,
        lineHeight: 1.4,
        color: navy,
    },
    summaryNote: {
        marginTop: 6,
        fontSize: 14.5,
        lineHeight: 1.5,
        color: slate,
    },
    error: {
        marginTop: 20,
    },
    submit: {
        marginTop: 20,
        fontSize: 16.5,
    },
    privacy: {
        marginTop: 14,
    },
}));

export default function SaltOrderForm() {
    const { classes } = useStyles();

    const [method, setMethod] = useState<DeliveryMethod | null>(null);
    const [counts, setCounts] = useState<Record<BagSize, number>>(emptyCounts);
    const [details, setDetails] = useState<Details>(emptyDetails);
    const [status, setStatus] = useState<Status>('idle');
    const [placedOrder, setPlacedOrder] = useState<SaltOrder | null>(null);
    const [errors, setErrors] = useState<FieldErrors<Details>>({});
    const [errorStatus, setErrorStatus] = useState<number | null>(null);

    const bags = useMemo<BagLine[]>(
        () => bagSizes.map(size => ({ size, count: counts[size] })).filter(line => line.count > 0),
        [counts],
    );

    const hasMethod = method !== null;
    const hasBags = method === 'delivery' ? meetsDeliveryMinimum(bags) : bags.length > 0;

    const handleDetailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setDetails(current => ({ ...current, [name]: value }));
        setErrors(current => ({ ...current, [name]: null }));
    };

    const handleMethodChange = (next: DeliveryMethod) => {
        if (next === method) return;

        setMethod(next);
        setCounts(next === 'delivery' ? deliveryMinimums : emptyCounts);
    };

    const handleCountChange = (size: BagSize, count: number) => {
        setCounts(current => ({ ...current, [size]: count }));
    };

    const reset = () => {
        setMethod(null);
        setCounts(emptyCounts);
        setDetails(emptyDetails);
        setErrors({});
        setPlacedOrder(null);
        setStatus('idle');
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!method || !hasBags) return;

        const fieldErrors = validate(details, method);
        setErrors(fieldErrors);
        if (hasErrors(fieldErrors)) {
            const firstInvalid = Object.entries(fieldErrors).find(([, error]) => error);
            document.getElementById(`salt-${firstInvalid?.[0]}`)?.focus();
            return;
        }

        const order: SaltOrder = {
            method,
            bags,
            customer: { name: details.name, phone: details.phone, email: details.email },
            address:
                method === 'delivery'
                    ? {
                          street: details.street,
                          postalCode: details.postalCode,
                          city: details.city,
                      }
                    : null,
            note: details.note,
        };

        setStatus('sending');

        try {
            await sendSaltOrder(order);
            setPlacedOrder(order);
            setStatus('sent');
        } catch (error) {
            setErrorStatus(error instanceof ApiError ? error.status : null);
            setStatus('error');
        }
    };

    if (status === 'sent' && placedOrder) {
        return <OrderConfirmation order={placedOrder} onNewOrder={reset} />;
    }

    return (
        <form onSubmit={handleSubmit} aria-labelledby="salt-form-title" noValidate>
            <div className={classes.header}>
                <Typography id="salt-form-title" variant="h3" className={classes.title}>
                    Uw bestelling
                </Typography>
                <span className={classes.required}>Velden met * zijn verplicht</span>
            </div>

            <OrderStep
                number={1}
                title="Hoe wilt u het zout ontvangen?"
                done={hasMethod}
                locked={false}
                lockedHint=""
            >
                <div className={classes.choices}>
                    {methods.map(item => (
                        <ChoiceCard
                            key={item.value}
                            name="method"
                            value={item.value}
                            checked={method === item.value}
                            onChange={() => handleMethodChange(item.value)}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </OrderStep>

            <OrderStep
                number={2}
                title="Hoeveel zakken wilt u?"
                done={hasBags}
                locked={!hasMethod}
                lockedHint="Kies eerst of u het zout wilt laten bezorgen of zelf afhalen."
            >
                <div className={classes.counters}>
                    {bagSizes.map(size => (
                        <BagCounter
                            key={size}
                            size={size}
                            value={counts[size]}
                            min={method === 'delivery' ? deliveryMinimums[size] : 0}
                            max={maxBagsPerSize}
                            onChange={count => handleCountChange(size, count)}
                        />
                    ))}
                </div>
                {method === 'delivery' ? (
                    <Typography className={classes.minimum}>
                        Bezorgen kan vanaf {describeDeliveryMinimum()}. Wilt u maar één maat? Zet de
                        andere dan op 0.
                    </Typography>
                ) : (
                    <div className={classes.notice}>
                        <PickupNotice />
                    </div>
                )}
            </OrderStep>

            <OrderStep
                number={3}
                title="Uw gegevens"
                done={false}
                locked={!hasBags}
                lockedHint={
                    method === 'delivery'
                        ? `Bezorgen kan vanaf ${describeDeliveryMinimum()}.`
                        : 'Kies eerst hoeveel zakken u wilt afhalen.'
                }
            >
                <div className={classes.fields}>
                    <FormField
                        id="salt-name"
                        name="name"
                        label="Naam"
                        value={details.name}
                        onChange={handleDetailChange}
                        autoComplete="name"
                        maxLength={maxLengths.name}
                        error={errors.name}
                        required
                        className={classes.full}
                    />
                    <FormField
                        id="salt-phone"
                        name="phone"
                        label="Telefoonnummer"
                        type="tel"
                        value={details.phone}
                        onChange={handleDetailChange}
                        autoComplete="tel"
                        maxLength={maxLengths.phone}
                        error={errors.phone}
                        required
                    />
                    <FormField
                        id="salt-email"
                        name="email"
                        label="E-mailadres"
                        type="email"
                        value={details.email}
                        onChange={handleDetailChange}
                        autoComplete="email"
                        maxLength={maxLengths.email}
                        error={errors.email}
                        required
                    />
                    {method === 'delivery' && (
                        <>
                            <FormField
                                id="salt-street"
                                name="street"
                                label="Straat en huisnummer"
                                value={details.street}
                                onChange={handleDetailChange}
                                autoComplete="street-address"
                                maxLength={maxLengths.street}
                                error={errors.street}
                                required
                                className={classes.full}
                            />
                            <FormField
                                id="salt-postalCode"
                                name="postalCode"
                                label="Postcode"
                                value={details.postalCode}
                                onChange={handleDetailChange}
                                autoComplete="postal-code"
                                placeholder="1234 AB"
                                maxLength={maxLengths.postalCode}
                                error={errors.postalCode}
                                required
                            />
                            <FormField
                                id="salt-city"
                                name="city"
                                label="Plaats"
                                value={details.city}
                                onChange={handleDetailChange}
                                autoComplete="address-level2"
                                maxLength={maxLengths.city}
                                error={errors.city}
                                required
                            />
                        </>
                    )}
                    <FormField
                        id="salt-note"
                        name="note"
                        label="Opmerking"
                        value={details.note}
                        onChange={handleDetailChange}
                        placeholder={
                            method === 'delivery'
                                ? 'Bijvoorbeeld waar we de zakken mogen neerzetten'
                                : undefined
                        }
                        multiline
                        maxLength={maxLengths.note}
                        className={classes.full}
                    />
                </div>

                <div className={classes.summary}>
                    <Typography variant="caption" component="p" className={classes.summaryLabel}>
                        Samenvatting
                    </Typography>
                    <Typography className={classes.summaryValue}>
                        {describeBags(bags)}, {method === 'delivery' ? 'bezorgd' : 'zelf afhalen'}
                    </Typography>
                    <Typography className={classes.summaryNote}>
                        U betaalt achteraf, op rekening.
                    </Typography>
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
                    {status === 'sending' ? 'Bezig met verzenden…' : 'Bestelling versturen'}
                </Button>
                <PrivacyNotice subject="bestelling" className={classes.privacy} />
            </OrderStep>
        </form>
    );
}
