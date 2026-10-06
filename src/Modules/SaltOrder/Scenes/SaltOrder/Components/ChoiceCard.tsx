import type { ChangeEvent, ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

import { blue, border, greenDark, greenTint, muted, navy, slate, white } from 'src/colors';
import { cardRadius } from 'src/Theme/sizes';

interface IProps {
    name: string;
    value: string;
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    title: string;
    description: string;
    icon?: ReactNode;
}

const useStyles = makeStyles()({
    root: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
        height: '100%',
        padding: '18px 18px 18px 16px',
        backgroundColor: white,
        border: `1px solid ${border}`,
        borderRadius: cardRadius,
        cursor: 'pointer',
        transition: 'border-color .15s ease, background-color .15s ease, box-shadow .15s ease',
        '&:hover': {
            borderColor: muted,
        },
    },
    checked: {
        backgroundColor: greenTint,
        borderColor: greenDark,
        boxShadow: `inset 0 0 0 1px ${greenDark}`,
        '&:hover': {
            borderColor: greenDark,
        },
    },
    // Native radio, zelf gestyled: blijft bedienbaar met pijltjestoetsen en spatie
    radio: {
        appearance: 'none',
        flexShrink: 0,
        width: 22,
        height: 22,
        margin: '1px 0 0',
        borderRadius: '50%',
        border: `2px solid ${muted}`,
        backgroundColor: white,
        cursor: 'pointer',
        transition: 'box-shadow .15s ease, background-color .15s ease',
        '&:checked': {
            borderColor: greenDark,
            backgroundColor: greenDark,
            boxShadow: `inset 0 0 0 4px ${white}`,
        },
        '&:focus-visible': {
            outline: `2px solid ${blue}`,
            outlineOffset: 3,
        },
    },
    text: {
        flex: 1,
        minWidth: 0,
    },
    title: {
        display: 'block',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 1.35,
        color: navy,
    },
    description: {
        display: 'block',
        marginTop: 4,
        fontSize: 14.5,
        lineHeight: 1.5,
        color: slate,
    },
    icon: {
        display: 'flex',
        color: greenDark,
        '& svg': {
            fontSize: 26,
        },
    },
});

export default function ChoiceCard(props: IProps) {
    const { name, value, checked, onChange, title, description, icon } = props;

    const { classes, cx } = useStyles();

    return (
        <label className={cx(classes.root, checked && classes.checked)}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={classes.radio}
                required
            />
            <span className={classes.text}>
                <span className={classes.title}>{title}</span>
                <span className={classes.description}>{description}</span>
            </span>
            {icon && (
                <span className={classes.icon} aria-hidden="true">
                    {icon}
                </span>
            )}
        </label>
    );
}
