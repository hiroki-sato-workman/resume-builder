import { FC } from 'react';
import { Box, IconButton, Tooltip, styled } from '@mui/material';
import { Undo as UndoIcon, Redo as RedoIcon, Download, Upload } from '@mui/icons-material';
import { useAtom, useAtomValue } from 'jotai';
import { performUndoAtom, performRedoAtom, resumeDataAtom, restoreResumeDataAtom } from '../../../atoms';
import { canUndoAtom, canRedoAtom } from '../../../atoms/historyAtoms';
import { exportResumeData, importResumeData } from '../../../services/importExport.service';

const HistoryToolbar: FC = () => {
  const [, performUndo] = useAtom(performUndoAtom);
  const [, performRedo] = useAtom(performRedoAtom);
  const canUndo = useAtomValue(canUndoAtom);
  const canRedo = useAtomValue(canRedoAtom);
  const resumeData = useAtomValue(resumeDataAtom);
  const setResumeData = useAtom(restoreResumeDataAtom)[1];

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

  /**
   * データをエクスポートする
   */
  const handleExport = (): void => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const filename = `resume-data-${currentDate}`;
    exportResumeData(resumeData, filename);
  };

  /**
   * データをインポートする
   */
  const handleImport = async (): Promise<void> => {
    const importedData = await importResumeData();
    if (importedData) {
      setResumeData(importedData);
      // ページをリロードして全てのatomを同期
      window.location.reload();
    }
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

      <Box sx={{ width: 1, backgroundColor: '#ddd', mx: 0.5 }} />

      <Tooltip title="データをエクスポート">
        <span>
          <IconButton
            onClick={handleExport}
            size="small"
            sx={{ padding: 1 }}
          >
            <Download fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="データをインポート">
        <span>
          <IconButton
            onClick={handleImport}
            size="small"
            sx={{ padding: 1 }}
          >
            <Upload fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </NoPrint>
  );
};

export default HistoryToolbar;