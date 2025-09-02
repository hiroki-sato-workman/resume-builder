import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { performUndoAtom, performRedoAtom } from '../../atoms';

/**
 * キーボードショートカットを管理するカスタムフック
 */
export const useKeyboardShortcuts = (): void => {
  const [, performUndo] = useAtom(performUndoAtom);
  const [, performRedo] = useAtom(performRedoAtom);

  useEffect(() => {
    /**
     * キーボードイベントハンドラー
     * @param event キーボードイベント
     */
    const handleKeyDown = (event: KeyboardEvent): void => {
      // Mac: Cmd+Z, Windows/Linux: Ctrl+Z
      if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        performUndo();
        return;
      }

      // Mac: Cmd+Shift+Z, Windows/Linux: Ctrl+Y
      if (
        ((event.metaKey || event.ctrlKey) && event.key === 'z' && event.shiftKey) ||
        ((event.metaKey || event.ctrlKey) && event.key === 'y')
      ) {
        event.preventDefault();
        performRedo();
        return;
      }
    };

    // イベントリスナーを追加
    document.addEventListener('keydown', handleKeyDown);

    // クリーンアップ
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [performUndo, performRedo]);
};