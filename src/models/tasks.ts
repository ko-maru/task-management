import type { Task } from "./task";

import type { TaskId } from "./taskId";

export type Tasks = Task[];

/**
 * 指定したIDのタスクをTasksリストから取得する。
 * 見つからない場合はundefinedを返す。
 */
export function getTaskById(tasks: Tasks, id: TaskId): Task | undefined {
  return tasks.find((task) => task.id === id);
}

/**
 * 新しいタスクをTasksリストに追加する。
 * 既に同じIDのタスクが存在する場合はエラーを投げる。
 */
export function addTask(tasks: Tasks, newTask: Task): Tasks {
  if (tasks.find((task) => task.id === newTask.id)) {
    throw new Error(`IDが重複しています: ${newTask.id}`);
  }

  return [...tasks, newTask];
}

/**
 * 指定したIDのタスクを更新する。
 * 見つからない場合は元のTasksリストをそのまま返す。
 */
export function updateTaskById(tasks: Tasks, updatedTask: Task): Tasks {
  return tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
}

/**
 * 指定したIDのタスクをTasksリストから削除する。
 * 見つからない場合は元のTasksリストをそのまま返す。
 */
export function removeTaskById(tasks: Tasks, id: TaskId): Tasks {
  return tasks.filter((task) => task.id !== id);
}
