import { Link } from '@mui/material';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import { green, greenHover, navy } from 'src/colors';

interface IProps {
    to: string;
    children: ReactNode;
}

const useStyles = makeStyles()({
    root: {
        display: 'inline-block',
        paddingBottom: 3,
        borderBottom: `1px solid ${green}`,
        fontWeight: 600,
        fontSize: '0.97rem',
        lineHeight: 1.4,
        color: navy,
        '&:hover': {
            color: greenHover,
        },
    },
});

export default function UnderlineLink(props: IProps) {
    const { to, children } = props;

    const { classes } = useStyles();

    return (
        <Link component={RouterLink} to={to} className={classes.root}>
            {children}
        </Link>
    );
}
