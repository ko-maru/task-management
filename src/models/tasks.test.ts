
import { describe, it, expect } from 'vitest';
import { getTaskById } from './tasks';
import { createTask } from './task';
import { parseTaskId } from './taskId';
import { parseTaskTitle } from './taskTitle';
import { getTaskById, updateTaskById } from './tasks';

describe('getTaskById', () => {
	it('指定したIDのタスクを取得できる', () => {
		const id1 = parseTaskId('123e4567-e89b-12d3-a456-426614174000');
		const id2 = parseTaskId('123e4567-e89b-12d3-a456-426614174001');
		const tasks = [
			createTask({ id: id1, title: parseTaskTitle('task1') }),
			createTask({ id: id2, title: parseTaskTitle('task2') })
		];
		const found = getTaskById(tasks, id2);
		expect(found).not.toBeUndefined();
		expect(found?.id).toBe(id2);
		expect(found?.title).toBe('task2');
	});

	it('存在しないIDの場合はundefinedを返す', () => {
		const id1 = parseTaskId('123e4567-e89b-12d3-a456-426614174000');
		const id2 = parseTaskId('123e4567-e89b-12d3-a456-426614174001');
		const id3 = parseTaskId('123e4567-e89b-12d3-a456-426614174002');
		const tasks = [
			createTask({ id: id1, title: parseTaskTitle('task1') }),
			createTask({ id: id2, title: parseTaskTitle('task2') })
		];
		const found = getTaskById(tasks, id3);
		expect(found).toBeUndefined();
	});

  describe('updateTaskById', () => {
    it('指定したIDのタスクを更新できる', () => {
      const id1 = parseTaskId('123e4567-e89b-12d3-a456-426614174000');
      const id2 = parseTaskId('123e4567-e89b-12d3-a456-426614174001');
      const tasks = [
        createTask({ id: id1, title: parseTaskTitle('task1') }),
        createTask({ id: id2, title: parseTaskTitle('task2') })
      ];
      const updatedTask = createTask({ id: id2, title: parseTaskTitle('updated task2') });
      const updatedTasks = updateTaskById(tasks, updatedTask);

      expect(updatedTasks).toHaveLength(2);
      expect(updatedTasks[1].id).toBe(id2);
      expect(updatedTasks[1].title).toBe('updated task2');
    });

    it('存在しないIDの場合は元のTasksリストを返す', () => {
      const id1 = parseTaskId('123e4567-e89b-12d3-a456-426614174000');
      const id2 = parseTaskId('123e4567-e89b-12d3-a456-426614174001');
      const id3 = parseTaskId('123e4567-e89b-12d3-a456-426614174002');
      const tasks = [
        createTask({ id: id1, title: parseTaskTitle('task1') }),
        createTask({ id: id2, title: parseTaskTitle('task2') })
      ];
      const updatedTask = createTask({ id: id3, title: parseTaskTitle('updated task3') });
      const updatedTasks = updateTaskById(tasks, updatedTask);

      expect(updatedTasks).toEqual(tasks);
    });
  });
});
