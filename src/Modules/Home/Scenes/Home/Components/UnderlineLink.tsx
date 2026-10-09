import { Link } from '@mui/material';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import { green, greenDark, navy, white } from 'src/colors';

interface IProps {
    to: string;
    children: ReactNode;
    dark?: boolean;
}

const useStyles = makeStyles()(theme => ({
    root: {
        display: 'inline-block',
        paddingBottom: 3,
        borderBottom: `1px solid ${green}`,
        fontWeight: 600,
        fontSize: theme.typography.body1.fontSize,
        lineHeight: 1.4,
        color: navy,
        '&:hover': {
            // greenHover haalt op wit geen 4.5:1
            color: greenDark,
        },
    },
    dark: {
        color: white,
        '&:hover': {
            color: white,
            borderBottomColor: white,
        },
    },
}));

export default function UnderlineLink(props: IProps) {
    const { to, children, dark = false } = props;

    const { classes, cx } = useStyles();

    return (
        <Link component={RouterLink} to={to} className={cx(classes.root, dark && classes.dark)}>
            {children}
        </Link>
    );
}
