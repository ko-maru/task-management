// ブランディングされた TaskStatus 型
export const STATUS_INCOMPLETE = 'incomplete' as const;
export const STATUS_COMPLETE = 'complete' as const;

export type TaskStatus = (typeof STATUS_INCOMPLETE | typeof STATUS_COMPLETE) & {
  readonly __brand?: unique symbol;
};

/**
 * 入力を検証して TaskStatus を返す。
 */
export function parseTaskStatus(input: unknown): TaskStatus {
  if (input === STATUS_COMPLETE || input === STATUS_INCOMPLETE) {
    return input as TaskStatus;
  }
  throw new Error(`status は '${STATUS_COMPLETE}' または '${STATUS_INCOMPLETE}' のどちらかである必要があります`);
}

/** デフォルトのステータス（未完） */
/** デフォルトのステータス（未完） */
export const DEFAULT_TASK_STATUS: TaskStatus = STATUS_INCOMPLETE as TaskStatus;
