import assert from 'node:assert/strict';
import test from 'node:test';
import { estimateCostRange } from '../src/lib/calculations.ts';

test('returns a rounded planning range for mowing', () => {
  assert.deepEqual(
    estimateCostRange(5, {
      rate: 180,
      slowerCoverage: 0.8,
      fasterCoverage: 1,
    }),
    { low: 900, high: 1150 },
  );
});

test('applies the two-hour minimum before rounding the range', () => {
  assert.deepEqual(
    estimateCostRange(1, {
      rate: 220,
      slowerCoverage: 0.65,
      fasterCoverage: 0.8,
    }),
    { low: 400, high: 450 },
  );
});

test('returns a wider range for slower mechanical weed control', () => {
  assert.deepEqual(
    estimateCostRange(20, {
      rate: 220,
      slowerCoverage: 0.65,
      fasterCoverage: 0.8,
    }),
    { low: 5500, high: 6800 },
  );
});
