export type PanneKey = 'accident' | 'pneu' | 'essence' | 'batterie' | 'cles' | 'autre';
export type FuelType = 'SP95' | 'SP98' | 'Diesel' | 'E85';
export type BatteryState = 'boost' | 'replace';
export type SpareWheel = 'oui' | 'non';
export type DepId = 'express' | 'allo' | 'sos';

export interface Depanneur {
  id: DepId;
  name: string;
  rating: string;
  dist: string;
  eta: string;
  price: string;
  km: number;
  sub: string;
  recommended?: boolean;
}

export interface ChatMessage {
  from: 'me' | 'them';
  text: string;
}

export interface HistoryEntry {
  id: string;
  title: string;
  date: string;
  provider: string;
  rating: string;
  duration: string;
  price: string;
}

export type Role = 'client' | 'pro';
export type ProStatus = 'none' | 'pending' | 'active';
export type EarnPeriod = 'jour' | 'semaine' | 'mois';

export interface Vehicle {
  id: number;
  modele: string;
  plaque: string;
  type: string;
}

export interface ProRequest {
  id: string;
  client: string;
  panne: string;
  dist: string;
  price: string;
  vehicle: string;
  addr: string;
}

export type ApplicationStatus = 'pending' | 'approved' | 'refused';

export interface AdminDoc {
  label: string;
  received: boolean;
}

export interface AdminApplication {
  id: string;
  societe: string;
  siret: string;
  responsable: string;
  tel: string;
  email: string;
  vehicles: { modele: string; plaque: string; type: string }[];
  docs: AdminDoc[];
  submitted: string;
  status: ApplicationStatus;
  refuseReason?: string;
}

export type DisputeStatus = 'open' | 'refunded' | 'reassigned' | 'closed';

export interface Dispute {
  id: string;
  from: 'client' | 'pro';
  party: string;
  counterparty: string;
  motif: string;
  intervention: string;
  amount: string;
  submitted: string;
  status: DisputeStatus;
}

