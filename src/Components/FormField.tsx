import { FilledInput, FormControl, FormHelperText, FormLabel, Typography } from '@mui/material';
import type { ChangeEvent } from 'react';
import { makeStyles } from 'tss-react/mui';

import { muted } from 'src/colors';

interface IProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    autoComplete?: string;
    placeholder?: string;
    required?: boolean;
    multiline?: boolean;
    minRows?: number;
    maxLength?: number;
    error?: string | null;
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
    helper: {
        marginLeft: 0,
        marginRight: 0,
    },
});

export default function FormField(props: IProps) {
    const {
        id,
        name,
        label,
        value,
        onChange,
        type = 'text',
        autoComplete = 'off',
        placeholder,
        required = false,
        multiline = false,
        minRows = 3,
        maxLength,
        error,
        className,
    } = props;

    const { classes } = useStyles();

    const errorId = `${id}-error`;

    return (
        <FormControl required={required} error={Boolean(error)} className={className}>
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
                minRows={multiline ? minRows : undefined}
                inputProps={{ maxLength, 'aria-describedby': error ? errorId : undefined }}
            />
            {error && (
                <FormHelperText id={errorId} className={classes.helper}>
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    );
}
