export type EstimateAssumptions = {
  rate: number;
  slowerCoverage: number;
  fasterCoverage: number;
};

const PRICE_STEP = 50;
const MINIMUM_HOURS = 2;

export function estimateCostRange(acres: number, assumptions: EstimateAssumptions) {
  const safeAcres = Math.max(0, acres);
  const fasterHours = Math.max(MINIMUM_HOURS, safeAcres / assumptions.fasterCoverage);
  const slowerHours = Math.max(MINIMUM_HOURS, safeAcres / assumptions.slowerCoverage);

  return {
    low: Math.floor((fasterHours * assumptions.rate) / PRICE_STEP) * PRICE_STEP,
    high: Math.ceil((slowerHours * assumptions.rate) / PRICE_STEP) * PRICE_STEP,
  };
}
