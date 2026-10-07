import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import type { ChangeEvent } from 'react';
import { makeStyles } from 'tss-react/mui';

import { blue, border, borderInput, greenDark, greenTint, muted, navy, white } from 'src/colors';
import type { BagSize } from 'src/Modules/SaltOrder/Definitions/SaltOrder';
import { cardRadius } from 'src/Theme/sizes';

interface IProps {
    size: BagSize;
    value: number;
    // Onder dit aantal gaat de teller naar 0
    min?: number;
    max: number;
    onChange: (value: number) => void;
}

const useStyles = makeStyles()({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '12px 12px 12px 18px',
        backgroundColor: white,
        border: `1px solid ${border}`,
        borderRadius: cardRadius,
        transition: 'border-color .15s ease, background-color .15s ease',
    },
    active: {
        backgroundColor: greenTint,
        borderColor: greenDark,
    },
    label: {
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 1.35,
        color: navy,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
    },
    button: {
        width: 38,
        height: 38,
        border: `1px solid ${muted}`,
        backgroundColor: white,
        color: navy,
        '&:hover': {
            backgroundColor: white,
            borderColor: navy,
        },
        '&.Mui-disabled': {
            borderColor: borderInput,
        },
    },
    input: {
        width: 52,
        height: 38,
        padding: 0,
        border: 0,
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontFamily: 'inherit',
        fontWeight: 600,
        fontSize: 18,
        color: navy,
        MozAppearance: 'textfield',
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
        },
        '&:focus-visible': {
            outline: `2px solid ${blue}`,
            outlineOffset: 2,
            borderRadius: 2,
        },
    },
});

export default function BagCounter(props: IProps) {
    const { size, value, min = 0, max, onChange } = props;

    const { classes, cx } = useStyles();

    const set = (next: number) => onChange(Math.min(max, Math.max(0, next)));

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const parsed = parseInt(event.target.value, 10);
        set(Number.isNaN(parsed) ? 0 : parsed);
    };

    // Tijdens het typen mag het getal onder het minimum zitten ("1" op weg naar "10")
    const handleBlur = () => {
        if (value > 0 && value < min) onChange(min);
    };

    return (
        <div className={cx(classes.root, value > 0 && classes.active)}>
            <span className={classes.label}>Zakken van {size} kg</span>
            <div className={classes.controls}>
                <IconButton
                    className={classes.button}
                    onClick={() => set(value <= min ? 0 : value - 1)}
                    disabled={value <= 0}
                    aria-label={`Eén zak van ${size} kg minder`}
                >
                    <RemoveIcon fontSize="small" />
                </IconButton>
                <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={max}
                    value={value}
                    onChange={handleInput}
                    onBlur={handleBlur}
                    onFocus={event => event.target.select()}
                    className={classes.input}
                    aria-label={`Aantal zakken van ${size} kg`}
                />
                <IconButton
                    className={classes.button}
                    onClick={() => set(value < min ? min : value + 1)}
                    disabled={value >= max}
                    aria-label={`Eén zak van ${size} kg meer`}
                >
                    <AddIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
    );
}
