import {FC, useState} from 'react';
import {
  Box,
  List,
  ListItem,
  TextField,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {CertificationType} from '../../types';
import {getSpecifiedStoredResumeData, saveStoredResumeData} from '../../services/storage.service';

interface Props {
  isEditMode: boolean;
}

const Certifications: FC<Props> = ({ isEditMode }) => {
  const [certifications, setCertifications] = useState<CertificationType[]>(() => getSpecifiedStoredResumeData('certifications'));

  const handleChangeCertificationData = (certifications: CertificationType[]) => {
    setCertifications(certifications)
    saveStoredResumeData('certifications', certifications)
  }

  const handleAdd = () => {
    handleChangeCertificationData([...certifications, { name: '', date: '' }]);
  };

  const handleDelete = (index: number) => {
    handleChangeCertificationData(certifications.filter((_, i) => i !== index));
  };

  if (!isEditMode && (!certifications.length || certifications.every(cert => !cert.name && !cert.date))) {
    return (
      <Box sx={{ mb: 4 }}>
        <h2>■資格</h2>
        <Box sx={{ pl: 2 }}>なし</Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <h2>■資格</h2>
      {isEditMode ? (
        <Box>
          {certifications.map((cert, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {/* 取得年月 */}
              <TextField
                size="small"
                value={cert.date}
                onChange={(e) => {
                  const newCerts = [...certifications];
                  newCerts[index] = { ...newCerts[index], date: e.target.value };
                  handleChangeCertificationData(newCerts);
                }}
                placeholder="YYYY年M月"
                sx={{ width: 120, mr: 1 }}
              />
              {/* 資格名称 */}
              <TextField
                size="small"
                value={cert.name}
                onChange={(e) => {
                  const newCerts = [...certifications];
                  newCerts[index] = { ...newCerts[index], name: e.target.value };
                  handleChangeCertificationData(newCerts);
                }}
                placeholder="資格名"
                sx={{ mr: 2, flex: 1 }}
              />
              {/* 削除ボタン */}
              <IconButton
                size="small"
                onClick={() => handleDelete(index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAdd}
            size="small"
            sx={{ mt: 1 }}
          >
            資格を追加
          </Button>
        </Box>
      ) : (
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
          {certifications
            .filter(cert => cert.name || cert.date)
            .map((cert, index) => (
              <ListItem key={index} sx={{ display: 'list-item', padding: '4px 0' }}>
                <Stack direction="row" spacing={4}>
                  <Box>{cert.date}</Box>
                  <Box>{cert.name}</Box>
                </Stack>
              </ListItem>
            ))}
        </List>
      )}
    </Box>
  );
};

export default Certifications;