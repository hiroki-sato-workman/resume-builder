import { FC } from 'react';
import { Box, IconButton, Tooltip, styled } from '@mui/material';
import { Undo as UndoIcon, Redo as RedoIcon } from '@mui/icons-material';
import { useAtom, useAtomValue } from 'jotai';
import { performUndoAtom, performRedoAtom } from '../../../atoms';
import { canUndoAtom, canRedoAtom } from '../../../atoms/historyAtoms';

const HistoryToolbar: FC = () => {
  const [, performUndo] = useAtom(performUndoAtom);
  const [, performRedo] = useAtom(performRedoAtom);
  const canUndo = useAtomValue(canUndoAtom);
  const canRedo = useAtomValue(canRedoAtom);

  const NoPrint = styled(Box)`
    @media print {
      display: none !important;
    }
  `;

  /**
   * Undoアクションを実行する
   */
  const handleUndo = (): void => {
    performUndo();
  };

  /**
   * Redoアクションを実行する
   */
  const handleRedo = (): void => {
    performRedo();
  };

  return (
    <NoPrint
      sx={{
        position: 'fixed',
        top: 16,
        left: 16,
        zIndex: 1000,
        backgroundColor: 'white',
        boxShadow: 2,
        borderRadius: 1,
        display: 'flex',
        gap: 0.5
      }}
    >
      <Tooltip title="もとに戻す (Ctrl+Z)">
        <span>
          <IconButton
            onClick={handleUndo}
            disabled={!canUndo}
            size="small"
            sx={{ 
              padding: 1,
              '&:disabled': {
                opacity: 0.3
              }
            }}
          >
            <UndoIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      
      <Tooltip title="やり直し (Ctrl+Y)">
        <span>
          <IconButton
            onClick={handleRedo}
            disabled={!canRedo}
            size="small"
            sx={{ 
              padding: 1,
              '&:disabled': {
                opacity: 0.3
              }
            }}
          >
            <RedoIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </NoPrint>
  );
};

export default HistoryToolbar;