import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { PeriodType, Role, WorkExperience, WorkExperienceMap } from '../types';
import { workHistoryAtom } from './index';
import { INITIAL_WORK_COMPANY, INITIAL_WORK_HISTORY } from '../components/WorkHistory/WorkHistory.constant';
import { createNewExperience, generateNewExperienceId } from '../shared/utils';

/**
 * 会社情報のベースアトム
 * @returns {WorkCompany} 会社情報
 */
export const companyAtomFamily = atomFamily((companyId: string) => 
  atom(
    (get) => {
      const workHistory = get(workHistoryAtom);
      return workHistory[companyId] || INITIAL_WORK_COMPANY;
    }
  )
);

/**
 * 会社名のアトム
 * @returns {string} 会社名
 */
export const companyNameAtomFamily = atomFamily((companyId: string) => 
  atom(
    (get) => {
      const company = get(companyAtomFamily(companyId));
      return company.companyName;
    },
    (get, set, newName: string) => {
      const company = get(companyAtomFamily(companyId));
      const workHistory = get(workHistoryAtom);
      
      const updatedCompany = {
        ...company,
        companyName: newName
      };
      
      set(workHistoryAtom, {
        ...workHistory,
        [companyId]: updatedCompany
      });
    }
  )
);

/**
 * 会社の期間のアトム
 * @returns {PeriodType} 期間
 */
export const companyPeriodAtomFamily = atomFamily((companyId: string) => 
  atom(
    (get) => {
      const company = get(companyAtomFamily(companyId));
      return company.period;
    },
    (get, set, newPeriod: PeriodType) => {
      const company = get(companyAtomFamily(companyId));
      const workHistory = get(workHistoryAtom);
      
      const updatedCompany = {
        ...company,
        period: newPeriod
      };
      
      set(workHistoryAtom, {
        ...workHistory,
        [companyId]: updatedCompany
      });
    }
  )
);

/**
 * 会社の経験リストのアトム
 * @returns {WorkExperienceMap} 経験リスト
 */
export const companyExperiencesAtomFamily = atomFamily((companyId: string) => 
  atom(
    (get) => {
      const company = get(companyAtomFamily(companyId));
      return company.experiences;
    },
    (get, set, newExperiences: WorkExperienceMap) => {
      const company = get(companyAtomFamily(companyId));
      const workHistory = get(workHistoryAtom);
      
      const updatedCompany = {
        ...company,
        experiences: newExperiences
      };
      
      set(workHistoryAtom, {
        ...workHistory,
        [companyId]: updatedCompany
      });
    }
  )
);

/**
 * 経験情報のベースアトム
 * @returns {WorkExperience} 経験情報
 */
export const experienceAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const company = get(companyAtomFamily(companyId));
        return company.experiences[expId] || INITIAL_WORK_HISTORY;
      }
    )
);

/**
 * 経験の期間のアトム
 * @returns {PeriodType} 期間
 */
export const experiencePeriodAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.period;
      },
      (get, set, newPeriod: PeriodType) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            period: newPeriod
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * プロジェクト名のアトム
 * @returns {string} プロジェクト名
 */
export const projectTitleAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.businessDetails.projectTitle;
      },
      (get, set, newTitle: string) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            businessDetails: {
              ...experience.businessDetails,
              projectTitle: newTitle
            }
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * プロジェクト概要のアトム
 * @returns {string} プロジェクト概要
 */
export const projectDescriptionAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.businessDetails.projectDescription;
      },
      (get, set, newDescription: string) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            businessDetails: {
              ...experience.businessDetails,
              projectDescription: newDescription
            }
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * 担当業務のアトム
 * @returns {string[]} 担当業務
 */
export const assignmentsAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.businessDetails.assignments;
      },
      (get, set, newAssignments: string[]) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            businessDetails: {
              ...experience.businessDetails,
              assignments: newAssignments
            }
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * 実績・取り組みのアトム
 * @returns {string} 実績・取り組み
 */
export const achievementsAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.businessDetails.achievements;
      },
      (get, set, newAchievements: string) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            businessDetails: {
              ...experience.businessDetails,
              achievements: newAchievements
            }
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * OSのアトム
 * @returns {string[]} OS
 */
export const osAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.technicalEnvironment.os;
      },
      (get, set, newOs: string[]) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            technicalEnvironment: {
              ...experience.technicalEnvironment,
              os: newOs
            }
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * 言語のアトム
 * @returns {string[]} 言語
 */
export const languageAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.technicalEnvironment.language;
      },
      (get, set, newLanguage: string[]) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            technicalEnvironment: {
              ...experience.technicalEnvironment,
              language: newLanguage
            }
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * データベースのアトム
 * @returns {string[]} データベース
 */
