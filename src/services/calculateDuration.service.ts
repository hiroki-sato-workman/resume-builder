import { PeriodType } from '../types';
import { CURRENT } from '../components/WorkHistory/WorkHistory.constant';

/**
 * 期間を計算する
 * @param period 期間
 * @returns {string} フォーマットした期間
 */
export const calculateDuration = (period: PeriodType): string => {
  // 終了日が `現在` かどうか
  const isEndCurrentDate = period.end === CURRENT
  // 基準の開始日
  const fromDate = new Date(`${period.start}-01`);
  // 基準の終了日
  const toDate = isEndCurrentDate ? new Date() : new Date(`${period.end}-01`);
  // 年月を計算
  const totalMonths = toDate.getMonth() - fromDate.getMonth() + 12 * (toDate.getFullYear() - fromDate.getFullYear());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  // フォーマットした年月
  const formattedYears = years > 0 ? `${years}年` : ''
  const formattedMonth = months > 0 || years === 0 ? `${months}ヶ月` : ''
  // 年月を結合して返却
  return `${formattedYears}${formattedMonth}`;
}