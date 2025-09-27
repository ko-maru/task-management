import { describe, it, expect } from 'vitest';
import { createTask } from './task';
import { parseTaskId } from './taskId';

// UUID 準拠の正規表現（簡易）
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe('タスク作成(createTask) - UUIDのみ許容の契約', () => {
  it('idを指定しなければ自動でUUID形式のidが生成される', () => {
    const t = createTask();
    expect(typeof t.id).toBe('string');
    expect(uuidRegex.test(t.id)).toBe(true);
  });

  it('複数作成したときにidはユニークであり、いずれもUUID形式である', () => {
    const a = createTask();
    const b = createTask();
    expect(uuidRegex.test(a.id)).toBe(true);
    expect(uuidRegex.test(b.id)).toBe(true);
    expect(a.id).not.toBe(b.id);
  });

  it('有効なUUIDを渡したらそのidが使われる', () => {
    const valid = '123e4567-e89b-12d3-a456-426614174000';
    // parseTaskId で検証してから createTask に渡すのが正しい呼び出し方
    const tid = parseTaskId(valid);
    const t = createTask(tid);
    expect(t.id).toBe(valid);
  });
});
