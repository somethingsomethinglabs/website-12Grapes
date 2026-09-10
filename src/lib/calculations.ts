export type NumberRules = {
  min: number;
  max?: number;
  integer?: boolean;
  emptyValue: number;
};

export function normalizeNumber(rawValue: string | number, rules: NumberRules) {
  const parsed = typeof rawValue === 'number' ? rawValue : Number(rawValue);
  const finiteValue = rawValue === '' || !Number.isFinite(parsed) ? rules.emptyValue : parsed;
  const steppedValue = rules.integer ? Math.round(finiteValue) : finiteValue;
  const upperBounded = rules.max === undefined ? steppedValue : Math.min(rules.max, steppedValue);

  return Math.max(rules.min, upperBounded);
}

export function isNumberWithinRules(rawValue: string, rules: NumberRules) {
  if (rawValue === '') return false;

  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed) || parsed < rules.min) return false;
  if (rules.max !== undefined && parsed > rules.max) return false;
  if (rules.integer && !Number.isInteger(parsed)) return false;

  return true;
}

export function hoursFor(acres: number, productivity: number, passes = 1) {
  return Math.ceil(Math.max(2, (acres / productivity) * passes) * 4) / 4;
}

export function calculateLabourSupport(operatorHours: number, workerCount: number, workerHours: number) {
  const operatorBillableHours = operatorHours > 0 ? Math.max(2, operatorHours) : 0;
  const workerBillableHours = workerCount > 0 && workerHours > 0 ? Math.max(2, workerHours) : 0;

  return {
    operatorBillableHours,
    operatorCost: operatorBillableHours * 47.35,
    workerBillableHours,
    workerCost: workerCount * workerBillableHours * 39.68,
  };
}
