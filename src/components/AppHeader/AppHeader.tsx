import { FC } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  Tooltip, 
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Divider
} from '@mui/material';
import { 
  Undo as UndoIcon, 
  Redo as RedoIcon, 
  Download, 
  Upload,
  Edit as EditIcon, 
  Visibility as ViewIcon 
} from '@mui/icons-material';
import { useAtom, useAtomValue } from 'jotai';
import { 
  performUndoAtom, 
  performRedoAtom, 
  resumeDataAtom, 
  restoreResumeDataAtom,
  isEditModeAtom
} from '../../atoms';
import { canUndoAtom, canRedoAtom } from '../../atoms/historyAtoms';
import { exportResumeData, importResumeData } from '../../services/importExport.service';

/**
 * アプリケーションのメイン固定ヘッダー
 * Undo/Redo、Import/Export、編集モード切り替えを含む
 */
export const AppHeader: FC = () => {
  const [, performUndo] = useAtom(performUndoAtom);
  const [, performRedo] = useAtom(performRedoAtom);
  const [isEditMode, setIsEditMode] = useAtom(isEditModeAtom);
  const canUndo = useAtomValue(canUndoAtom);
  const canRedo = useAtomValue(canRedoAtom);
  const resumeData = useAtomValue(resumeDataAtom);
  const setResumeData = useAtom(restoreResumeDataAtom)[1];

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

  /**
   * 編集モードを切り替える
   */
  const handleModeToggle = (): void => {
    setIsEditMode(!isEditMode);
  };

  return (
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={2}
      sx={{ 
        backgroundColor: 'white',
        '@media print': {
          display: 'none !important'
        }
      }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
        {/* 左側: アプリタイトル */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          職務経歴書作成ツール
        </Typography>

        {/* 中央: 履歴機能 */}
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <Tooltip title="もとに戻す (Ctrl+Z)">
            <span>
              <IconButton
                onClick={handleUndo}
                disabled={!canUndo}
                size="small"
                sx={{ 
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
                  '&:disabled': {
                    opacity: 0.3
                  }
                }}
              >
                <RedoIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          <Tooltip title="データをエクスポート">
            <IconButton
              onClick={handleExport}
              size="small"
            >
              <Download fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="データをインポート">
            <IconButton
              onClick={handleImport}
              size="small"
            >
              <Upload fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* 右側: 編集モード切り替え */}
        <Box>
          <ToggleButtonGroup
            exclusive
            value={isEditMode}
            onChange={handleModeToggle}
            size="small"
          >
            <ToggleButton value={true}>
              <EditIcon sx={{ mr: 0.5 }} fontSize="small" />
              編集
            </ToggleButton>
            <ToggleButton value={false}>
              <ViewIcon sx={{ mr: 0.5 }} fontSize="small" />
              閲覧
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};