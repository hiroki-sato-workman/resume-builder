import React, { useMemo } from 'react';
import { Box, TextField } from '@mui/material';
import { WorkExperience } from '../../../types';
import { useAtom } from 'jotai';
import { 
  projectTitleAtomFamily,
  projectDescriptionAtomFamily,
  assignmentsAtomFamily,
  achievementsAtomFamily,
  osAtomFamily,
  languageAtomFamily,
  dbAtomFamily,
  othersAtomFamily,
  teamSizeAtomFamily,
  totalSizeAtomFamily,
  rolesAtomFamily,
  experiencePeriodAtomFamily
} from '../../../atoms/workHistoryAtoms';

type SubCategories<T extends keyof WorkExperience> = T extends keyof WorkExperience
  ? keyof WorkExperience[T]
  : never;

interface Props<T extends keyof WorkExperience> {
  isEditMode: boolean;
  label: string;
  companyId: string;
  expId: string;
  mainCategories: T;
  subCategories: SubCategories<T>;
}

/**
 * 適切なアトムを選択する関数
 */
const getFieldAtom = <T extends keyof WorkExperience>(
  mainCategories: T, 
  subCategories: SubCategories<T>, 
  companyId: string, 
  expId: string
) => {
  // businessDetailsカテゴリの処理
  if (mainCategories === 'businessDetails') {
    const subCat = String(subCategories);
    
    if (subCat === 'projectTitle') return projectTitleAtomFamily({ companyId, expId });
    if (subCat === 'projectDescription') return projectDescriptionAtomFamily({ companyId, expId });
    if (subCat === 'assignments') return assignmentsAtomFamily({ companyId, expId });
    if (subCat === 'achievements') return achievementsAtomFamily({ companyId, expId });
  }
  
  // technicalEnvironmentカテゴリの処理
  if (mainCategories === 'technicalEnvironment') {
    const subCat = String(subCategories);
    
    if (subCat === 'os') return osAtomFamily({ companyId, expId });
    if (subCat === 'language') return languageAtomFamily({ companyId, expId });
    if (subCat === 'db') return dbAtomFamily({ companyId, expId });
    if (subCat === 'others') return othersAtomFamily({ companyId, expId });
  }
  
  // organizationカテゴリの処理
  if (mainCategories === 'organization') {
    const subCat = String(subCategories);
    
    if (subCat === 'teamSize') return teamSizeAtomFamily({ companyId, expId });
    if (subCat === 'totalSize') return totalSizeAtomFamily({ companyId, expId });
    if (subCat === 'roles') return rolesAtomFamily({ companyId, expId });
  }
  
  // periodカテゴリの処理
  if (mainCategories === 'period') {
    return experiencePeriodAtomFamily({ companyId, expId });
  }
  
  throw new Error(`Invalid field: ${String(mainCategories)}.${String(subCategories)}`);
};

const TextFieldForWorkHistory = <T extends keyof WorkExperience>({ 
  isEditMode, 
  label, 
  companyId, 
  expId, 
  mainCategories, 
  subCategories 
}: Props<T>) => {
  // 適切なアトムを選択
  const fieldAtom = useMemo(() => 
    getFieldAtom(mainCategories, subCategories, companyId, expId),
    [companyId, expId, mainCategories, subCategories]
  );
  
  const [value, setValue] = useAtom(fieldAtom);
  
  const isArrayItemType = Array.isArray(value);
  
  const isDisplayLabel = useMemo((): boolean => {
    const isEmpty = (() => {
      // string の場合
      if (!isArrayItemType) return !value;
      // string[] の場合
      return !value?.length || value.every(str => str === '');
    })();
    return isEditMode || !isEmpty;
  }, [isArrayItemType, isEditMode, value]);

  const handleChange = (inputValue: string): void => {
    if (isArrayItemType) {
      setValue(inputValue.split('\n'));
    } else {
      setValue(inputValue);
    }
  };

  return (
    <Box>
      {/* ラベル */}
      {isDisplayLabel && <strong>【{label}】</strong>}

      {isEditMode ? (
        <TextField
          fullWidth
          size="small"
          multiline={true}
          defaultValue={isArrayItemType ? value.join('\n') : value}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        <>
          {isArrayItemType
            ? value?.map((val, i) => (
              <Box key={i}>{val}</Box>
            ))
            : <Box sx={{whiteSpace: 'pre-wrap'}}>{String(value)}</Box>
          }
        </>
      )}
    </Box>
  );
};

export default React.memo(TextFieldForWorkHistory);
