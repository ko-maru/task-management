// ブランディングされた TaskTitle 型
export type TaskTitle = string & { readonly __brand: unique symbol };

/**
 * 入力を検証して TaskTitle を返す。空文字（トリム後0文字）は許容しない。
 * 呼び出し側で検証（契約プログラミング）するための関数。
 */
export function parseTaskTitle(input: unknown): TaskTitle {
  if (typeof input !== 'string') {
    throw new TypeError('タイトルは文字列である必要があります');
  }
  const trimmed = input.trim();
  if (trimmed.length < 1) {
    throw new Error('タイトルは1文字以上である必要があります');
  }
  const MAX = 200;
  if (trimmed.length > MAX) {
    throw new Error(`タイトルは最大${MAX}文字までです`);
  }
  return trimmed as TaskTitle;
}
