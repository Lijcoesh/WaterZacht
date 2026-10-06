import { Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import { background, border, greenDark, muted, navy, slate, white } from 'src/colors';
import SectionHeading from 'src/Components/SectionHeading';
import { systems } from 'src/Config/systems';
import { cardRadius, sectionSpacing } from 'src/Theme/sizes';

const useStyles = makeStyles()({
    root: {
        paddingTop: sectionSpacing,
        paddingBottom: sectionSpacing,
        backgroundColor: background,
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    lead: {
        maxWidth: 400,
        fontSize: '1rem',
        lineHeight: 1.6,
        color: slate,
    },
    cards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 16,
        margin: '34px 0 0',
        padding: 0,
        listStyle: 'none',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(22px, 2.4vw, 30px)',
        backgroundColor: white,
        border: `1px solid ${border}`,
        borderRadius: cardRadius,
    },
    highlight: {
        borderColor: greenDark,
        boxShadow: `inset 0 3px 0 ${greenDark}`,
    },
    tag: {
        color: muted,
    },
    tagHighlight: {
        color: greenDark,
    },
    title: {
        marginTop: 10,
        color: navy,
    },
    text: {
        marginTop: 8,
        flex: 1,
        fontSize: 15.5,
        lineHeight: 1.6,
        color: slate,
    },
    suitable: {
        marginTop: 18,
        paddingTop: 14,
        borderTop: `1px solid ${border}`,
        fontSize: 14.5,
        color: muted,
        '& strong': {
            fontWeight: 600,
            color: navy,
        },
    },
    footer: {
        marginTop: 30,
    },
});

export default function SystemsOverview() {
    const { classes, cx } = useStyles();

    return (
        <section id="systemen" className={classes.root} aria-labelledby="systemen-title">
            <Container>
                <div className={classes.header}>
                    <div>
                        <SectionHeading
                            id="systemen-title"
                            eyebrow="05 · Onze systemen"
                            title="Simplex, duplex of external"
                        />
                    </div>
                    <Typography className={classes.lead}>
                        Welk systeem past hangt af van de gewenste capaciteit en de ruimte in uw
                        meterkast.
                    </Typography>
                </div>
                <ul className={classes.cards}>
                    {systems.map(system => (
                        <li
                            key={system.key}
                            className={cx(classes.card, system.highlight && classes.highlight)}
                        >
                            <Typography
                                variant="caption"
                                className={cx(
                                    classes.tag,
                                    system.highlight && classes.tagHighlight,
                                )}
                            >
                                {system.tag}
                            </Typography>
                            <Typography variant="h3" className={classes.title}>
                                {system.title}
                            </Typography>
                            <Typography className={classes.text}>{system.text}</Typography>
                            <Typography className={classes.suitable}>
                                Geschikt voor: <strong>{system.specs.suitable}</strong>
                            </Typography>
                        </li>
                    ))}
                </ul>
                <div className={classes.footer}>
                    <Button
                        component={RouterLink}
                        to="/systemen"
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Vergelijk de systemen
                    </Button>
                </div>
            </Container>
        </section>
    );
}
