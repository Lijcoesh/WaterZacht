import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { blue, green, navy, onDarkEyebrow, white } from 'src/colors';

interface IProps {
    eyebrow: string;
    title: string;
    id?: string;
    dark?: boolean;
    // h1 voor de kop van een losse pagina, h2 voor een sectie binnen een pagina
    level?: 'h1' | 'h2';
}

const useStyles = makeStyles()({
    eyebrow: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        color: blue,
        '&::before': {
            content: '""',
            width: 26,
            height: 1,
            backgroundColor: green,
        },
    },
    eyebrowDark: {
        color: onDarkEyebrow,
    },
    title: {
        margin: '18px 0 0',
        color: navy,
    },
    titleDark: {
        color: white,
    },
});

export default function SectionHeading(props: IProps) {
    const { eyebrow, title, id, dark = false, level = 'h2' } = props;

    const { classes, cx } = useStyles();

    return (
        <>
            <Typography
                variant="overline"
                component="p"
                className={cx(classes.eyebrow, dark && classes.eyebrowDark)}
            >
                {eyebrow}
            </Typography>
            <Typography
                id={id}
                variant="h2"
                component={level}
                className={cx(classes.title, dark && classes.titleDark)}
            >
                {title}
            </Typography>
        </>
    );
}
