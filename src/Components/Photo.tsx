import { makeStyles } from 'tss-react/mui';

import { borderInput, muted, placeholderBackground } from 'src/colors';

interface IProps {
    // Zonder src toont de component een gemarkeerd vak: die foto moet nog aangeleverd worden.
    src?: string;
    alt: string;
    placeholder?: string;
    fit?: 'cover' | 'contain';
    className?: string;
}

const useStyles = makeStyles()(theme => ({
    image: {
        position: 'absolute',
        inset: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    contain: {
        objectFit: 'contain',
    },
    placeholder: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        border: `1px dashed ${borderInput}`,
        backgroundColor: placeholderBackground,
        color: muted,
        fontSize: 13,
        textAlign: 'center',
    },
}));

export default function Photo(props: IProps) {
    const { src, alt, placeholder, fit = 'cover', className } = props;

    const { classes, cx } = useStyles();

    if (!src) {
        return (
            <span className={cx(classes.placeholder, className)} role="img" aria-label={alt}>
                {placeholder ?? alt}
            </span>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className={cx(classes.image, fit === 'contain' && classes.contain, className)}
        />
    );
}
