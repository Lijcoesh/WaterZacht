import { Container, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { makeStyles } from 'tss-react/mui';

import { blue, greenDark, navy, placeholderBackground, slate, white } from 'src/colors';
import Photo from 'src/Components/Photo';
import SectionHeading from 'src/Components/SectionHeading';
import { mediumShadow } from 'src/Theme/shadow';
import { sectionSpacing } from 'src/Theme/sizes';

const minPosition = 6;
const maxPosition = 94;
const keyboardStep = 4;

function clamp(value: number) {
    return Math.min(maxPosition, Math.max(minPosition, Math.round(value)));
}

const useStyles = makeStyles()({
    root: {
        paddingTop: sectionSpacing,
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
    stage: {
        position: 'relative',
        marginTop: 34,
        aspectRatio: '24 / 9',
        minHeight: 320,
        overflow: 'hidden',
        backgroundColor: placeholderBackground,
        touchAction: 'none',
        userSelect: 'none',
    },
    side: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    left: {
        left: 0,
    },
    right: {
        right: 0,
    },
    badge: {
        position: 'absolute',
        top: 20,
        padding: '8px 14px',
        fontWeight: 600,
        fontSize: 12.5,
        lineHeight: 1,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: white,
        pointerEvents: 'none',
    },
    badgeHard: {
        left: 22,
        backgroundColor: alpha(navy, 0.86),
    },
    badgeSoft: {
        right: 22,
        backgroundColor: greenDark,
    },
    handle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 40,
        marginLeft: -20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'ew-resize',
        outline: 'none',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: white,
        },
        '&:focus-visible > span': {
            outline: `3px solid ${blue}`,
            outlineOffset: 2,
        },
    },
    knob: {
        position: 'relative',
        width: 42,
        height: 42,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        fontWeight: 600,
        fontSize: 14,
        color: blue,
        boxShadow: mediumShadow,
    },
});

export default function Comparison() {
    const { classes, cx } = useStyles();

    const stageRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(52);

    const updateFromPointer = (event: PointerEvent<HTMLDivElement>) => {
        const stage = stageRef.current;
        if (!stage) return;

        const rect = stage.getBoundingClientRect();
        setPosition(clamp(((event.clientX - rect.left) / rect.width) * 100));
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateFromPointer(event);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            updateFromPointer(event);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const keys: Record<string, number> = {
            ArrowLeft: position - keyboardStep,
            ArrowDown: position - keyboardStep,
            ArrowRight: position + keyboardStep,
            ArrowUp: position + keyboardStep,
            Home: minPosition,
            End: maxPosition,
        };
        if (!(event.key in keys)) return;

        event.preventDefault();
        setPosition(clamp(keys[event.key]));
    };

    return (
        <section className={classes.root} aria-labelledby="verschil-title">
            <Container className={classes.header}>
                <div>
                    <SectionHeading
                        id="verschil-title"
                        eyebrow="03 · Zie het verschil"
                        title="Hard water tegenover zacht water"
                    />
                </div>
                <Typography className={classes.lead}>
                    Links een warmte-element uit een woning met hard water, rechts hetzelfde element
                    met zacht water. Sleep de schuif.
                </Typography>
            </Container>
            <div ref={stageRef} className={classes.stage}>
                <div
                    className={cx(classes.side, classes.right)}
                    style={{ width: `${100 - position}%` }}
                >
                    <Photo
                        alt="Schoon warmte-element bij zacht water"
                        placeholder="Foto nodig: schoon warmte-element (zacht water)"
                    />
                </div>
                <div className={cx(classes.side, classes.left)} style={{ width: `${position}%` }}>
                    <Photo
                        alt="Verkalkt warmte-element bij hard water"
                        placeholder="Foto nodig: verkalkt warmte-element (hard water)"
                    />
                </div>
                <span className={cx(classes.badge, classes.badgeHard)}>Hard water</span>
                <span className={cx(classes.badge, classes.badgeSoft)}>Zacht water</span>
                <div
                    role="slider"
                    tabIndex={0}
                    aria-label="Verdeling hard en zacht water"
                    aria-valuemin={minPosition}
                    aria-valuemax={maxPosition}
                    aria-valuenow={position}
                    aria-valuetext={`${position}% hard water zichtbaar`}
                    className={classes.handle}
                    style={{ left: `${position}%` }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onKeyDown={handleKeyDown}
                >
                    <span className={classes.knob} aria-hidden="true">
                        ‹ ›
                    </span>
                </div>
            </div>
        </section>
    );
}
