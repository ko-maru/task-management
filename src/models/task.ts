export type TaskId = string;

/**
 * タスク
 */
export interface Task {
  id: TaskId;
}

/**
 * 新しい Task を作成する。
 * 引数で `id` を渡した場合はそれを利用する。渡さない場合は自動で一意な id を生成する。
 * id の生成はテストや軽量利用を念頭に置いた簡易な実装で、
 * 可能であれば `crypto.randomUUID()` を使い、利用できない環境では
 * タイムスタンプと乱数を組み合わせた文字列を返す。
 */
export function createTask(id?: TaskId): Task {
  if (id && id.length > 0) return { id };

  try {
    const uid = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    return { id: uid };
  } catch (e) {
    return { id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}` };
  }
}
