import { describe, it, expect } from 'vitest';
import { createTask } from './task';

// タスク作成に関するテスト
describe('タスク作成(createTask)', () => {
	it('idを指定しなければ自動でidが生成される', () => {
		const t = createTask();
		// idは文字列で、空ではないこと
		expect(typeof t.id).toBe('string');
		expect(t.id.length).toBeGreaterThan(0);
	});

	it('複数作成したときにidはユニークである', () => {
		const a = createTask();
		const b = createTask();
		expect(a.id).not.toBe(b.id);
	});

	it('idを渡したらそのidが使われる', () => {
		const t = createTask('custom-id-123');
		expect(t.id).toBe('custom-id-123');
	});
});
