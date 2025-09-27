import { describe, it, expect } from 'vitest';
import { parseTaskStatus, DEFAULT_TASK_STATUS, STATUS_COMPLETE, STATUS_INCOMPLETE } from './taskStatus';

describe('TaskStatus', () => {
  it('DEFAULT_TASK_STATUS は incomplete', () => {
    expect(DEFAULT_TASK_STATUS).toBe(STATUS_INCOMPLETE);
  });

  it('parseTaskStatus は valid 値を通す', () => {
  expect(parseTaskStatus(STATUS_COMPLETE)).toBe(STATUS_COMPLETE);
  expect(parseTaskStatus(STATUS_INCOMPLETE)).toBe(STATUS_INCOMPLETE);
  });

  it('parseTaskStatus は不正値で例外', () => {
    expect(() => parseTaskStatus('done' as any)).toThrow();
  });
});
