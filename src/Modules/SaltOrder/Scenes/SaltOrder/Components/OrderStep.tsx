import { Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { keyframes } from 'tss-react';
import { makeStyles } from 'tss-react/mui';

import { border, green, muted, navy, white } from 'src/colors';

interface IProps {
    number: number;
    title: string;
    done: boolean;
    // Vergrendeld tot de vorige stap is ingevuld
    locked: boolean;
    lockedHint: string;
    children: ReactNode;
}

const reveal = keyframes({
    from: { opacity: 0, transform: 'translateY(6px)' },
    to: { opacity: 1, transform: 'none' },
});

const badgeSize = 36;

const useStyles = makeStyles()({
    root: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: `${badgeSize}px minmax(0, 1fr)`,
        columnGap: 18,
        paddingBottom: 32,
        // Verticale lijn die de stappen verbindt
        '&:not(:last-of-type)::after': {
            content: '""',
            position: 'absolute',
            left: badgeSize / 2,
            top: badgeSize + 6,
            bottom: 6,
            width: 1,
            backgroundColor: border,
        },
        '&:last-of-type': {
            paddingBottom: 0,
        },
    },
    badge: {
        width: badgeSize,
        height: badgeSize,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontWeight: 600,
        fontSize: 15,
        backgroundColor: navy,
        color: white,
        transition: 'background-color .2s ease, color .2s ease',
    },
    badgeDone: {
        backgroundColor: green,
        color: navy,
    },
    badgeLocked: {
        backgroundColor: white,
        border: `1px solid ${border}`,
        color: muted,
    },
    fieldset: {
        minWidth: 0,
        margin: 0,
        padding: 0,
        border: 0,
    },
    legend: {
        float: 'left',
        width: '100%',
        padding: 0,
        minHeight: badgeSize,
        display: 'flex',
        alignItems: 'center',
        color: navy,
    },
    legendLocked: {
        color: muted,
    },
    body: {
        clear: 'both',
        paddingTop: 14,
        animation: `${reveal} .3s ease both`,
    },
    hint: {
        clear: 'both',
        paddingTop: 2,
        fontSize: 14.5,
        color: muted,
    },
});

export default function OrderStep(props: IProps) {
    const { number, title, done, locked, lockedHint, children } = props;

    const { classes, cx } = useStyles();

    return (
        <div className={classes.root}>
            <div
                className={cx(
                    classes.badge,
                    done && classes.badgeDone,
                    locked && classes.badgeLocked,
                )}
                aria-hidden="true"
            >
                {done ? '✓' : number}
            </div>
            <fieldset className={classes.fieldset} disabled={locked}>
                <Typography
                    variant="h4"
                    component="legend"
                    className={cx(classes.legend, locked && classes.legendLocked)}
                >
                    {title}
                </Typography>
                {locked ? (
                    <Typography className={classes.hint}>{lockedHint}</Typography>
                ) : (
                    <div className={classes.body}>{children}</div>
                )}
            </fieldset>
        </div>
    );
}
