import { ResumeData } from '../types';

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
 * localStorage に保存してある職務経歴データを取得する
 * @param target 取得職務経歴データのキー名
 * @returns {ResumeData} 職務経歴データ
 */
export const getStoredResumeData = <T extends keyof ResumeData>(target: T): ResumeData[T] => {
  const storedResumeData = localStorage.getItem('resumeData')
  const parsedResumeData = storedResumeData ? JSON.parse(storedResumeData) as ResumeData : initialResumeData
  return parsedResumeData[target]
}