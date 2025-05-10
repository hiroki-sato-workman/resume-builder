import {useMemo} from 'react';
import {Box, TextField} from '@mui/material';
import {WorkCompany, WorkExperience} from '../../../types';
import {useAtom} from 'jotai';
import {workHistoryAtom} from '../../../atoms';

type SubCategories<T extends keyof WorkExperience> = T extends keyof WorkExperience
  ? keyof WorkExperience[T]
  : never;

// 値の型を取得するユーティリティ型
type WorkExperienceValue<
  T extends keyof WorkExperience,
  U extends keyof WorkExperience[T]
> = WorkExperience[T][U];

interface Props<T extends keyof WorkExperience> {
  isEditMode: boolean;
  label: string;
  companyIndex: number;
  expIndex: number;
  mainCategories: T;
  subCategories: SubCategories<T>;
  onChangeWorkHistory: (workHistory: WorkCompany[]) => void;
}

const TextFieldForWorkHistory = <T extends keyof WorkExperience>({ isEditMode, label, companyIndex, expIndex, mainCategories, subCategories, onChangeWorkHistory }: Props<T>) => {
  const [workHistory] = useAtom(workHistoryAtom);
  const item = workHistory[companyIndex].experiences[expIndex][mainCategories][subCategories] as WorkExperienceValue<T, typeof subCategories>;
  const isArrayItemType = Array.isArray(item)
  const isDisplayLabel = useMemo((): boolean => {
    const isEmpty = (() => {
      // string の場合
      if (!isArrayItemType) return !item
      // string[] の場合
      return !item?.length || item.every(str => str === '');
    })()
    return isEditMode || !isEmpty;
  }, [isArrayItemType, isEditMode, item])

  const handleChange = (value: string): void => {
    const processValue = (input: string): WorkExperienceValue<T, SubCategories<T>> => {
      // ここで isArrayItemType の判定をする（実装に応じて）
      const isArrayValue = Array.isArray(workHistory[companyIndex].experiences[expIndex][mainCategories][subCategories]);
      return isArrayValue ? input.split('\n') as WorkExperienceValue<T, SubCategories<T>>
        : input as WorkExperienceValue<T, SubCategories<T>>;
    };

    const updatedWorkHistory = workHistory.map((company, cIndex) =>
      cIndex !== companyIndex ? company : {
        ...company,
        experiences: company.experiences.map((exp, eIndex) =>
          eIndex !== expIndex ? exp : {
            ...exp,
            [mainCategories]: {
              ...exp[mainCategories],
              [subCategories]: processValue(value)
            }
          }
        )
      }
    );

    onChangeWorkHistory(updatedWorkHistory);
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
          defaultValue={isArrayItemType ? item.join('\n') : item}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        <>
          {isArrayItemType
            ? item?.map((value, i) => (
              <Box key={i}>{value}</Box>
            ))
            : <Box sx={{whiteSpace: 'pre-wrap'}}>{String(item)}</Box>
          }
        </>
      )}
    </Box>
  )
}

export default TextFieldForWorkHistory;
