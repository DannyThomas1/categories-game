export interface InitializerInfo {
  players: Player[]
  customCategories: string[]
  category: Category
  numRounds: number
}

export type Category = 'standard' | 'custom' | 'mix'

export enum GameStatus {
  NotStarted = 'not-started',
  InProgress = 'in-progress',
  Finished = 'finished'
}

export interface Player {
  name: string
  id: string
}
