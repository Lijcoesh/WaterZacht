import type { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

import { navy, openPoint, openPointBorder } from 'src/colors';

interface IProps {
    children: ReactNode;
}

const useStyles = makeStyles()({
    root: {
        padding: '1px 6px',
        backgroundColor: openPoint,
        borderLeft: `3px solid ${openPointBorder}`,
        color: navy,
        // Over meerdere regels krijgt elke regel zijn eigen achtergrond en rand
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
    },
    label: {
        fontWeight: 600,
    },
});

// Markeert een punt dat de PO nog moet invullen of bevestigen. Het label maakt het ook
// zonder kleur herkenbaar.
export default function OpenPoint(props: IProps) {
    const { children } = props;

    const { classes } = useStyles();

    return (
        <span className={classes.root}>
            <span className={classes.label}>Open punt:</span> {children}
        </span>
    );
}
