import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { ResumeData, TechnicalSkill, WorkCompanyMap, CertificationType, SelfPromotionType } from '../types';
import { INITIAL_WORK_HISTORY_MAP } from '../components/WorkHistory/WorkHistory.constant';
import { addHistoryEntryAtom, undoAtom, redoAtom } from './historyAtoms';

/**
 * 初期値の定義
 */
const initialResumeData: ResumeData = {
  name: '',
  summary: '',
  specialties: '',
  technicalSkills: [],
  workHistory: INITIAL_WORK_HISTORY_MAP,
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
    const newData = { ...current, name };
    set(resumeDataAtom, newData);
    // 履歴に追加
    set(addHistoryEntryAtom, { data: newData, description: '名前を変更' });
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
    const newData = { ...current, summary };
    set(resumeDataAtom, newData);
    // 履歴に追加
    set(addHistoryEntryAtom, { data: newData, description: '職務要約を変更' });
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
    const newData = { ...current, specialties };
    set(resumeDataAtom, newData);
    // 履歴に追加
    set(addHistoryEntryAtom, { data: newData, description: '得意分野を変更' });
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
    const newData = { ...current, technicalSkills };
    set(resumeDataAtom, newData);
    // 履歴に追加
    set(addHistoryEntryAtom, { data: newData, description: 'テクニカルスキルを変更' });
  }
);

/**
 * 職務経歴atom
 * @returns {WorkCompanyMap} 職務経歴
 */
export const workHistoryAtom = atom(
  (get) => get(resumeDataAtom).workHistory,
  (get, set, workHistory: WorkCompanyMap) => {
    const current = get(resumeDataAtom);
    const newData = { ...current, workHistory };
    set(resumeDataAtom, newData);
    // 履歴に追加
    set(addHistoryEntryAtom, { data: newData, description: '職務経歴を変更' });
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
    const newData = { ...current, certifications };
    set(resumeDataAtom, newData);
    // 履歴に追加
    set(addHistoryEntryAtom, { data: newData, description: '資格を変更' });
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
    const newData = { ...current, selfPromotion };
    set(resumeDataAtom, newData);
    // 履歴に追加
    set(addHistoryEntryAtom, { data: newData, description: '自己PRを変更' });
  }
);

/**
 * 編集モード用のatom
 * @returns {boolean} 編集モード
 */
export const isEditModeAtom = atom(true);

/**
 * 履歴から復元してメインデータを更新するatom
 * @param data 復元するデータ
 */
export const restoreResumeDataAtom = atom(
  null,
  (get, set, data: ResumeData) => {
    set(resumeDataAtom, data);
  }
);

/**
 * Undoアクション（もとに戻す）
 * @returns {boolean} Undo成功したかどうか
 */
export const performUndoAtom = atom(
  null,
  (get, set): boolean => {
    const restoredData = set(undoAtom);
    if (restoredData) {
      set(restoreResumeDataAtom, restoredData);
      return true;
    }
    return false;
  }
);

/**
 * Redoアクション（やり直し）
 * @returns {boolean} Redo成功したかどうか
 */
export const performRedoAtom = atom(
  null,
  (get, set): boolean => {
    const restoredData = set(redoAtom);
    if (restoredData) {
      set(restoreResumeDataAtom, restoredData);
      return true;
    }
    return false;
  }
);

// 履歴機能のatomを再エクスポート
export { canUndoAtom, canRedoAtom, historyStatsAtom } from './historyAtoms';
