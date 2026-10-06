import { Container, Link, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { background, border, borderSoft, greenHover, muted, navy, slate, white } from 'src/colors';
import SectionHeading from 'src/Components/SectionHeading';
import { phoneDisplay, phoneHref, postalCodeCity, street } from 'src/Config/contact';
import { useDocumentTitle } from 'src/Hooks/useDocumentTitle';
import { cardRadius, sectionSpacing } from 'src/Theme/sizes';

import SaltOrderForm from './Components/SaltOrderForm';

const useStyles = makeStyles()(theme => ({
    root: {
        flex: 1,
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
        backgroundColor: background,
    },
    layout: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 'clamp(28px, 4vw, 72px)',
    },
    info: {
        flex: '1 1 320px',
        [theme.breakpoints.up('md')]: {
            position: 'sticky',
            top: 120,
        },
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
        padding: '16px 0',
        borderBottom: `1px solid ${border}`,
    },
    rowLabel: {
        flex: 'none',
        width: 90,
        color: muted,
    },
    rowValue: {
        margin: 0,
        lineHeight: 1.5,
        color: navy,
    },
    rowLink: {
        fontWeight: 600,
        color: navy,
        '&:hover': {
            color: greenHover,
        },
    },
    formCard: {
        flex: '1.5 1 460px',
        minWidth: 0,
        backgroundColor: white,
        border: `1px solid ${borderSoft}`,
        borderRadius: cardRadius,
        padding: 'clamp(22px, 3vw, 40px)',
    },
}));

export default function SaltOrder() {
    const { classes } = useStyles();

    useDocumentTitle('Zout bestellen');

    const rows = [
        { label: 'Bezorgen', value: '6 zakken van 15 kg of 4 zakken van 25 kg' },
        { label: 'Afhalen', value: `Aantal naar keuze, ${street} in ${postalCodeCity}` },
        { label: 'Betalen', value: 'Achteraf, op rekening' },
        {
            label: 'Vragen',
            value: (
                <Link href={phoneHref} className={classes.rowLink}>
                    {phoneDisplay}
                </Link>
            ),
        },
    ];

    return (
        <div className={classes.root}>
            <Container className={classes.layout}>
                <div className={classes.info}>
                    <SectionHeading
                        id="salt-title"
                        eyebrow="Zout bestellen"
                        level="h1"
                        title="Zout voor uw waterontharder"
                    />
                    <Typography className={classes.lead}>
                        Bestel eenvoudig nieuwe zakken zout. Kies of u het zout laat bezorgen of
                        zelf afhaalt, vul uw gegevens in en wij zorgen voor de rest. U betaalt
                        achteraf.
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
                    <SaltOrderForm />
                </div>
            </Container>
        </div>
    );
}
