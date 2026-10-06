import { Button, Typography } from '@mui/material';
import { keyframes } from 'tss-react';
import { makeStyles } from 'tss-react/mui';

import { border, greenDark, greenTintStrong, muted, navy, slate } from 'src/colors';
import type { SaltOrder } from 'src/Modules/SaltOrder/Definitions/SaltOrder';
import { describeBags } from 'src/Modules/SaltOrder/Logic/describeBags';

import PickupNotice from './PickupNotice';

interface IProps {
    order: SaltOrder;
    onNewOrder: () => void;
}

const fadeIn = keyframes({
    from: { opacity: 0, transform: 'translateY(6px)' },
    to: { opacity: 1, transform: 'none' },
});

const useStyles = makeStyles()({
    root: {
        padding: '12px 0',
        animation: `${fadeIn} .35s ease both`,
    },
    check: {
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: greenTintStrong,
        color: greenDark,
        fontWeight: 600,
        fontSize: 22,
    },
    title: {
        marginTop: 22,
        fontSize: 26,
        lineHeight: 1.25,
        color: navy,
    },
    text: {
        marginTop: 12,
        lineHeight: 1.7,
        color: slate,
    },
    summary: {
        margin: '24px 0',
        borderTop: `1px solid ${border}`,
    },
    row: {
        display: 'flex',
        gap: 18,
        padding: '14px 0',
        borderBottom: `1px solid ${border}`,
    },
    rowLabel: {
        flex: 'none',
        width: 110,
        color: muted,
    },
    rowValue: {
        margin: 0,
        fontWeight: 500,
        lineHeight: 1.5,
        color: navy,
    },
    again: {
        marginTop: 24,
    },
});

export default function OrderConfirmation(props: IProps) {
    const { order, onNewOrder } = props;

    const { classes } = useStyles();

    const rows = [
        { label: 'Zout', value: describeBags(order.bags) },
        { label: 'Wijze', value: order.method === 'delivery' ? 'Bezorgen' : 'Zelf afhalen' },
        ...(order.address
            ? [
                  {
                      label: 'Bezorgadres',
                      value: `${order.address.street}, ${order.address.postalCode} ${order.address.city}`,
                  },
              ]
            : []),
        { label: 'Betaling', value: 'Achteraf, op rekening' },
    ];

    return (
        <div className={classes.root} role="status">
            <div className={classes.check} aria-hidden="true">
                ✓
            </div>
            <Typography variant="h3" className={classes.title}>
                Bedankt, {order.customer.name}!
            </Typography>
            <Typography className={classes.text}>
                Uw bestelling is ontvangen en wordt doorgevoerd.
            </Typography>
            <dl className={classes.summary}>
                {rows.map(row => (
                    <div key={row.label} className={classes.row}>
                        <Typography variant="caption" component="dt" className={classes.rowLabel}>
                            {row.label}
                        </Typography>
                        <dd className={classes.rowValue}>{row.value}</dd>
                    </div>
                ))}
            </dl>
            {order.method === 'pickup' && <PickupNotice />}
            <Button
                variant="outlined"
                color="secondary"
                onClick={onNewOrder}
                className={classes.again}
            >
                Nog een bestelling plaatsen
            </Button>
        </div>
    );
}
