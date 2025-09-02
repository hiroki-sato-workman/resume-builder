import { ResumeData } from '../types';

/**
 * データをJSONファイルとしてエクスポートする
 * @param data エクスポートするデータ
 * @param filename ファイル名（拡張子なし）
 */
export const exportResumeData = (data: ResumeData, filename: string = 'resume-data'): void => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

/**
 * JSONファイルからデータをインポートする
 * @returns Promise<ResumeData | null> インポートしたデータ、失敗時はnull
 */
export const importResumeData = (): Promise<ResumeData | null> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const jsonData = e.target?.result as string;
          const data: ResumeData = JSON.parse(jsonData);
          
          // 基本的なデータ形式のバリデーション
          if (validateResumeData(data)) {
            resolve(data);
          } else {
            console.error('Invalid resume data format');
            resolve(null);
          }
        } catch (error) {
          console.error('Failed to parse JSON:', error);
          resolve(null);
        }
      };
      reader.readAsText(file);
    };
    
    input.oncancel = () => {
      resolve(null);
    };
    
    input.click();
  });
};

/**
 * ResumeDataの形式を検証する
 * @param data 検証するデータ
 * @returns boolean 有効なデータ形式かどうか
 */
const validateResumeData = (data: unknown): data is ResumeData => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  
  const resumeData = data as ResumeData;
  
  // 必須フィールドの存在確認
  const requiredFields = [
    'name',
    'summary', 
    'specialties',
    'technicalSkills',
    'workHistory',
    'certifications',
    'selfPromotion'
  ];
  
  return requiredFields.every(field => field in resumeData);
};

/**
 * localStorageから直接データをエクスポートする
 * @param filename ファイル名（拡張子なし）
 */
export const exportFromLocalStorage = (filename: string = 'resume-data'): void => {
  const storedData = localStorage.getItem('resumeData');
  if (!storedData) {
    console.error('No data found in localStorage');
    return;
  }
  
  try {
    const data: ResumeData = JSON.parse(storedData);
    exportResumeData(data, filename);
  } catch (error) {
    console.error('Failed to parse localStorage data:', error);
  }
};

/**
 * インポートしたデータをlocalStorageに保存する
 * @returns Promise<boolean> 保存成功したかどうか
 */
export const importToLocalStorage = async (): Promise<boolean> => {
  const data = await importResumeData();
  if (!data) {
    return false;
  }
  
  try {
    localStorage.setItem('resumeData', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};