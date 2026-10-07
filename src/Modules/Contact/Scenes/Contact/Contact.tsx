import { Container, Link, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { background, border, borderSoft, greenHover, muted, navy, slate, white } from 'src/colors';
import SectionHeading from 'src/Components/SectionHeading';
import {
    email,
    emailHref,
    phoneDisplay,
    phoneHref,
    postalCodeCity,
    street,
} from 'src/Config/contact';
import { useDocumentTitle } from 'src/Hooks/useDocumentTitle';
import { cardRadius, sectionSpacing } from 'src/Theme/sizes';
import { serifFontFamily } from 'src/Theme/typography';

import QuoteForm from './Components/QuoteForm';

const useStyles = makeStyles()({
    root: {
        flex: 1,
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
        backgroundColor: background,
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(28px, 4vw, 72px)',
    },
    info: {
        flex: '1 1 360px',
    },
    lead: {
        marginTop: 18,
        maxWidth: '34em',
        lineHeight: 1.7,
        color: slate,
    },
    details: {
        display: 'grid',
        margin: '30px 0 0',
        borderTop: `1px solid ${border}`,
    },
    row: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 18,
        padding: '18px 0',
        borderBottom: `1px solid ${border}`,
    },
    rowLabel: {
        flex: 'none',
        width: 90,
        color: muted,
    },
    rowValue: {
        margin: 0,
        fontFamily: serifFontFamily,
        fontSize: 22,
        lineHeight: 1.3,
        color: navy,
        overflowWrap: 'anywhere',
    },
    rowLink: {
        color: navy,
        '&:hover': {
            color: greenHover,
        },
    },
    formCard: {
        flex: '1 1 380px',
        backgroundColor: white,
        border: `1px solid ${borderSoft}`,
        borderRadius: cardRadius,
        padding: 'clamp(26px, 3vw, 40px)',
    },
});

export default function Contact() {
    const { classes } = useStyles();

    useDocumentTitle('Contact en offerte aanvragen');

    const rows = [
        {
            label: 'Telefoon',
            value: (
                <Link href={phoneHref} className={classes.rowLink}>
                    {phoneDisplay}
                </Link>
            ),
        },
        {
            label: 'E-mail',
            value: (
                <Link href={emailHref} className={classes.rowLink}>
                    {email}
                </Link>
            ),
        },
        { label: 'Adres', value: `${street}, ${postalCodeCity}` },
    ];

    return (
        <div className={classes.root}>
            <Container className={classes.layout}>
                <div className={classes.info}>
                    <SectionHeading id="contact-title" level="h1" title="Neem direct contact op" />
                    <Typography className={classes.lead}>
                        Ontvang een op maat gemaakte offerte, geheel naar uw wensen — met de eerste
                        2 jaar all-in garantie en daarna nog 8 jaar garantie op alle onderdelen.
                    </Typography>
                    <dl className={classes.details}>
                        {rows.map(row => (
                            <div key={row.label} className={classes.row}>
                                <Typography
                                    variant="caption"
                                    component="dt"
                                    className={classes.rowLabel}
                                >
                                    {row.label}
                                </Typography>
                                <dd className={classes.rowValue}>{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className={classes.formCard}>
                    <QuoteForm />
                </div>
            </Container>
        </div>
    );
}
