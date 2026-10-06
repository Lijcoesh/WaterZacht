import { AppBar, Button, Container, Link } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import { greenLight, navy, onDarkMuted, onDarkNav, white } from 'src/colors';
import { companyName, phoneDisplay, phoneHref } from 'src/Config/contact';
import droplet from 'src/Resources/Images/droplet.png';
import { headerLogoHeight } from 'src/Theme/sizes';
import { serifFontFamily } from 'src/Theme/typography';

const navItems = [
    { to: '/#voordelen', label: 'Voordelen' },
    { to: '/#werking', label: 'Werking' },
    { to: '/#systemen', label: 'Systemen' },
];

const useStyles = makeStyles()(theme => ({
    skipLink: {
        position: 'absolute',
        left: theme.spacing(2),
        top: theme.spacing(-8),
        zIndex: theme.zIndex.tooltip,
        padding: theme.spacing(1.5, 2),
        backgroundColor: white,
        color: navy,
        fontWeight: 600,
        '&:focus': {
            top: theme.spacing(2),
        },
    },
    appBar: {
        backgroundColor: alpha(navy, 0.96),
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${alpha(white, 0.12)}`,
    },
    bar: {
        display: 'flex',
        alignItems: 'center',
        gap: 30,
        paddingTop: 14,
        paddingBottom: 14,
        [theme.breakpoints.down('sm')]: {
            gap: theme.spacing(2),
        },
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginRight: 'auto',
    },
    droplet: {
        display: 'block',
        height: headerLogoHeight,
        width: 'auto',
    },
    brandName: {
        display: 'block',
        fontFamily: serifFontFamily,
        fontWeight: 500,
        fontSize: 21,
        lineHeight: 1,
        letterSpacing: '0.01em',
        color: white,
    },
    brandTagline: {
        display: 'block',
        marginTop: 5,
        fontWeight: 500,
        fontSize: 9,
        lineHeight: 1,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: onDarkMuted,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        fontWeight: 500,
        fontSize: 14,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    navLink: {
        color: onDarkNav,
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
    },
    outlined: {
        // 1px minder padding dan de contained-knop, zodat de rand de hoogte niet vergroot
        padding: '10px 17px',
        borderColor: alpha(white, 0.4),
        color: white,
        '&:hover': {
            borderColor: alpha(white, 0.4),
            backgroundColor: alpha(white, 0.12),
        },
    },
    phone: {
        fontWeight: 600,
        fontSize: 15,
        color: white,
        '&:hover': {
            color: greenLight,
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));

export default function Header() {
    const { classes } = useStyles();

    return (
        <>
            <Link href="#main" className={classes.skipLink}>
                Naar de inhoud
            </Link>
            <AppBar position="sticky" elevation={0} className={classes.appBar}>
                <Container className={classes.bar}>
                    <Link
                        component={RouterLink}
                        to="/#top"
                        className={classes.brand}
                        aria-label={`${companyName}, naar boven`}
                    >
                        <img src={droplet} alt="" className={classes.droplet} />
                        <span>
                            <span className={classes.brandName}>{companyName}</span>
                            <span className={classes.brandTagline}>
                                Waterontharders &amp; waterzuivering
                            </span>
                        </span>
                    </Link>
                    <nav aria-label="Hoofdmenu" className={classes.nav}>
                        {navItems.map(item => (
                            <Link
                                key={item.to}
                                component={RouterLink}
                                to={item.to}
                                className={classes.navLink}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className={classes.actions}>
                        <Link href={phoneHref} className={classes.phone}>
                            {phoneDisplay}
                        </Link>
                        <Button
                            component={RouterLink}
                            to="/faq"
                            variant="outlined"
                            className={classes.outlined}
                        >
                            FAQ
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/contact"
                            variant="contained"
                            color="primary"
                        >
                            Contact
                        </Button>
                    </div>
                </Container>
            </AppBar>
        </>
    );
}
