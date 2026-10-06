import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Alert, Button, Link, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

import { border, muted, navy, slate, surface } from 'src/colors';
import { email, emailHref, phoneDisplay, phoneHref } from 'src/Config/contact';
import { bagSizes, deliveryPackages, maxPickupBagsPerSize } from 'src/Config/saltOrder';
import type {
    BagLine,
    BagSize,
    DeliveryMethod,
    SaltOrder,
} from 'src/Modules/SaltOrder/Definitions/SaltOrder';
import { describeBagLine, describeBags } from 'src/Modules/SaltOrder/Logic/describeBags';
import { sendSaltOrder } from 'src/Modules/SaltOrder/Logic/sendSaltOrder';
import { cardRadius } from 'src/Theme/sizes';

import BagCounter from './BagCounter';
import ChoiceCard from './ChoiceCard';
import OrderConfirmation from './OrderConfirmation';
import OrderField from './OrderField';
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

const methods: {
    value: DeliveryMethod;
    title: string;
    description: string;
    icon: ReactNode;
}[] = [
    {
        value: 'delivery',
        title: 'Bezorgen',
        description: 'Wij brengen het zout bij u thuis. Vanaf 6 zakken van 15 kg of 4 van 25 kg.',
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
}));

export default function SaltOrderForm() {
    const { classes } = useStyles();

    const [method, setMethod] = useState<DeliveryMethod | null>(null);
    const [packageId, setPackageId] = useState<string | null>(null);
    const [pickupCounts, setPickupCounts] = useState<Record<BagSize, number>>(emptyCounts);
    const [details, setDetails] = useState<Details>(emptyDetails);
    const [status, setStatus] = useState<Status>('idle');
    const [placedOrder, setPlacedOrder] = useState<SaltOrder | null>(null);

    const bags = useMemo<BagLine[]>(() => {
        if (method === 'delivery') {
            const selected = deliveryPackages.find(item => item.id === packageId);

            return selected ? [{ size: selected.size, count: selected.count }] : [];
        }

        if (method === 'pickup') {
            return bagSizes
                .map(size => ({ size, count: pickupCounts[size] }))
                .filter(line => line.count > 0);
        }

        return [];
    }, [method, packageId, pickupCounts]);

    const hasMethod = method !== null;
    const hasBags = bags.length > 0;

    const handleDetailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setDetails(current => ({ ...current, [name]: value }));
    };

    const handleCountChange = (size: BagSize, count: number) => {
        setPickupCounts(current => ({ ...current, [size]: count }));
    };

    const reset = () => {
        setMethod(null);
        setPackageId(null);
        setPickupCounts(emptyCounts);
        setDetails(emptyDetails);
        setPlacedOrder(null);
        setStatus('idle');
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!method || !hasBags) return;

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
        } catch {
            setStatus('error');
        }
    };

    if (status === 'sent' && placedOrder) {
        return <OrderConfirmation order={placedOrder} onNewOrder={reset} />;
    }

    return (
        <form onSubmit={handleSubmit} aria-labelledby="salt-form-title">
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
                            onChange={() => setMethod(item.value)}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                        />
                    ))}
                </div>
            </OrderStep>

            <OrderStep
                number={2}
                title={method === 'delivery' ? 'Kies uw pakket' : 'Hoeveel zakken wilt u?'}
                done={hasBags}
                locked={!hasMethod}
                lockedHint="Kies eerst of u het zout wilt laten bezorgen of zelf afhalen."
            >
                {method === 'delivery' ? (
                    <div className={classes.choices}>
                        {deliveryPackages.map(item => (
                            <ChoiceCard
                                key={item.id}
                                name="package"
                                value={item.id}
                                checked={packageId === item.id}
                                onChange={() => setPackageId(item.id)}
                                title={describeBagLine(item)}
                                description={`${item.size * item.count} kg in totaal, aan huis bezorgd`}
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className={classes.counters}>
                            {bagSizes.map(size => (
                                <BagCounter
                                    key={size}
                                    size={size}
                                    value={pickupCounts[size]}
                                    max={maxPickupBagsPerSize}
                                    onChange={count => handleCountChange(size, count)}
                                />
                            ))}
                        </div>
                        <div className={classes.notice}>
                            <PickupNotice />
                        </div>
                    </>
                )}
            </OrderStep>

            <OrderStep
                number={3}
                title="Uw gegevens"
                done={false}
                locked={!hasBags}
                lockedHint={
                    method === 'pickup'
                        ? 'Kies eerst hoeveel zakken u wilt afhalen.'
                        : 'Kies eerst een pakket.'
                }
            >
                <div className={classes.fields}>
                    <OrderField
                        name="name"
                        label="Naam"
                        value={details.name}
                        onChange={handleDetailChange}
                        autoComplete="name"
                        required
                        className={classes.full}
                    />
                    <OrderField
                        name="phone"
                        label="Telefoonnummer"
                        type="tel"
                        value={details.phone}
                        onChange={handleDetailChange}
                        autoComplete="tel"
                        required
                    />
                    <OrderField
                        name="email"
                        label="E-mailadres"
                        type="email"
                        value={details.email}
                        onChange={handleDetailChange}
                        autoComplete="email"
                        required
                    />
                    {method === 'delivery' && (
                        <>
                            <OrderField
                                name="street"
                                label="Straat en huisnummer"
                                value={details.street}
                                onChange={handleDetailChange}
                                autoComplete="street-address"
                                required
                                className={classes.full}
                            />
                            <OrderField
                                name="postalCode"
                                label="Postcode"
                                value={details.postalCode}
                                onChange={handleDetailChange}
                                autoComplete="postal-code"
                                required
                            />
                            <OrderField
                                name="city"
                                label="Plaats"
                                value={details.city}
                                onChange={handleDetailChange}
                                autoComplete="address-level2"
                                required
                            />
                        </>
                    )}
                    <OrderField
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
                    {status === 'sending' ? 'Bezig met verzenden…' : 'Bestelling versturen'}
                </Button>
            </OrderStep>
        </form>
    );
}
