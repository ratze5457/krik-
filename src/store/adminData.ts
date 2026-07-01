import { AdminApplication, Dispute } from './types';

const ALL_DOCS = (missing: string[] = []) =>
  ['Extrait KBIS', 'Assurance RC professionnelle', 'Agrément préfectoral', 'Permis de conduire', 'Carte grise du véhicule'].map(
    (label) => ({ label, received: !missing.includes(label) })
  );

export const ADMIN_APPLICATIONS: AdminApplication[] = [
  {
    id: 'a1',
    societe: "Dépann'Express SARL",
    siret: '123 456 789 00012',
    responsable: 'Marc Dubois',
    tel: '+33 6 51 24 87 03',
    email: 'contact@depann-express.fr',
    vehicles: [{ modele: 'Renault Master', plaque: 'GH-742-KR', type: 'Plateau de dépannage' }],
    docs: ALL_DOCS(),
    submitted: 'Il y a 2 h',
    status: 'pending',
  },
  {
    id: 'a2',
    societe: "Assist'Route 93",
    siret: '852 147 963 00021',
    responsable: 'Karim Haddad',
    tel: '+33 6 74 12 55 80',
    email: 'contact@assistroute93.fr',
    vehicles: [
      { modele: 'Iveco Daily', plaque: 'BK-318-PL', type: 'Camion-grue' },
      { modele: 'Renault Trafic', plaque: 'DR-905-TX', type: 'Fourgon atelier' },
    ],
    docs: ALL_DOCS(),
    submitted: 'Il y a 1 jour',
    status: 'pending',
  },
  {
    id: 'a3',
    societe: 'Speedy Dépannage',
    siret: '640 273 118 00009',
    responsable: 'Julie Moreau',
    tel: '+33 6 09 88 42 17',
    email: 'julie@speedy-depannage.fr',
    vehicles: [{ modele: 'Peugeot Boxer', plaque: 'FA-221-QM', type: 'Plateau de dépannage' }],
    docs: ALL_DOCS(['Agrément préfectoral']),
    submitted: 'Il y a 3 jours',
    status: 'pending',
  },
];

export const ADMIN_DISPUTES: Dispute[] = [
  {
    id: 'd1',
    from: 'client',
    party: 'Rayan B.',
    counterparty: "Dépann'Express",
    motif: 'Le dépanneur ne répond pas',
    intervention: 'Batterie à plat',
    amount: '39 €',
    submitted: 'Il y a 25 min',
    status: 'open',
  },
  {
    id: 'd2',
    from: 'pro',
    party: 'SOS Auto 75',
    counterparty: 'Léa M.',
    motif: 'Le client est introuvable sur place',
    intervention: 'Pneu crevé',
    amount: '52 €',
    submitted: 'Il y a 1 h',
    status: 'open',
  },
  {
    id: 'd3',
    from: 'client',
    party: 'Thomas P.',
    counterparty: 'Allo Remorquage',
    motif: 'Plus de réseau, appel impossible',
    intervention: 'Panne d’essence',
    amount: '45 €',
    submitted: 'Hier',
    status: 'open',
  },
];

export const ADMIN_OVERVIEW = {
  activePros: 42,
  pending: ADMIN_APPLICATIONS.filter((a) => a.status === 'pending').length,
  ongoing: 7,
  avgNote: '4,8',
  openDisputes: ADMIN_DISPUTES.filter((d) => d.status === 'open').length,
};

export type FinancePeriod = 'semaine' | 'mois' | 'annee';

export interface FinancePeriodData {
  label: string;
  ca: number;
  interventions: string;
  prosPaid: string;
  avgCommission: string;
  bars: [string, number][];
}

export const ADMIN_FINANCE_PERIODS: Record<FinancePeriod, FinancePeriodData> = {
  semaine: {
    label: 'Cette semaine',
    ca: 18420,
    interventions: '412',
    prosPaid: '38',
    avgCommission: '6,70 €',
    bars: [['Lun', 2100], ['Mar', 2600], ['Mer', 2300], ['Jeu', 3100], ['Ven', 2800], ['Sam', 3500], ['Dim', 2020]],
  },
  mois: {
    label: 'Ce mois-ci',
    ca: 74800,
    interventions: '1 684',
    prosPaid: '41',
    avgCommission: '6,66 €',
    bars: [['S1', 16200], ['S2', 19800], ['S3', 17400], ['S4', 21400]],
  },
  annee: {
    label: 'Cette année',
    ca: 892000,
    interventions: '19 740',
    prosPaid: '47',
    avgCommission: '6,78 €',
    bars: [
      ['J', 58000], ['F', 61000], ['M', 68000], ['A', 72000], ['M', 79000], ['J', 84000],
      ['J', 88000], ['A', 82000], ['S', 76000], ['O', 74000], ['N', 78000], ['D', 72000],
    ],
  },
};

export const ADMIN_FINANCE = {
  payoutDate: 'Lundi 6 juil.',
  commissionRate: 0.15,
  pendingPayouts: [
    { name: "Dépann'Express", iban: '•••• 0143', amount: '1 061 €' },
    { name: "Assist'Route 93", iban: '•••• 8820', amount: '842 €' },
    { name: 'SOS Auto 75', iban: '•••• 4471', amount: 'absente' },
  ],
};

export const eurAdmin = (n: number) => n.toLocaleString('fr-FR') + ' €';
