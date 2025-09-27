import { describe, it, expect } from 'vitest';
import { newTaskId, parseTaskId } from './taskId';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe('TaskId ユーティリティ', () => {
  it('newTaskId は UUID を生成する', () => {
    const id = newTaskId();
    expect(typeof id).toBe('string');
    expect(uuidRegex.test(id)).toBe(true);
  });

  it('parseTaskId は有効な UUID を通す', () => {
    const valid = '123e4567-e89b-12d3-a456-426614174000';
    const tid = parseTaskId(valid);
    expect(tid).toBe(valid);
  });

  it('parseTaskId は無効な入力で例外を投げる', () => {
    expect(() => parseTaskId('not-uuid')).toThrow();
    expect(() => parseTaskId(123 as any)).toThrow();
  });
});
