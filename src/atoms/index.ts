import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ResumeData, TechnicalSkill, WorkCompany, CertificationType, SelfPromotionType } from '../types';

/**
 * 初期値の定義
 */
const initialResumeData: ResumeData = {
  name: '',
  summary: '',
  specialties: '',
  technicalSkills: [],
  workHistory: [],
  certifications: [],
  selfPromotion: []
};

/**
 * localStorage連携atom
 * @returns {ResumeData} 職務経歴データ
 */
export const resumeDataAtom = atomWithStorage<ResumeData>('resumeData', initialResumeData);

/**
 * 名前atom
 * @returns {string} 名前
 */
export const nameAtom = atom(
  (get) => get(resumeDataAtom).name,
  (get, set, name: string) => {
    const current = get(resumeDataAtom);
    set(resumeDataAtom, { ...current, name });
  }
);

/**
 * 職務要約atom
 * @returns {string} 職務要約
 */
export const summaryAtom = atom(
  (get) => get(resumeDataAtom).summary,
  (get, set, summary: string) => {
    const current = get(resumeDataAtom);
    set(resumeDataAtom, { ...current, summary });
  }
);

/**
 * 得意分野atom
 * @returns {string} 得意分野
 */
export const specialtiesAtom = atom(
  (get) => get(resumeDataAtom).specialties,
  (get, set, specialties: string) => {
    const current = get(resumeDataAtom);
    set(resumeDataAtom, { ...current, specialties });
  }
);

/**
 * テクニカルスキルatom
 * @returns {TechnicalSkill[]} テクニカルスキル
 */
export const technicalSkillsAtom = atom(
  (get) => get(resumeDataAtom).technicalSkills,
  (get, set, technicalSkills: TechnicalSkill[]) => {
    const current = get(resumeDataAtom);
    set(resumeDataAtom, { ...current, technicalSkills });
  }
);

/**
 * 職務経歴atom
 * @returns {WorkCompany[]} 職務経歴
 */
export const workHistoryAtom = atom(
  (get) => get(resumeDataAtom).workHistory,
  (get, set, workHistory: WorkCompany[]) => {
    const current = get(resumeDataAtom);
    set(resumeDataAtom, { ...current, workHistory });
  }
);

/**
 * 資格atom
 * @returns {CertificationType[]} 資格
 */
export const certificationsAtom = atom(
  (get) => get(resumeDataAtom).certifications,
  (get, set, certifications: CertificationType[]) => {
    const current = get(resumeDataAtom);
    set(resumeDataAtom, { ...current, certifications });
  }
);

/**
 * 自己PRatom
 * @returns {SelfPromotionType[]} 自己PR
 */
export const selfPromotionAtom = atom(
  (get) => get(resumeDataAtom).selfPromotion,
  (get, set, selfPromotion: SelfPromotionType[]) => {
    const current = get(resumeDataAtom);
    set(resumeDataAtom, { ...current, selfPromotion });
  }
);

/**
 * 編集モード用のatom
 * @returns {boolean} 編集モード
 */
export const isEditModeAtom = atom(true);
