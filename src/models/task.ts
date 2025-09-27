// ブランディングされた TaskId 型
import type { TaskId } from './taskId';
import { newTaskId } from './taskId';
import type { TaskTitle } from './taskTitle';

/**
 * タスク
 */
export interface Task {
  id: TaskId;
  // タスクのタイトル。未指定の場合は undefined。
  title?: string;
}

/**
 * 新しい Task を作成する。
 * - 引数で渡す場合は `TaskId` 型（既に検証済み）を期待する。検証は `parseTaskId` 側で行う。
 * - 引数を渡さない場合は `newTaskId()` で生成する。
 */
export interface CreateTaskOptions {
  title: TaskTitle;
  id?: TaskId;
}

/**
 * タスクを作成する。引数はオブジェクト形式で受け取る。
 * title は必須（1文字以上）。id は任意で、未指定なら自動生成する。
 */
export function createTask(opts: CreateTaskOptions): Task {
  const { title, id } = opts;
  // title は既に parseTaskTitle で検証して渡すことを期待する（契約プログラミング）
  if (typeof id !== 'undefined') {
    return { id, title };
  }
  return { id: newTaskId(), title };
}
