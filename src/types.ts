/** スキルレベル */
export type SkillLevel =
  | '通常使用に問題なしで、指導も可能'
  | '通常使用に問題なし'
  | '調べながらであれば作業可能'
  | '自己研鑽'
  | '大学で使用';

/** 役割	*/
export type Role = 
  | 'メンバー'
  | 'サブリーダー'
  | 'チームリーダー'
  | 'プロジェクトリーダー'
  | 'プロジェクトマネージャー';

/** 経験年数	*/
export type ExperienceYears = '半年' | '1年' | '2年' | '3年' | '4年' | '5年' | '6年' | '7年' | '8年' | '9年' | '10年以上';

/** テクニカルスキル */
export interface TechnicalSkill {
  /** カテゴリ */
  category: string;
  /** 種別 */
  type: string;
  /** その他種別 */
  otherType?: string;
  /** 経験年数 */
  years: ExperienceYears;
  /** スキルレベル */
  level: SkillLevel | '';
}

/** 期間 */
export interface PeriodType {
  /** 期間（開始） */
  start: string;
  /** 期間（終了） */
  end: string;
}

/** 職歴（プロジェクト） */
export interface WorkExperience {
  /** プロジェクト期間 */
  period: PeriodType
  /** 業務内容 */
  businessDetails: {
    /** プロジェクト名 */
    projectTitle: string;
    /** プロジェクト概要 */
    projectDescription: string;
    /** 担当業務 */
    assignments: string[];
    /** 実績・取り組み */
    achievements: string;
  }
  /** 環境・言語 */
  technicalEnvironment: {
    /** OS */
    os: string[];
    /** 言語 */
    language: string[];
    /** データベース */
    db: string[];
    /** その他 */
    others: string[];
  };
  /** 組織情報 */ 
  organization: {
    /** チーム人数 */
    teamSize: string;
    /** 全体人数 */
    totalSize: string;
    /** 役割 */
    roles: Role[];
  };
}

/** 経験のマップ型 */
export type WorkExperienceMap = Record<string, WorkExperience>;

/** 職歴（会社） */
export interface WorkCompany {
  /** 会社名 */
  companyName: string;
  /** 勤務期間 */
  period: PeriodType
  /** 業務内容 */
  experiences: WorkExperienceMap;
}

/** 会社のマップ型 */
export type WorkCompanyMap = Record<string, WorkCompany>;

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
  /** 資格名称 */
  name: string;
  /** 取得年月 */
  date: string;
}

/** 職務経歴 */
export interface ResumeData {
  /** 名前 */
  name: string;
  /** 職務要約 */
  summary: SummaryType;
  /** 得意分野 */
  specialties: SpecialtiesType;
  /** テクニカルスキル */
  technicalSkills: TechnicalSkill[];
  /** 職務経歴 */
  workHistory: WorkCompanyMap;
  /** 資格 */
  certifications: CertificationType[];
  /** 自己PR */
  selfPromotion: SelfPromotionType[];
}
