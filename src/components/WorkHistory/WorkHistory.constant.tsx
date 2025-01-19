import {Role, WorkCompany, WorkExperience} from '../../types';



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
  businessDetails: {
    projectTitle: '',
    projectDescription: '',
    assignments: [],
    achievements: '',
  },
  technicalEnvironment: {
    os: [],
    language: [],
    db: [],
    others: [],
  },
  organization: {
    teamSize: '',
    totalSize: '',
    roles: []
  },
}
