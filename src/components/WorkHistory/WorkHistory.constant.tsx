import {Role, WorkCompany, WorkExperience} from '../../types';

export const CURRENT = '現在';

export const ROLES: Role[] = [
  'メンバー',
  'サブリーダー',
  'チームリーダー',
  'プロジェクトリーダー',
  'プロジェクトマネージャー'
];

export const INITIAL_WORK_COMPANY: WorkCompany = {
  companyName: '',
  period: { start: '', end: '' },
  experiences: []
}

export const INITIAL_WORK_HISTORY: WorkExperience = {
  period: { start: '', end: '' },
  projectTitle: '',
  projectDescription: '',
  assignments: [],
  achievements: '',
  organization: {
    teamSize: '',
    totalSize: '',
    roles: []
  },
  technicalEnvironment: []
}
