import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { navy, white } from 'src/colors';

interface IProps {
    title: string;
    id?: string;
    dark?: boolean;
    // h1 voor de kop van een losse pagina, h2 voor een sectie binnen een pagina
    level?: 'h1' | 'h2';
}

const useStyles = makeStyles()({
    title: {
        margin: 0,
        color: navy,
    },
    titleDark: {
        color: white,
    },
});

export default function SectionHeading(props: IProps) {
    const { title, id, dark = false, level = 'h2' } = props;

    const { classes, cx } = useStyles();

    return (
        <Typography
            id={id}
            variant="h2"
            component={level}
            className={cx(classes.title, dark && classes.titleDark)}
        >
            {title}
        </Typography>
    );
}
