import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateLabourSupport,
  hoursFor,
  isNumberWithinRules,
  normalizeNumber,
} from '../src/lib/calculations.ts';

const acreageRules = { min: 0.25, max: 100, emptyValue: 5 };
const passRules = { min: 1, max: 6, integer: true, emptyValue: 1 };
const workerRules = { min: 0, max: 20, integer: true, emptyValue: 0 };

test('normalizes calculator inputs to their supported bounds', () => {
  assert.equal(normalizeNumber('101', acreageRules), 100);
  assert.equal(normalizeNumber('-4', acreageRules), 0.25);
  assert.equal(normalizeNumber('', acreageRules), 5);
  assert.equal(normalizeNumber('7', passRules), 6);
  assert.equal(normalizeNumber('1.5', workerRules), 2);
  assert.equal(normalizeNumber('not-a-number', workerRules), 0);
});

test('only promotes complete valid drafts into estimate state', () => {
  assert.equal(isNumberWithinRules('', acreageRules), false);
  assert.equal(isNumberWithinRules('100.25', acreageRules), false);
  assert.equal(isNumberWithinRules('0.25', acreageRules), true);
  assert.equal(isNumberWithinRules('1.5', workerRules), false);
  assert.equal(isNumberWithinRules('20', workerRules), true);
});

test('applies quarter-hour rounding and two-hour minimums', () => {
  assert.equal(hoursFor(5, 0.8), 6.25);
  assert.equal(hoursFor(0.25, 1), 2);

  assert.deepEqual(calculateLabourSupport(1, 3, 1.5), {
    operatorBillableHours: 2,
    operatorCost: 94.7,
    workerBillableHours: 2,
    workerCost: 238.07999999999998,
  });
});
