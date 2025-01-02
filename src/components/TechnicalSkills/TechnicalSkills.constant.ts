export const CATEGORIES = {
  '担当業務': [
    '要件定義',
    '基本設計',
    '詳細設計',
    '実装',
    'テスト',
    '保守運用'
  ],
  'OS': [
    'Windows',
    'Linux',
    'Unix',
    'MacOS',
    'CentOS',
    'iOS',
    'Android'
  ],
  '言語': [],
  'フレームワーク': [],
  'DB': [
    'MySQL',
    'Oracle',
    'SQL Server',
    'PostgreSQL',
    'DB2',
    'SQLite',
    'Leaflet',
    'QGIS',
    'DynamoDB',
    'その他'
  ],
  'その他ネットワーク、クラウド等': []
} as const

export const EXPERIENCE_YEARS = [
  '半年',
  '1年', '2年', '3年', '4年', '5年',
  '6年', '7年', '8年', '9年', '10年以上'
] as const

export const SKILL_LEVELS = [
  '通常使用に問題なしで、指導も可能',
  '通常使用に問題なし',
  '調べながらであれば作業可能',
  '自己研鑽',
  '大学で使用'
] as const