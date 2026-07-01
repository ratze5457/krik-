import { COMMISSION_RATE, DEPANNEURS, EARNINGS, TARIF_KM, TOW_KM } from './constants';
import { Depanneur, EarnPeriod } from './types';

const eur = (n: number) => n.toLocaleString('fr-FR') + ' €';

export function computeEarnings(period: EarnPeriod) {
  const data = EARNINGS[period];
  const max = Math.max(...data.bars.map((b) => b[1]));
  const commission = Math.round(data.ca * COMMISSION_RATE);
  const net = data.ca - commission;
  return {
    ...data,
    caLabel: eur(data.ca),
    commissionLabel: '− ' + eur(commission),
    netLabel: eur(net),
    net,
    barsPct: data.bars.map((b) => ({ name: b[0], pct: (b[1] / max) * 100 })),
  };
}

export function computeReqEarnings(price: string) {
  const total = parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;
  const commission = Math.round(total * COMMISSION_RATE);
  return {
    total,
    priceLabel: `${total} €`,
    commissionLabel: '− ' + commission + ' €',
    netLabel: total - commission + ' €',
  };
}

const parsePrice = (price: string) => parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;

export function computePricing(dep: Depanneur | null, tow: boolean) {
  const activeDep = dep ?? DEPANNEURS.express;
  const base = parsePrice(activeDep.price);
  const depKm = activeDep.km ?? TARIF_KM;
  const towCost = Math.round(depKm * TOW_KM);
  const total = base + (tow ? towCost : 0);
  const commission = Math.round(total * COMMISSION_RATE);
  const net = total - commission;
  return {
    dep: activeDep,
    base,
    towCost,
    total,
    commission,
    net,
    towKmLabel: '8,4 km',
    towCostLabel: `+${towCost} €`,
    totalLabel: `${total} €`,
  };
}

export function describePanneDetails(state: {
  panneDesc: string;
  fuel: string | null;
  spareWheel: string | null;
  batteryState: string | null;
}) {
  const parts: string[] = [];
  if (state.panneDesc && state.panneDesc.trim()) parts.push(state.panneDesc.trim());
  if (state.fuel) parts.push('Carburant : ' + (state.fuel === 'E85' ? 'Superéthanol E85' : state.fuel));
  if (state.spareWheel) parts.push('Roue de secours : ' + (state.spareWheel === 'oui' ? 'oui' : 'non'));
  if (state.batteryState) {
    parts.push(state.batteryState === 'boost' ? 'Batterie déchargée — boost/câbles' : 'Batterie à remplacer');
  }
  return parts.join(' · ');
}
