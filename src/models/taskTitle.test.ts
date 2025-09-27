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
});
