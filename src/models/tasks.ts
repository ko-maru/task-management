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