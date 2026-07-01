import { Depanneur, DepId, EarnPeriod, HistoryEntry, PanneKey, ProRequest, Vehicle } from './types';

export const TARIF_BASE = 39;
export const TARIF_KM = 2.5;
export const MIN_BASE = 30;
export const COMMISSION_RATE = 0.15;
export const TOW_KM = 8.4;
export const KRIK_ASSIST_PHONE = '+33 1 86 65 00 00';
export const DEP_PHONE = '+33 6 51 24 87 03';

export const PANNE_LABELS: Record<PanneKey, string> = {
  accident: 'Accident',
  pneu: 'Pneu crevé',
  essence: "Panne d'essence",
  batterie: 'Batterie à plat',
  cles: 'Clés enfermées',
  autre: 'Autre problème',
};

export const DEPANNEURS: Record<DepId, Depanneur> = {
  express: {
    id: 'express',
    name: "Dépann'Express",
    rating: '4,9',
    dist: '1,2 km',
    eta: '12 min',
    price: `${TARIF_BASE} €`,
    km: TARIF_KM,
    sub: 'Renault Master',
    recommended: true,
  },
  allo: {
    id: 'allo',
    name: 'Allo Remorquage',
    rating: '4,7',
    dist: '2,0 km',
    eta: '18 min',
    price: '45 €',
    km: 2.8,
    sub: 'Iveco Daily',
  },
  sos: {
    id: 'sos',
    name: 'SOS Auto 75',
    rating: '4,6',
    dist: '2,8 km',
    eta: '24 min',
    price: '42 €',
    km: TARIF_KM,
    sub: 'Fiat Ducato',
  },
};

export const HISTORY: HistoryEntry[] = [
  { id: '1', title: 'Batterie à plat', date: '12 juin 2026', provider: "Dépann'Express", rating: '4,9', duration: '34 min', price: '39 €' },
  { id: '2', title: 'Pneu crevé', date: '28 avril 2026', provider: 'SOS Auto 75', rating: '4,6', duration: '41 min', price: '52 €' },
];

export const DEFAULT_CHAT = [
  { from: 'me' as const, text: 'Bonjour, ma voiture ne démarre plus du tout.' },
  { from: 'them' as const, text: 'Pas de souci, je suis en route. Arrivée dans 12 min.' },
  { from: 'them' as const, text: 'Restez près du véhicule s’il vous plaît.' },
];

export const PRO_DEFAULT_CHAT = [
  { from: 'them' as const, text: 'Bonjour, je suis en panne devant le 24 Champs-Élysées.' },
  { from: 'me' as const, text: 'Bien reçu, j’arrive dans 10 minutes.' },
  { from: 'them' as const, text: 'Parfait, merci ! La voiture est grise.' },
];

// ---------- Côté Pro ----------

export const PRO_DOCS: [string, string][] = [
  ['kbis', 'Extrait KBIS'],
  ['assur', 'Assurance RC professionnelle'],
  ['agrement', 'Agrément préfectoral'],
  ['permis', 'Permis de conduire'],
  ['cg', 'Carte grise du véhicule'],
];

export const PRO_REQUESTS: ProRequest[] = [
  {
    id: '1',
    client: 'Rayan B.',
    panne: 'Batterie à plat',
    dist: '1,2 km',
    price: '39 €',
    vehicle: 'Peugeot 208 · GH-742-KR',
    addr: '24 Avenue des Champs-Élysées, 75008 Paris',
  },
  {
    id: '2',
    client: 'Léa M.',
    panne: 'Pneu crevé',
    dist: '2,4 km',
    price: '52 €',
    vehicle: 'Citroën C3 · AB-210-CD',
    addr: '18 Rue de Rivoli, 75004 Paris',
  },
];

export const INITIAL_FLEET: Vehicle[] = [
  { id: 1, modele: 'Renault Master', plaque: 'GH-742-KR', type: 'Plateau de dépannage' },
  { id: 2, modele: 'Iveco Daily', plaque: 'BK-318-PL', type: 'Camion-grue' },
];

export interface EarnData {
  ca: number;
  label: string;
  inter: string;
  avg: string;
  hours: string;
  note: string;
  bars: [string, number][];
}

export const EARNINGS: Record<EarnPeriod, EarnData> = {
  jour: {
    ca: 184,
    label: "Aujourd'hui",
    inter: '3',
    avg: '61 €',
    hours: '5h20',
    note: '4,9',
    bars: [['9h', 40], ['11h', 70], ['13h', 55], ['15h', 90], ['17h', 60], ['19h', 75]],
  },
  semaine: {
    ca: 1248,
    label: 'Cette semaine',
    inter: '28',
    avg: '45 €',
    hours: '34h',
    note: '4,8',
    bars: [['Lun', 55], ['Mar', 80], ['Mer', 45], ['Jeu', 95], ['Ven', 70], ['Sam', 100], ['Dim', 40]],
  },
  mois: {
    ca: 5320,
    label: 'Ce mois-ci',
    inter: '124',
    avg: '43 €',
    hours: '146h',
    note: '4,8',
    bars: [['S1', 60], ['S2', 85], ['S3', 70], ['S4', 100]],
  },
};
