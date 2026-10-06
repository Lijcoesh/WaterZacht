import { Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { blue, green, navy, white } from 'src/colors';
import { serifFontFamily } from 'src/Theme/typography';

const guarantees = [
    {
        value: '2 jaar',
        title: 'All-in garantie',
        text: 'De eerste twee jaar alles inbegrepen, zonder onderhoud te hoeven plegen.',
    },
    {
        value: '+ 8 jaar',
        title: 'Op alle onderdelen',
        text: 'Samen 10 jaar garantie — en dat zonder onderhoudscontract.',
    },
    {
        value: 'Elke 2 mnd',
        title: 'E-mailservice zoutvat',
        text: 'Wij herinneren u eraan uw zoutvat na te kijken.',
    },
];

const useStyles = makeStyles()(theme => ({
    // Blauwe band als rustpunt tussen de lichte secties. Alle tekst is wit:
    // lichtere tinten halen geen 4.5:1 op dit blauw.
    root: {
        backgroundColor: blue,
        backgroundImage: `linear-gradient(110deg, ${alpha(navy, 0)} 30%, ${alpha(navy, 0.35)} 100%)`,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    },
    item: {
        padding: 'clamp(36px, 4.4vw, 60px) 28px',
        borderLeft: `1px solid ${alpha(white, 0.22)}`,
        '&:first-of-type': {
            paddingLeft: 0,
            borderLeft: 0,
        },
        '&:last-of-type': {
            paddingRight: 0,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '28px 0',
            borderLeft: 0,
            borderTop: `1px solid ${alpha(white, 0.22)}`,
            '&:first-of-type': {
                borderTop: 0,
            },
        },
    },
    value: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: serifFontFamily,
        fontWeight: 300,
        fontSize: 'clamp(34px, 3.2vw, 44px)',
        lineHeight: 1,
        color: white,
        '&::before': {
            content: '""',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: green,
        },
    },
    title: {
        marginTop: 16,
        fontSize: 16.5,
        color: white,
    },
    text: {
        marginTop: 8,
        fontSize: 15.5,
        lineHeight: 1.6,
        color: white,
    },
}));

export default function Guarantees() {
    const { classes } = useStyles();

    return (
        <section className={classes.root} aria-label="Garantie en service">
            <Container className={classes.grid}>
                {guarantees.map(item => (
                    <div key={item.title} className={classes.item}>
                        <div className={classes.value}>{item.value}</div>
                        <Typography variant="h4" component="h3" className={classes.title}>
                            {item.title}
                        </Typography>
                        <Typography className={classes.text}>{item.text}</Typography>
                    </div>
                ))}
            </Container>
        </section>
    );
}
