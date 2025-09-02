import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Download, Upload } from '@mui/icons-material';
import { useAtomValue, useSetAtom } from 'jotai';
import { resumeDataAtom, restoreResumeDataAtom } from '../../atoms';
import { exportResumeData, importResumeData } from '../../services/importExport.service';

/**
 * import/export機能のコンポーネント
 */
export const ImportExport: React.FC = () => {
  const resumeData = useAtomValue(resumeDataAtom);
  const setResumeData = useSetAtom(restoreResumeDataAtom);

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
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        p: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
        mb: 2
      }}
    >
      <Typography variant="body2" color="textSecondary">
        データのバックアップと復元:
      </Typography>
      
      <Button
        variant="outlined"
        startIcon={<Download />}
        onClick={handleExport}
        size="small"
      >
        エクスポート
      </Button>
      
      <Button
        variant="outlined"
        startIcon={<Upload />}
        onClick={handleImport}
        size="small"
      >
        インポート
      </Button>
    </Box>
  );
};