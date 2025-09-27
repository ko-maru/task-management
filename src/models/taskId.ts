// ブランディングされた TaskId 型
export type TaskId = string & { readonly __brand: unique symbol };

/**
 * 新しい TaskId を生成する。
 * 契約として UUID 形式のみを許容する。生成には `crypto.randomUUID()` を使う。
 */
export function newTaskId(): TaskId {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID() as TaskId;
  }
  throw new Error('タスクIDを生成するためにcrypto.randomUUIDが必要です');
}

/**
 * 受け取った入力を TaskId として検証して返す。形式が UUID でなければ例外を投げる。
 */
export function parseTaskId(input: unknown): TaskId {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (typeof input !== 'string') {
    throw new TypeError('idはUUIDである必要があります');
  }
  if (!uuidRegex.test(input)) {
    throw new Error('idはUUIDである必要があります');
  }
  return input as TaskId;
}
