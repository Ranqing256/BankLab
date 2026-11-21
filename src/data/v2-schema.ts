export type SourceType = 'textbook' | 'scaffold' | 'system_variant' | 'system_extension'
export type MasteryState = 'untested' | 'basic' | 'error_prone' | 'proficient'
export type QuestionType = 'definition' | 'single_choice' | 'multiple_choice' | 'true_false' | 'short_answer' | 'calculation' | 'essay' | 'case'

export type ChapterModule = { id: string; title: string; page: number; sourceType?: SourceType }

export type ChapterCatalog = {
  id: string
  number: number
  title: string
  startPage: number
  sourceType: SourceType
  modules: ChapterModule[]
}

export type KnowledgePoint = {
  id: string
  moduleId: string
  title: string
  definition?: string
  explanation?: string
  keywords?: string[]
  formulaIds?: string[]
  conditions?: string[]
  confusionPairs?: string[]
  relatedPointIds?: string[]
  textbookQuestionIds?: string[]
  sourceType: SourceType
  sourcePages: string
  verificationStatus: 'verified' | 'needs_manual_check'
}

export type FormulaRecord = {
  id: string
  expression: string
  variables: Array<{ symbol: string; meaning: string; unit: string }>
  conditions: string[]
  chapterId: string
  sourcePages: string
  sourceType: SourceType
}

export type TextbookQuestion = {
  id: string
  chapterId: string
  text: string
  questionType: QuestionType
  sourcePages: string
  sourceType: 'textbook'
  verificationStatus: 'verified' | 'needs_manual_check'
}

export type PracticeQuestion = {
  id: string
  knowledgePointIds: string[]
  questionType: QuestionType
  prompt: string
  sourceType: 'system_variant' | 'system_extension' | 'scaffold'
  referenceAnswer?: string
  rubric?: string[]
  commonErrors?: string[]
}

export type SimulatorRecord = {
  id: string
  title: string
  chapterId: string
  knowledgePointIds: string[]
  formulaIds: string[]
  route: string
  sourceType: SourceType
}

export type WeaknessRecord = {
  knowledgePointId: string
  errorType: 'memory' | 'understanding' | 'confusion' | 'formula_choice' | 'calculation_basis' | 'calculation_process' | 'logic' | 'application'
  count: number
  lastSeen: string
}

export type LearningRecord = {
  questionId: string
  knowledgePointIds: string[]
  correct?: boolean
  errorTypes: WeaknessRecord['errorType'][]
  completedAt: string
}

