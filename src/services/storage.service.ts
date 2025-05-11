import { ResumeData } from '../types';
import { INITIAL_WORK_HISTORY_MAP } from '../components/WorkHistory/WorkHistory.constant';

const initialResumeData: ResumeData = {
  name: '',
  summary: '',
  specialties: '',
  technicalSkills: [],
  workHistory: INITIAL_WORK_HISTORY_MAP,
  certifications: [],
  selfPromotion: []
};

const LOCAL_STORAGE_KEY = 'resumeData'

/**
 * localStorage に保存してある職務経歴データを取得する
 * @returns {ResumeData} 職務経歴データ
 */
const getStoredResumeData = (): ResumeData => {
  const storedResumeData = localStorage.getItem(LOCAL_STORAGE_KEY)
  return storedResumeData ? JSON.parse(storedResumeData) as ResumeData : initialResumeData
}

/**
 * localStorage に保存してある指定の職務経歴データを取得する
 * @param target 取得する職務経歴データのキー名
 * @returns {ResumeData[target]} 職務経歴データ
 */
export const getSpecifiedStoredResumeData = <T extends keyof ResumeData>(target: T): ResumeData[T] => {
  const storedResumeData = getStoredResumeData()
  return storedResumeData[target]
}

/**
 * localStorage に保存してある職務経歴データを取得する
 * @param target 更新する職務経歴データのキー名
 * @param updateData 更新する職務経歴データ
 */
export const saveStoredResumeData = <T extends keyof ResumeData>(target: keyof ResumeData, updateData: ResumeData[T]) => {
  const storedResumeData = getStoredResumeData()

  const updatedResumeData: ResumeData = {
    ...storedResumeData,
    [target]: updateData
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedResumeData))
}
