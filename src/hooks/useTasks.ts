import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import { toggleTaskStatus, type Task } from "../models/task";
import type { TaskId } from "../models/taskId";

/**
 * 新しいタスクを追加する。
 */
function addTask(task: Task) {
  try {
    db.tasks.add(task);
  } catch (error) {
    console.error("タスク追加時にエラーが発生:", error);
  }
}

/**
 * タスクを削除する。
 */
async function removeTask(taskId: TaskId) {
  try {
    await db.tasks.delete(taskId);
  } catch (error) {
    console.error("タスク削除時にエラーが発生:", error);
  }
}

/**
 * タスクの完了状態を切り替える。
 */
async function toggleTask(taskId: TaskId) {
  try {
    const task = await db.tasks.get(taskId);
    if (task) {
      const updatedTask = toggleTaskStatus(task);
      await db.tasks.put(updatedTask);
    }
  } catch (error) {
    console.error("タスクのステータスを切り替え中にエラーが発生:", error);
  }
}

/**
 * タスクの一覧を取得し、タスクの追加・更新関数を提供するカスタムフック。
 */
function useTasks() {
  const tasks = useLiveQuery(() => db.tasks.orderBy("createdAt").reverse().toArray());

  return {
    tasks,
    addTask,
    removeTask,
    toggleTask,
  };
}

export default useTasks;
