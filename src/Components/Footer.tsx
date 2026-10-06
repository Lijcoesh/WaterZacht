import { Container, Link, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import { navyDeep, onDarkFaint, onDarkLink, white } from 'src/colors';
import {
    companyName,
    email,
    emailHref,
    parentCompanyName,
    phoneDisplay,
    phoneHref,
    postalCodeCity,
    street,
} from 'src/Config/contact';
import logo from 'src/Resources/Images/logo.png';
import { footerLogoHeight } from 'src/Theme/sizes';

const productLinks = [
    { to: '/#systemen', label: 'Waterontharders' },
    { to: '/#drinkwater', label: 'Drinkwaterzuivering' },
    { to: '/#drinkwater', label: 'Ontijzering' },
    { to: '/#drinkwater', label: 'Drukverhoging' },
    { to: '/#drinkwater', label: 'Vloeistoffilters' },
];

const pageLinks = [
    { to: '/over-ons', label: 'Over ons' },
    { to: '/faq', label: 'Veelgestelde vragen' },
    { to: '/zout-bestellen', label: 'Zout bestellen' },
    { to: '/contact', label: 'Contact' },
];

const useStyles = makeStyles()(theme => ({
    root: {
        backgroundColor: navyDeep,
        color: onDarkLink,
        padding: 'clamp(44px, 5vw, 72px) 0 28px',
    },
    columns: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: 34,
    },
    logo: {
        display: 'block',
        height: footerLogoHeight,
        width: 'auto',
    },
    intro: {
        margin: '18px 0 0',
        maxWidth: '26em',
        fontSize: '0.9rem',
        color: onDarkFaint,
    },
    heading: {
        color: white,
    },
    list: {
        display: 'grid',
        gap: 11,
        marginTop: 18,
        fontSize: 15,
        lineHeight: 1.45,
    },
    address: {
        fontStyle: 'normal',
    },
    link: {
        color: onDarkLink,
        '&:hover': {
            color: white,
        },
    },
    bottom: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 14,
        justifyContent: 'space-between',
        marginTop: 34,
        paddingTop: 22,
        borderTop: `1px solid ${alpha(white, 0.12)}`,
        fontSize: 13,
        color: onDarkFaint,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
}));

export default function Footer() {
    const { classes, cx } = useStyles();

    return (
        <footer className={classes.root}>
            <Container>
                <div className={classes.columns}>
                    <div>
                        <img src={logo} alt={companyName} className={classes.logo} />
                        <Typography className={classes.intro}>
                            Waterontharders en waterzuivering voor het Westland en omgeving.
                            Onderdeel van {parentCompanyName}.
                        </Typography>
                    </div>
                    <nav aria-labelledby="footer-products">
                        <Typography
                            id="footer-products"
                            variant="caption"
                            component="h2"
                            className={classes.heading}
                        >
                            Onze producten
                        </Typography>
                        <div className={classes.list}>
                            {productLinks.map(item => (
                                <Link
                                    key={item.label}
                                    component={RouterLink}
                                    to={item.to}
                                    className={classes.link}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                    <nav aria-labelledby="footer-pages">
                        <Typography
                            id="footer-pages"
                            variant="caption"
                            component="h2"
                            className={classes.heading}
                        >
                            {companyName}
                        </Typography>
                        <div className={classes.list}>
                            {pageLinks.map(item => (
                                <Link
                                    key={item.to}
                                    component={RouterLink}
                                    to={item.to}
                                    className={classes.link}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                    <div>
                        <Typography variant="caption" component="h2" className={classes.heading}>
                            Contactgegevens
                        </Typography>
                        <address className={cx(classes.list, classes.address)}>
                            <Link href={phoneHref} className={classes.link}>
                                {phoneDisplay}
                            </Link>
                            <Link href={emailHref} className={classes.link}>
                                {email}
                            </Link>
                            <span>
                                {street}
                                <br />
                                {postalCodeCity}
                            </span>
                        </address>
                    </div>
                </div>
                <div className={classes.bottom}>
                    <span>© {companyName} — waterontharders &amp; waterzuivering</span>
                </div>
            </Container>
        </footer>
    );
}
