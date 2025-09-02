import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ResumeData } from '../types';

/**
 * 履歴のエントリーの型定義
 */
type HistoryEntry = {
  id: string;
  data: ResumeData;
  timestamp: number;
  description?: string;
};

/**
 * 履歴の設定
 */
const HISTORY_CONFIG = {
  maxHistorySize: 20, // 最大履歴数
  storageKey: 'resumeDataHistory',
} as const;

/**
 * 履歴データを管理するatom
 * @returns {HistoryEntry[]} 履歴エントリーの配列
 */
export const historyAtom = atomWithStorage<HistoryEntry[]>(HISTORY_CONFIG.storageKey, []);

/**
 * 現在の履歴インデックスを管理するatom
 * @returns {number} 現在の履歴インデックス（-1は履歴なし）
 */
export const historyIndexAtom = atom<number>(-1);

/**
 * 履歴にエントリーを追加するatomアクション
 * @param data 保存する履歴書データ
 * @param description 履歴の説明（オプション）
 */
export const addHistoryEntryAtom = atom(
  null,
  (get, set, { data, description }: { data: ResumeData; description?: string }) => {
    const currentHistory = get(historyAtom);
    const currentIndex = get(historyIndexAtom);
    
    // 新しいエントリーを作成
    const newEntry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      data: JSON.parse(JSON.stringify(data)), // Deep copy
      timestamp: Date.now(),
      description,
    };
    
    // 現在のインデックスより後の履歴を削除（ブランチの履歴は保持しない）
    const historyToKeep = currentIndex === -1 ? [] : currentHistory.slice(0, currentIndex + 1);
    
    // 新しい履歴を追加
    const newHistory = [...historyToKeep, newEntry];
    
    // 最大履歴数を超えた場合、古い履歴を削除
    const trimmedHistory = newHistory.length > HISTORY_CONFIG.maxHistorySize
      ? newHistory.slice(-HISTORY_CONFIG.maxHistorySize)
      : newHistory;
    
    set(historyAtom, trimmedHistory);
    set(historyIndexAtom, trimmedHistory.length - 1);
  }
);

/**
 * 指定されたインデックスの履歴に戻すatomアクション
 * @param index 戻る履歴のインデックス
 * @returns {ResumeData | null} 復元されたデータ、またはnull
 */
export const restoreFromHistoryAtom = atom(
  null,
  (get, set, index: number): ResumeData | null => {
    const history = get(historyAtom);
    
    if (index < 0 || index >= history.length) {
      return null;
    }
    
    const entry = history[index];
    set(historyIndexAtom, index);
    
    return JSON.parse(JSON.stringify(entry.data)); // Deep copy
  }
);

/**
 * 一つ前の履歴に戻すatomアクション
 * @returns {ResumeData | null} 復元されたデータ、またはnull
 */
export const undoAtom = atom(
  null,
  (get, set): ResumeData | null => {
    const currentIndex = get(historyIndexAtom);
    
    if (currentIndex <= 0) {
      return null; // 戻る履歴がない
    }
    
    return set(restoreFromHistoryAtom, currentIndex - 1);
  }
);

/**
 * 一つ先の履歴に進むatomアクション
 * @returns {ResumeData | null} 復元されたデータ、またはnull
 */
export const redoAtom = atom(
  null,
  (get, set): ResumeData | null => {
    const history = get(historyAtom);
    const currentIndex = get(historyIndexAtom);
    
    if (currentIndex >= history.length - 1) {
      return null; // 進む履歴がない
    }
    
    return set(restoreFromHistoryAtom, currentIndex + 1);
  }
);

/**
 * Undo可能かどうかを判定するatom
 * @returns {boolean} Undo可能かどうか
 */
export const canUndoAtom = atom((get): boolean => {
  const currentIndex = get(historyIndexAtom);
  return currentIndex > 0;
});

/**
 * Redo可能かどうかを判定するatom
 * @returns {boolean} Redo可能かどうか
 */
export const canRedoAtom = atom((get): boolean => {
  const history = get(historyAtom);
  const currentIndex = get(historyIndexAtom);
  return currentIndex < history.length - 1;
});

/**
 * 履歴をクリアするatomアクション
 */
export const clearHistoryAtom = atom(
  null,
  (get, set) => {
    set(historyAtom, []);
    set(historyIndexAtom, -1);
  }
);

/**
 * 履歴の統計情報を取得するatom
 * @returns 履歴の統計情報
 */
export const historyStatsAtom = atom((get) => {
  const history = get(historyAtom);
  const currentIndex = get(historyIndexAtom);
  
  return {
    totalEntries: history.length,
    currentIndex,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    maxSize: HISTORY_CONFIG.maxHistorySize,
  };
});