import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { GameStatus, Player } from '@/types/types'

type State = {
  teamOne: Player[]
  teamTwo: Player[]
  teamOneScore: number
  teamTwoScore: number
  categories: string[]
  categoriesCopy: string[]
  numRounds: number
  currentRound: number
  gameStatus: GameStatus
  currentCategory: string | undefined
}

type Action = {
  initStore: (props: State) => void
  reset: () => void
  updateTeamOne: (teamOne: State['teamOne']) => void
  updateTeamTwo: (teamTwo: State['teamTwo']) => void
  updateTeamOneScore: (action: 'add' | 'subtract') => void
  updateTeamTwoScore: (action: 'add' | 'subtract') => void
  updateCategories: (categories: State['categories']) => void
  updateNumRounds: (numRounds: State['numRounds']) => void
  updateCurrentRound: () => void
  getCategory: () => string | undefined
  changeGameStatus: (status: GameStatus) => void
  // doTieBreaker: () => void
}

// define the initial state
const initialState: State = {
  teamOne: [],
  teamTwo: [],
  teamOneScore: 0,
  teamTwoScore: 0,
  categories: [],
  categoriesCopy: [],
  numRounds: 0,
  currentRound: 0,
  currentCategory: undefined,
  gameStatus: GameStatus.NotStarted
}

// Create your store, which includes both state and (optionally) actions
export const useGameStore = create<State & Action>()(
  persist(
    (set, get) => ({
      teamOne: [],
      teamTwo: [],
      teamOneScore: 0,
      teamTwoScore: 0,
      categories: [],
      categoriesCopy: [],
      numRounds: 0,
      currentRound: 0,
      currentCategory: undefined,
      gameStatus: GameStatus.NotStarted,
      initStore: (props) => set(() => props),
      reset: () => set(initialState),
      updateTeamOne: (teamOne) => set(() => ({ teamOne: teamOne })),
      updateTeamTwo: (teamTwo) => set(() => ({ teamTwo: teamTwo })),
      updateTeamOneScore: (action) =>
        set(() =>
          action === 'add'
            ? { teamOneScore: get().teamOneScore + 1 }
            : { teamOneScore: get().teamOneScore - 1 }
        ),
      updateTeamTwoScore: (action) =>
        set(() =>
          action === 'add'
            ? { teamTwoScore: get().teamTwoScore + 1 }
            : { teamTwoScore: get().teamTwoScore - 1 }
        ),
      updateCategories: (categories) => set(() => ({ categories: categories })),
      updateNumRounds: (numRounds) => set(() => ({ numRounds: numRounds })),
      updateCurrentRound: () =>
        set(() => ({ currentRound: get().currentRound + 1 })),
      getCategory: () => {
        const { categoriesCopy } = get()

        // Ensure there are categories available
        if (categoriesCopy.length === 0) {
          return undefined
        }

        // Get a random index
        const randomIndex = Math.floor(Math.random() * categoriesCopy.length)

        // Get the category at the random index
        const selectedCategory = categoriesCopy[randomIndex]

        // Remove the selected category from the array
        const updatedCategories = [...categoriesCopy]
        updatedCategories.splice(randomIndex, 1)

        // Update the categories in the store
        set({ categoriesCopy: updatedCategories })
        set({ currentCategory: selectedCategory })

        // Return the selected category
        return selectedCategory
      },
      changeGameStatus: (status) => set(() => ({ gameStatus: status }))
      // doTieBreaker: () => {
      //   const categories = get().getCategory()
      //   if (categories === undefined) return
      //   const randomCateogry =
      //     categories[Math.floor(Math.random() * categories.length)]
      //   set({ currentCategory: randomCateogry })
      // }
    }),
    {
      name: 'game-storage'
    }
  )
)
