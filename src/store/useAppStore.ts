import { create } from 'zustand';
import {
  AdminApplication,
  BatteryState,
  ChatMessage,
  Depanneur,
  Dispute,
  DisputeStatus,
  EarnPeriod,
  FuelType,
  PanneKey,
  ProRequest,
  ProStatus,
  Role,
  SpareWheel,
  Vehicle,
} from './types';
import {
  DEFAULT_CHAT,
  DEPANNEURS,
  INITIAL_FLEET,
  MIN_BASE,
  PANNE_LABELS,
  PRO_DEFAULT_CHAT,
  TARIF_BASE,
  TARIF_KM,
} from './constants';
import { ADMIN_APPLICATIONS, ADMIN_DISPUTES } from './adminData';

interface AppState {
  // role / auth
  role: Role | null;
  clientRegistered: boolean;
  proStatus: ProStatus;

  // client profile
  cPrenom: string;
  cNom: string;
  cTel: string;
  cEmail: string;
  cPwd: string;
  cVehModele: string;
  cVehPlaque: string;
  vehColor: string;
  vehColorName: string;
  showPw: boolean;
  pwReset: boolean;

  // report flow
  panne: { key: PanneKey; label: string } | null;
  panneDesc: string;
  diagPhoto: boolean;
  spareWheel: SpareWheel | null;
  batteryState: BatteryState | null;
  fuel: FuelType | null;
  addrA: string;
  addrB: string;
  tow: boolean;
  photo: boolean;
  zoom: number;
  dep: Depanneur | null;

  // post-mission
  rating: number;
  chat: ChatMessage[];
  draft: string;

  // pro profile
  pSociete: string;
  pSiret: string;
  pPrenom: string;
  pNom: string;
  pTel: string;
  pEmail: string;
  pPwd: string;
  docs: Record<string, boolean>;
  online: boolean;
  fleet: Vehicle[];
  activeVeh: number;
  editVehId: number | null;
  ribTitulaire: string;
  ribIban: string;
  editRib: boolean;
  tarifBase: number;
  tarifKm: number;
  earnPeriod: EarnPeriod;
  req: ProRequest | null;

  // admin
  applications: AdminApplication[];
  disputes: Dispute[];
  adminAppId: string | null;
  adminDisputeId: string | null;

  // ---- client actions ----
  setField: (key: keyof AppState, value: string) => void;
  registerClient: () => void;
  togglePw: () => void;
  forgotPw: () => void;
  pickColor: (hex: string, name: string) => void;

  selectPanne: (key: PanneKey) => void;
  setPanneDesc: (text: string) => void;
  takeDiagPhoto: () => void;
  retakeDiagPhoto: () => void;
  setSpareWheel: (v: SpareWheel) => void;
  setBatteryState: (v: BatteryState) => void;
  setFuel: (v: FuelType) => void;

  setAddrA: (text: string) => void;
  setAddrB: (text: string) => void;
  toggleTow: () => void;
  takePhoto: () => void;
  retakePhoto: () => void;

