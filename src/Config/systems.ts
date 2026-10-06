// De drie Kinetico-systemen. Gedeeld door het overzicht op de homepage en de
// vergelijkingspagina /systemen.

export type SystemKey = 'simplex' | 'duplex' | 'external';

export const systems: {
    key: SystemKey;
    tag: string;
    highlight?: boolean;
    title: string;
    text: string;
    specs: { tanks: string; rinsing: string; placement: string; suitable: string };
}[] = [
    {
        key: 'simplex',
        tag: 'Voordeligst',
        title: 'Simplex systeem',
        text: 'Eén harstank: het meest compact en hiermee bent u het goedkoopste uit.',
        specs: {
            tanks: 'Eén harstank',
            rinsing: 'Kort in bypass',
            placement: 'Meterkast of trapkast',
            suitable: '1–4 personen',
        },
    },
    {
        key: 'duplex',
        tag: 'Altijd zacht water',
        highlight: true,
        title: 'Duplex systeem',
        text: 'Dubbele tank met alternerende spoeling, waardoor u altijd van zacht water geniet.',
        specs: {
            tanks: 'Dubbele harstank',
            rinsing: 'Altijd zacht water',
            placement: 'Meterkast of trapkast',
            suitable: 'Elk huishouden',
        },
    },
    {
        key: 'external',
        tag: 'Flexibel te plaatsen',
        title: 'External systeem',
        text: 'Harstanken en zoutvat los van elkaar te monteren, bijvoorbeeld onder de vloer.',
        specs: {
            tanks: 'Losse harstanken',
            rinsing: 'Afhankelijk van uitvoering',
            placement: 'Tanks onder de vloer, zoutvat tot 5 m',
            suitable: 'Krappe ruimtes',
        },
    },
];

export const specLabels = [
    { key: 'tanks', label: 'Harstanken' },
    { key: 'rinsing', label: 'Tijdens spoeling' },
    { key: 'placement', label: 'Plaatsing' },
    { key: 'suitable', label: 'Geschikt voor' },
] as const;
