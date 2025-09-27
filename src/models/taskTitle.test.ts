import { describe, it, expect } from 'vitest';
import { parseTaskTitle } from './taskTitle';

describe('TaskTitle パーサー', () => {
  it('有効なタイトルを返す（トリムされる）', () => {
    const t = parseTaskTitle('  hello  ');
    expect(t).toBe('hello');
  });

  it('空文字はエラー', () => {
    expect(() => parseTaskTitle('')).toThrow();
  });

  it('非文字列はエラー', () => {
    expect(() => parseTaskTitle(123 as any)).toThrow();
  });

  it('境界値: 1文字は許容される', () => {
    expect(parseTaskTitle('a')).toBe('a');
  });

  it('境界値: 200文字は許容される、201文字はエラー', () => {
    const ok = 'x'.repeat(200);
    const ng = 'x'.repeat(201);
    expect(parseTaskTitle(ok)).toBe(ok);
    expect(() => parseTaskTitle(ng)).toThrow();
  });
});
