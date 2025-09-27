// ブランディングされた TaskId 型
import type { TaskId } from './taskId';
import { newTaskId } from './taskId';

/**
 * タスク
 */
export interface Task {
  id: TaskId;
}

/**
 * 新しい Task を作成する。
 * - 引数で渡す場合は `TaskId` 型（既に検証済み）を期待する。検証は `parseTaskId` 側で行う。
 * - 引数を渡さない場合は `newTaskId()` で生成する。
 */
export function createTask(id?: TaskId): Task {
  if (typeof id !== 'undefined') {
    return { id };
  }
  return { id: newTaskId() };
}
