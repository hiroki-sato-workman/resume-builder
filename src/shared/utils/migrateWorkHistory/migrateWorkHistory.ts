import { WorkCompany, WorkExperience } from '../../../types';
import { generateUniqueId } from '../generateUniqueId';

/**
 * 新しい会社データを作成する
 * @param companyData 会社データの初期値
 * @param existingIds 既存のID配列
 * @returns {WorkCompany} 新しい会社データ
 */
export const createNewCompany = (companyData: Partial<WorkCompany>, existingIds: string[]): WorkCompany => {
  return {
    companyName: companyData.companyName || '',
    period: companyData.period || { start: '', end: '' },
    experiences: {}
  };
};

/**
 * 新しい経験データを作成する
 * @param experienceData 経験データの初期値
 * @param existingIds 既存のID配列
 * @returns {WorkExperience} 新しい経験データ
 */
export const createNewExperience = (experienceData: Partial<WorkExperience>, existingIds: string[]): WorkExperience => {
  // IDは返り値には含めず、呼び出し側でキーとして使用する
  return {
    period: experienceData.period || { start: '', end: '' },
    businessDetails: experienceData.businessDetails || {
      projectTitle: '',
      projectDescription: '',
      assignments: [],
      achievements: ''
    },
    technicalEnvironment: experienceData.technicalEnvironment || {
      os: [],
      language: [],
      db: [],
      others: []
    },
    organization: experienceData.organization || {
      teamSize: '',
      totalSize: '',
      roles: []
    }
  };
};

/**
 * 新しい経験IDを生成する
 * @param existingIds 既存のID配列
 * @returns {string} 新しい経験ID
 */
export const generateNewExperienceId = (existingIds: string[]): string => {
  return generateUniqueId(existingIds, 'experiences');
};

/**
 * 新しい会社IDを生成する
 * @param existingIds 既存のID配列
 * @returns {string} 新しい会社ID
 */
export const generateNewCompanyId = (existingIds: string[]): string => {
  return generateUniqueId(existingIds, 'companyName');
};
