export interface InitializerInfo {
  players: Player[]
  customCategories: string[]
  category: Category
  numRounds: number
}

export type Category = 'standard' | 'custom' | 'mix'

export interface Player {
  name: string
  id: string
}
