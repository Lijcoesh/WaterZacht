import { FilledInput, FormControl, FormLabel, Typography } from '@mui/material';
import type { ChangeEvent } from 'react';
import { makeStyles } from 'tss-react/mui';

import { muted } from 'src/colors';

interface IProps {
    name: string;
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    autoComplete?: string;
    placeholder?: string;
    required?: boolean;
    multiline?: boolean;
    className?: string;
}

const useStyles = makeStyles()({
    label: {
        marginBottom: 8,
        color: muted,
        '&.Mui-focused': {
            color: muted,
        },
        '& .MuiFormLabel-asterisk': {
            display: 'none',
        },
    },
});

export default function OrderField(props: IProps) {
    const {
        name,
        label,
        value,
        onChange,
        type = 'text',
        autoComplete = 'off',
        placeholder,
        required = false,
        multiline = false,
        className,
    } = props;

    const { classes } = useStyles();

    const id = `salt-${name}`;

    return (
        <FormControl required={required} className={className}>
            <FormLabel htmlFor={id} className={classes.label}>
                <Typography variant="caption">
                    {label}
                    {required ? ' *' : ' (optioneel)'}
                </Typography>
            </FormLabel>
            <FilledInput
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                placeholder={placeholder}
                multiline={multiline}
                minRows={multiline ? 3 : undefined}
            />
        </FormControl>
    );
}
