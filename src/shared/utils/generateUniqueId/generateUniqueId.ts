/**
 * 重複しない一意のIDを生成する
 * @param existingIds 既存のID配列
 * @param prefix IDのプレフィックス
 * @returns {string} 一意のID
 */
export const generateUniqueId = (existingIds: string[], prefix: 'experiences' | 'companyName'): string => {
  // プレフィックスを除去して数値部分を抽出
  const numericIds = existingIds.map(id => {
    if (id.startsWith(`${prefix}_`)) {
      const numPart = id.substring(prefix.length + 1);
      const num = parseInt(numPart, 10);
      return isNaN(num) ? 0 : num;
    }
      const num = parseInt(id, 10);
      return isNaN(num) ? 0 : num;
  });
  
  // 最大値を取得
  const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
  
  // 最大値 + 1 を新しいIDとして返す
  return prefix ? `${prefix}_${maxId + 1}` : String(maxId + 1);
};
