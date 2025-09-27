// ブランディングされた TaskTitle 型
export type TaskTitle = string & { readonly __brand: unique symbol };

/**
 * 入力を検証して TaskTitle を返す。空文字（トリム後0文字）は許容しない。
 * 呼び出し側で検証（契約プログラミング）するための関数。
 */
export function parseTaskTitle(input: unknown): TaskTitle {
  if (typeof input !== 'string') {
    throw new TypeError('title must be a string');
  }
  const trimmed = input.trim();
  if (trimmed.length < 1) {
    throw new Error('title must be at least 1 character');
  }
  return trimmed as TaskTitle;
}
