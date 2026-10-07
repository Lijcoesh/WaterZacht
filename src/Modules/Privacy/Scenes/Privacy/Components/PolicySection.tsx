import { Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

import { border, navy } from 'src/colors';

interface IProps {
    title: string;
    children: ReactNode;
}

const useStyles = makeStyles()({
    root: {
        paddingTop: 32,
        marginTop: 32,
        borderTop: `1px solid ${border}`,
        '& p + p, & p + ul, & ul + p': {
            marginTop: 14,
        },
        '& ul': {
            margin: 0,
            paddingLeft: 22,
        },
        '& li + li': {
            marginTop: 6,
        },
    },
    title: {
        marginBottom: 14,
        color: navy,
    },
});

export default function PolicySection(props: IProps) {
    const { title, children } = props;

    const { classes } = useStyles();

    return (
        <section className={classes.root}>
            <Typography variant="h3" component="h2" className={classes.title}>
                {title}
            </Typography>
            {children}
        </section>
    );
}
