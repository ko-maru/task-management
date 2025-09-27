import { describe, it, expect } from 'vitest';
import { createTask } from './task';
import { parseTaskId } from './taskId';
import { parseTaskTitle } from './taskTitle';
import { parseTaskStatus, STATUS_COMPLETE, STATUS_INCOMPLETE } from './taskStatus';
import { toggleTaskStatus } from './task';

// UUID 準拠の正規表現（簡易）
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe('タスク作成(createTask) - UUIDのみ許容の契約', () => {
  it('idを指定しなければ自動でUUID形式のidが生成される', () => {
  const t = createTask({ title: parseTaskTitle('task A') });
    expect(typeof t.id).toBe('string');
    expect(uuidRegex.test(t.id)).toBe(true);
    expect(t.title).toBe('task A');
  });

  it('複数作成したときにidはユニークであり、いずれもUUID形式である', () => {
  const a = createTask({ title: parseTaskTitle('a') });
  const b = createTask({ title: parseTaskTitle('b') });
    expect(uuidRegex.test(a.id)).toBe(true);
    expect(uuidRegex.test(b.id)).toBe(true);
    expect(a.id).not.toBe(b.id);
  });

  it('有効なUUIDを渡したらそのidが使われる', () => {
    const valid = '123e4567-e89b-12d3-a456-426614174000';
    // parseTaskId で検証してから createTask に渡すのが正しい呼び出し方
    const tid = parseTaskId(valid);
  const t = createTask({ id: tid, title: parseTaskTitle('with id') });
    expect(t.id).toBe(valid);
    expect(t.title).toBe('with id');
  });

  it('title が空文字だと例外を投げる', () => {
  expect(() => parseTaskTitle('')).toThrow();
  });

  it('title を省略すると例外を投げる（必須）', () => {
    // title は必須になったため、引数無しはエラー
    // @ts-expect-error テストで意図的に誤った呼び出しを行う
    expect(() => createTask()).toThrow();
  });

  it('title を渡すと Task に反映される', () => {
    const title = 'やること';
    const t = createTask({ title: parseTaskTitle(title) });
    expect(t.title).toBe(title);
  });

  it('status を指定しなければ未完(incomplete)がデフォルトになる', () => {
    const t = createTask({ title: parseTaskTitle('x') });
  expect(t.status).toBe(STATUS_INCOMPLETE);
  });

  it('status を指定するとその値が使われる', () => {
  const t = createTask({ title: parseTaskTitle('y'), status: parseTaskStatus(STATUS_COMPLETE) });
  expect(t.status).toBe(STATUS_COMPLETE);
  });

  it('未完 -> 完了 にトグルされる', () => {
    const t = createTask({ title: parseTaskTitle('toggle') });
    expect(t.status).toBe(STATUS_INCOMPLETE);
    const toggled = toggleTaskStatus(t);
    expect(toggled.status).toBe(STATUS_COMPLETE);
    // 元のオブジェクトは変更されていない
    expect(t.status).toBe(STATUS_INCOMPLETE);
  });

  it('2回トグルすると元に戻る', () => {
    const t = createTask({ title: parseTaskTitle('toggle2') });
    const t1 = toggleTaskStatus(t);
    const t2 = toggleTaskStatus(t1);
    expect(t2.status).toBe(t.status);
  });
});