  setZoom: (z: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  cycleZoom: () => void;

  chooseDep: (id: keyof typeof DEPANNEURS) => void;
  clearDep: () => void;

  rate: (n: number) => void;
  resetRating: () => void;

  ensureChat: (role?: Role) => void;
  setDraft: (text: string) => void;
  sendMsg: () => void;
  resetChat: () => void;

  // ---- pro actions ----
  setRole: (r: Role) => void;
  registerPro: () => void;
  validatePro: () => void;
  toggleDoc: (key: string) => void;
  toggleOnline: () => void;
  openReq: (req: ProRequest) => void;

  setActiveVeh: (id: number) => void;
  toggleEditVeh: (id: number) => void;
  updateVeh: (id: number, patch: Partial<Vehicle>) => void;
  removeVeh: (id: number) => void;
  addVehicle: () => void;

  toggleEditRib: () => void;
  saveRib: () => void;

  decBase: () => void;
  incBase: () => void;
  decKm: () => void;
  incKm: () => void;
  setEarnPeriod: (p: EarnPeriod) => void;

  // ---- admin actions ----
  openApplication: (id: string) => void;
  approveApplication: (id: string) => void;
  refuseApplication: (id: string, reason: string) => void;
  openDispute: (id: string) => void;
  resolveDispute: (id: string, status: DisputeStatus) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  role: null,
  clientRegistered: false,
  proStatus: 'none',

  cPrenom: 'Rayan',
  cNom: 'Benali',
  cTel: '+33 6 12 34 56 78',
  cEmail: 'rayan@email.com',
  cPwd: 'krik2026',
  cVehModele: 'Peugeot 208',
  cVehPlaque: 'GH-742-KR',
  vehColor: '#9AA3A9',
  vehColorName: 'Gris',
  showPw: false,
  pwReset: false,

  panne: null,
  panneDesc: '',
  diagPhoto: false,
  spareWheel: null,
  batteryState: null,
  fuel: null,
  addrA: '24 Avenue des Champs-Élysées, 75008 Paris',
  addrB: '12 Rue Oberkampf, 75011 Paris',
  tow: false,
  photo: false,
  zoom: 1,
  dep: null,

  rating: 0,
  chat: [],
  draft: '',

  pSociete: "Dépann'Express SARL",
  pSiret: '123 456 789 00012',
  pPrenom: 'Marc',
  pNom: 'Dubois',
  pTel: '+33 6 51 24 87 03',
  pEmail: 'contact@depann-express.fr',
  pPwd: 'krik2026',
  docs: {},
  online: true,
  fleet: INITIAL_FLEET,
  activeVeh: 1,
  editVehId: null,
  ribTitulaire: "Dépann'Express SARL",
  ribIban: 'FR76 3000 4000 0312 3456 7890 143',
  editRib: false,
  tarifBase: TARIF_BASE,
  tarifKm: TARIF_KM,
  earnPeriod: 'semaine',
  req: null,

  applications: ADMIN_APPLICATIONS,
  disputes: ADMIN_DISPUTES,
  adminAppId: null,
  adminDisputeId: null,

  setField: (key, value) => set({ [key]: value } as Partial<AppState>),
  registerClient: () => set({ clientRegistered: true }),
  togglePw: () => set((s) => ({ showPw: !s.showPw })),
  forgotPw: () => set({ pwReset: true }),
  pickColor: (hex, name) => set({ vehColor: hex, vehColorName: name }),

  selectPanne: (key) =>
    set({
      panne: { key, label: PANNE_LABELS[key] },
      diagPhoto: false,
      spareWheel: null,
      batteryState: null,
      fuel: null,
    }),
  setPanneDesc: (text) => set({ panneDesc: text }),
  takeDiagPhoto: () => set({ diagPhoto: true }),
  retakeDiagPhoto: () => set({ diagPhoto: false }),
  setSpareWheel: (v) => set({ spareWheel: v }),
  setBatteryState: (v) => set({ batteryState: v }),
  setFuel: (v) => set({ fuel: v }),

  setAddrA: (text) => set({ addrA: text }),
  setAddrB: (text) => set({ addrB: text }),
  toggleTow: () => set((s) => ({ tow: !s.tow })),
  takePhoto: () => set({ photo: true }),
  retakePhoto: () => set({ photo: false }),

  setZoom: (z) => set({ zoom: Math.max(1, Math.min(2.4, z)) }),
  zoomIn: () => get().setZoom(get().zoom + 0.6),
  zoomOut: () => get().setZoom(get().zoom - 0.6),
  cycleZoom: () => get().setZoom(get().zoom >= 2.2 ? 1 : get().zoom + 0.6),

  chooseDep: (id) => set({ dep: DEPANNEURS[id] }),
  clearDep: () => set({ dep: null }),

  rate: (n) => set({ rating: n }),
  resetRating: () => set({ rating: 0 }),

  ensureChat: (role) => {
    if (get().chat.length === 0) {
      const r = role ?? get().role;
      set({ chat: r === 'pro' ? PRO_DEFAULT_CHAT : DEFAULT_CHAT });
    }
  },
  setDraft: (text) => set({ draft: text }),
  sendMsg: () => {
    const text = get().draft.trim();
    if (!text) return;
    get().ensureChat();
    set((s) => ({ chat: [...s.chat, { from: 'me', text }], draft: '' }));
  },
  resetChat: () => set({ chat: [], draft: '' }),

  setRole: (r) => set({ role: r }),
  registerPro: () => set({ proStatus: 'pending' }),
  validatePro: () => set({ proStatus: 'active' }),
  toggleDoc: (key) => set((s) => ({ docs: { ...s.docs, [key]: !s.docs[key] } })),
  toggleOnline: () => set((s) => ({ online: !s.online })),
  openReq: (req) => set({ req }),

  setActiveVeh: (id) => set({ activeVeh: id }),
  toggleEditVeh: (id) => set((s) => ({ editVehId: s.editVehId === id ? null : id })),
  updateVeh: (id, patch) =>
    set((s) => ({ fleet: s.fleet.map((v) => (v.id === id ? { ...v, ...patch } : v)) })),
  removeVeh: (id) =>
    set((s) => {
      const fleet = s.fleet.filter((v) => v.id !== id);
      return {
        fleet,
        activeVeh: s.activeVeh === id ? (fleet[0]?.id ?? 0) : s.activeVeh,
        editVehId: null,
      };
    }),
  addVehicle: () =>
    set((s) => {
      const id = Math.max(0, ...s.fleet.map((v) => v.id)) + 1;
      return { fleet: [...s.fleet, { id, modele: '', plaque: '', type: '' }], editVehId: id };
    }),

  toggleEditRib: () => set((s) => ({ editRib: !s.editRib })),
  saveRib: () => set({ editRib: false }),

  decBase: () => set((s) => ({ tarifBase: Math.max(MIN_BASE, s.tarifBase - 1) })),
  incBase: () => set((s) => ({ tarifBase: s.tarifBase + 1 })),
  decKm: () => set((s) => ({ tarifKm: Math.max(0, Math.round((s.tarifKm - 0.5) * 10) / 10) })),
  incKm: () => set((s) => ({ tarifKm: Math.round((s.tarifKm + 0.5) * 10) / 10 })),
  setEarnPeriod: (p) => set({ earnPeriod: p }),

  openApplication: (id) => set({ adminAppId: id }),
  approveApplication: (id) =>
    set((s) => ({
      applications: s.applications.map((a) => (a.id === id ? { ...a, status: 'approved', refuseReason: undefined } : a)),
    })),
  refuseApplication: (id, reason) =>
    set((s) => ({
      applications: s.applications.map((a) => (a.id === id ? { ...a, status: 'refused', refuseReason: reason } : a)),
    })),
  openDispute: (id) => set({ adminDisputeId: id }),
  resolveDispute: (id, status) =>
    set((s) => ({ disputes: s.disputes.map((d) => (d.id === id ? { ...d, status } : d)) })),
}));

export const clampBase = (n: number) => Math.max(MIN_BASE, n);