export const dbAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.technicalEnvironment.db;
      },
      (get, set, newDb: string[]) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            technicalEnvironment: {
              ...experience.technicalEnvironment,
              db: newDb
            }
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * その他のアトム
 * @returns {string[]} その他
 */
export const othersAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.technicalEnvironment.others;
      },
      (get, set, newOthers: string[]) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            technicalEnvironment: {
              ...experience.technicalEnvironment,
              others: newOthers
            }
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * チーム人数のアトム
 * @returns {string} チーム人数
 */
export const teamSizeAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.organization.teamSize;
      },
      (get, set, newTeamSize: string) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            organization: {
              ...experience.organization,
              teamSize: newTeamSize
            }
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * 全体人数のアトム
 * @returns {string} 全体人数
 */
export const totalSizeAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.organization.totalSize;
      },
      (get, set, newTotalSize: string) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            organization: {
              ...experience.organization,
              totalSize: newTotalSize
            }
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * 役割のアトム
 * @returns {Role[]} 役割
 */
export const rolesAtomFamily = atomFamily(
  ({ companyId, expId }: { companyId: string; expId: string }) => 
    atom(
      (get) => {
        const experience = get(experienceAtomFamily({ companyId, expId }));
        return experience.organization.roles;
      },
      (get, set, newRoles: Role[]) => {
        const company = get(companyAtomFamily(companyId));
        const experience = company.experiences[expId];
        
        if (experience) {
          const updatedExperience = {
            ...experience,
            organization: {
              ...experience.organization,
              roles: newRoles
            }
          };
          
          const updatedExperiences = {
            ...company.experiences,
            [expId]: updatedExperience
          };
          
          set(companyExperiencesAtomFamily(companyId), updatedExperiences);
        }
      }
    )
);

/**
 * 新しい経験を追加するためのユーティリティ関数
 * @param companyId 会社ID
 * @returns {string} 新しい経験のID
 */
export const addExperienceToCompany = (companyId: string) => {
  return atom(null, (get, set) => {
    const company = get(companyAtomFamily(companyId));
    const existingIds = Object.keys(company.experiences);
    
    // 新しい経験IDを生成
    const newExpId = generateNewExperienceId(existingIds);
    
    // 新しい経験を作成
    const newExperience = createNewExperience({}, existingIds);
    
    // 経験を追加
    const updatedExperiences = {
      ...company.experiences,
      [newExpId]: newExperience
    };
    
    set(companyExperiencesAtomFamily(companyId), updatedExperiences);
    
    return newExpId;
  });
};

/**
 * 経験を削除するためのユーティリティ関数
 * @param companyId 会社ID
 * @param expId 経験ID
 */
export const removeExperienceFromCompany = (companyId: string, expId: string) => {
  return atom(null, (get, set) => {
    const company = get(companyAtomFamily(companyId));
    
    // 経験を削除
    const { [expId]: _, ...remainingExperiences } = company.experiences;
    
    set(companyExperiencesAtomFamily(companyId), remainingExperiences);
  });
};

/**
 * フィールドアトムを取得するためのユーティリティ関数
 * @param param0 フィールド情報
 * @returns フィールドに対応するアトム
 */
export const useFieldAtom = ({ 
  companyId, 
  expId, 
  mainCategories, 
  subCategories 
}: { 
  companyId: string; 
  expId: string; 
  mainCategories: keyof WorkExperience; 
  subCategories: string;
}) => {
  // mainCategoriesに応じて適切なアトムを返す
  if (mainCategories === 'businessDetails') {
    if (subCategories === 'projectTitle') {
      return projectTitleAtomFamily({ companyId, expId });
    } else if (subCategories === 'projectDescription') {
      return projectDescriptionAtomFamily({ companyId, expId });
    } else if (subCategories === 'assignments') {
      return assignmentsAtomFamily({ companyId, expId });
    } else if (subCategories === 'achievements') {
      return achievementsAtomFamily({ companyId, expId });
    }
  } else if (mainCategories === 'technicalEnvironment') {
    if (subCategories === 'os') {
      return osAtomFamily({ companyId, expId });
    } else if (subCategories === 'language') {
      return languageAtomFamily({ companyId, expId });
    } else if (subCategories === 'db') {
      return dbAtomFamily({ companyId, expId });
    } else if (subCategories === 'others') {
      return othersAtomFamily({ companyId, expId });
    }
  } else if (mainCategories === 'organization') {
    if (subCategories === 'teamSize') {
      return teamSizeAtomFamily({ companyId, expId });
    } else if (subCategories === 'totalSize') {
      return totalSizeAtomFamily({ companyId, expId });
    } else if (subCategories === 'roles') {
      return rolesAtomFamily({ companyId, expId });
    }
  } else if (mainCategories === 'period') {
    return experiencePeriodAtomFamily({ companyId, expId });
  }
  
  // デフォルトではexperienceAtomを返す
  return experienceAtomFamily({ companyId, expId });
};
