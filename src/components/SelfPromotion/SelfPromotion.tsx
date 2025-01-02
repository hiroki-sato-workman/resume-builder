import { FC } from 'react'
import {
  Box,
  TextField,
  Button,
  IconButton,
  styled
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface SelfPromotionSection {
  title: string;
  content: string;
}

interface Props {
  content: SelfPromotionSection[];
  onChange: (content: SelfPromotionSection[]) => void;
  isEditMode: boolean;
}

const TitleText = styled('span')({
  fontWeight: 'bold',
  display: 'inline-block',
  borderBottom: '1px solid black',
});

const SelfPromotion: FC<Props> = ({ content, onChange, isEditMode }) => {
  const handleAdd = () => {
    onChange([...content, { title: '', content: '' }]);
  };

  const handleDelete = (index: number) => {
    onChange(content.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof SelfPromotionSection, value: string) => {
    const newContent = [...content];
    newContent[index] = { ...newContent[index], [field]: value };
    onChange(newContent);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <h2>■自己PR</h2>
      {isEditMode ? (
        <Box>
          {content.map((section, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  value={section.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  placeholder="タイトル"
                  sx={{ mr: 1 }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleDelete(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                multiline
                minRows={3}
                value={section.content}
                onChange={(e) => handleChange(index, 'content', e.target.value)}
                placeholder="内容"
              />
            </Box>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={handleAdd}
            size="small"
          >
            項目を追加
          </Button>
        </Box>
      ) : (
        <Box>
          {content.map((section, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <TitleText>◆{section.title}</TitleText>
              <Box sx={{ whiteSpace: 'pre-wrap' }}>{section.content}</Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SelfPromotion;