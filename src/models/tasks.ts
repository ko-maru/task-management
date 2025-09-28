import type { Task } from "./task";

import type { TaskId } from "./taskId";

export type Tasks = Task[];

/**
 * 指定したIDのタスクをTasksリストから取得する。
 * 見つからない場合はundefinedを返す。
 */
export function getTaskById(tasks: Tasks, id: TaskId): Task | undefined {
	return tasks.find(task => task.id === id);
}

/**
 * 指定したIDのタスクを更新する。
 * 見つからない場合は元のTasksリストをそのまま返す。
 */
export function updateTaskById(tasks: Tasks, updatedTask: Task): Tasks {
  return tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
}