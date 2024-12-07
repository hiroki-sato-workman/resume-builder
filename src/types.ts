export type SkillLevel = 
  | '通常使用に問題なしで、指導も可能'
  | '通常使用に問題なし'
  | '調べながらであれば作業可能'
  | '自己研鑽'
  | '大学で使用';

export type Role = 
  | 'メンバー'
  | 'サブリーダー'
  | 'チームリーダー'
  | 'プロジェクトリーダー'
  | 'プロジェクトマネージャー';

export type ExperienceYears = '半年' | '1年' | '2年' | '3年' | '4年' | '5年' | '6年' | '7年' | '8年' | '9年' | '10年以上';

export interface TechnicalSkill {
  category: string;
  type: string;
  years: ExperienceYears;
  level: SkillLevel;
  remarks?: string;
}

export interface WorkExperience {
  period: {
    start: string;
    end: string;
  };
  projectContent: string[];
  assignments: string[];
  organization: {
    teamSize: string;
    totalSize: string;
    roles: Role[];
  };
  technicalEnvironment: string[];
}

export interface ResumeData {
  name: string;
  summary: string;
  specialties: string;
  technicalSkills: TechnicalSkill[];
  workHistory: {
    companyName: string;
    period: {
      start: string;
      end: string;
    };
    capital: number;
    employees: number;
    experiences: WorkExperience[];
  }[];
  certifications: {
    name: string;
    date: string;
  }[];
  selfPromotion: string;
}
