import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, Link } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { NavLink } from 'react-router';
import { makeStyles } from 'tss-react/mui';

import { navy, onDarkNav, white } from 'src/colors';

export interface MenuItem {
    to: string;
    label: string;
}

interface IProps {
    items: MenuItem[];
}

const useStyles = makeStyles()(theme => ({
    toggle: {
        // Even hoog als de knoppen ernaast
        padding: 5,
        border: `1px solid ${alpha(white, 0.4)}`,
        color: white,
        '&:hover': {
            backgroundColor: alpha(white, 0.12),
        },
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    paper: {
        width: 'min(320px, 85vw)',
        padding: theme.spacing(1.5, 3, 4),
        backgroundColor: navy,
    },
    close: {
        alignSelf: 'flex-end',
        color: white,
    },
    list: {
        display: 'grid',
        marginTop: theme.spacing(1),
    },
    link: {
        padding: '14px 0',
        borderBottom: `1px solid ${alpha(white, 0.12)}`,
        fontWeight: 500,
        fontSize: 17,
        color: onDarkNav,
        '&:hover': {
            color: white,
        },
        '&[aria-current="page"]': {
            fontWeight: 600,
            color: white,
        },
    },
}));

export default function MobileMenu(props: IProps) {
    const { items } = props;

    const { classes } = useStyles();

    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);

    return (
        <>
            <IconButton
                className={classes.toggle}
                onClick={() => setOpen(true)}
                aria-label="Menu openen"
                aria-expanded={open}
            >
                <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={close} classes={{ paper: classes.paper }}>
                <IconButton className={classes.close} onClick={close} aria-label="Menu sluiten">
                    <CloseIcon />
                </IconButton>
                <nav aria-label="Menu" className={classes.list}>
                    {items.map(item => (
                        <Link
                            key={item.to}
                            component={NavLink}
                            to={item.to}
                            end
                            onClick={close}
                            className={classes.link}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </Drawer>
        </>
    );
}
