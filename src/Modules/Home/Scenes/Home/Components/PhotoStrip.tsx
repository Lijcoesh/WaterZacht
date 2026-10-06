import { Container } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { border, muted, placeholderBackground } from 'src/colors';

import Photo from './Photo';

export interface PhotoStripItem {
    src?: string;
    alt: string;
    placeholder?: string;
    caption: string;
}

interface IProps {
    items: PhotoStripItem[];
    minColumnWidth: number;
    className?: string;
}

const useStyles = makeStyles<{ minColumnWidth: number }>()((_theme, { minColumnWidth }) => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))`,
        gap: 24,
    },
    figure: {
        margin: 0,
    },
    frame: {
        position: 'relative',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        backgroundColor: placeholderBackground,
    },
    caption: {
        marginTop: 12,
        paddingTop: 10,
        borderTop: `1px solid ${border}`,
        fontSize: 14,
        lineHeight: 1.5,
        color: muted,
    },
}));

export default function PhotoStrip(props: IProps) {
    const { items, minColumnWidth, className } = props;

    const { classes } = useStyles({ minColumnWidth });

    return (
        <section className={className}>
            <Container className={classes.grid}>
                {items.map(item => (
                    <figure key={item.caption} className={classes.figure}>
                        <div className={classes.frame}>
                            <Photo src={item.src} alt={item.alt} placeholder={item.placeholder} />
                        </div>
                        <figcaption className={classes.caption}>{item.caption}</figcaption>
                    </figure>
                ))}
            </Container>
        </section>
    );
}
