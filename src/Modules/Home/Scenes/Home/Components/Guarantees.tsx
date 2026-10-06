import { Container, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { blue, borderSoft, greenDark, navy, slate, white } from 'src/colors';
import { serifFontFamily } from 'src/Theme/typography';

const guarantees = [
    {
        value: '2 jaar',
        color: blue,
        title: 'All-in garantie',
        text: 'De eerste twee jaar alles inbegrepen, zonder onderhoud te hoeven plegen.',
    },
    {
        value: '+ 8 jaar',
        color: greenDark,
        title: 'Op alle onderdelen',
        text: 'Samen 10 jaar garantie — en dat zonder onderhoudscontract.',
    },
    {
        value: 'Elke 2 mnd',
        color: navy,
        title: 'E-mailservice zoutvat',
        text: 'Wij herinneren u eraan uw zoutvat na te kijken. Een zak van 25 kg kost € 15,- incl. btw.',
    },
];

const useStyles = makeStyles()(theme => ({
    root: {
        backgroundColor: white,
        borderTop: `1px solid ${borderSoft}`,
        borderBottom: `1px solid ${borderSoft}`,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    },
    item: {
        padding: 'clamp(28px, 3.4vw, 44px) 28px',
        borderLeft: `1px solid ${borderSoft}`,
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
            borderTop: `1px solid ${borderSoft}`,
            '&:first-of-type': {
                borderTop: 0,
            },
        },
    },
    value: {
        fontFamily: serifFontFamily,
        fontWeight: 300,
        fontSize: 34,
        lineHeight: 1,
    },
    title: {
        marginTop: 14,
        fontSize: 16.5,
        color: navy,
    },
    text: {
        marginTop: 8,
        fontSize: 15.5,
        lineHeight: 1.6,
        color: slate,
    },
}));

export default function Guarantees() {
    const { classes } = useStyles();

    return (
        <section className={classes.root} aria-label="Garantie en service">
            <Container className={classes.grid}>
                {guarantees.map(item => (
                    <div key={item.title} className={classes.item}>
                        <div className={classes.value} style={{ color: item.color }}>
                            {item.value}
                        </div>
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
