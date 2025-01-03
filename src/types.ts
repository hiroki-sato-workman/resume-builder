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

/** テクニカルスキル */
export interface TechnicalSkill {
  category: string;
  type: string;
  years: ExperienceYears;
  level: SkillLevel | '';
  otherType?: string;
  remarks?: string;
}

/** 職歴（プロジェクト） */
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

/** 職歴（会社） */
export interface WorkCompany {
  companyName: string;
  period: {
    start: string;
    end: string;
  };
  capital: number;
  employees: number;
  experiences: WorkExperience[];
}

/** 自己PR */
export interface SelfPromotionType {
  title: string;
  content: string;
}

/** 得意分野 */
export type SpecialtiesType = string

/** 職務要約 */
export type SummaryType = string

/** 資格 */
export interface CertificationType {
  name: string;
  date: string;
}

export interface ResumeData {
  name: string;
  summary: SummaryType;
  specialties: SpecialtiesType;
  technicalSkills: TechnicalSkill[];
  workHistory: WorkCompany[];
  certifications: CertificationType[];
  selfPromotion: SelfPromotionType[];
}
