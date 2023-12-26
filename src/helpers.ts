import { Category, InitializerInfo } from '@/types/types'
import { Player } from '@/types/types'

import { CATEGORIES } from './constants'

export function generateUID(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}

export async function valueValidations(
  values: InitializerInfo
): Promise<[boolean, string]> {
  //Players check
  if (values.players.length < 2) {
    return [false, 'Please enter at least two players']
  }
  if (values.players.find((player) => player.name === '')) {
    return [false, 'Please enter a name for each player']
  }

  //Category check
  if (
    values.customCategories.length < values.numRounds &&
    values.category === 'custom'
  ) {
    return [false, 'Please enter enough custom categories for each round']
  }

  if (values.customCategories.includes('')) {
    return [false, 'Please enter a name for each custom category']
  }

  //Num rounds check
  if (values.numRounds < 1 || isNaN(values.numRounds)) {
    return [false, 'Please enter a valid number of rounds']
  }

  return [true, '']
}

export async function makeTeams(players: Player[]): Promise<Player[][]> {
  return new Promise((resolve, reject) => {
    if (players.length < 2) {
      reject('Please enter at least two players')
    }

    const playersCopy = [...players]

    const teamOne: Player[] = []
    const teamTwo: Player[] = []
    const shuffledPlayers = playersCopy.sort(() => Math.random() - 0.5)
    shuffledPlayers.forEach((player, index) => {
      if (index % 2 === 0) {
        teamOne.push(player)
      } else {
        teamTwo.push(player)
      }
    })
    const teams: Player[][] = [teamOne, teamTwo]
    resolve(teams)
  })
}

export async function makeCategoryList(
  categories: string[],
  numRounds: number,
  categoryType: Category
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    if (categories.length < numRounds && categoryType === 'custom') {
      reject('Please enter enough categories for each round')
    }

    const customCategories = categories
      .filter((category) => category !== '')
      .sort(() => Math.random() - 0.5)

    //If standard, just return the standard categories
    if (categoryType === 'standard') {
      const shuffledCategories = CATEGORIES.sort(() => Math.random() - 0.5)
      resolve(shuffledCategories.slice(0, numRounds))
    } else if (categoryType === 'custom') {
      resolve(customCategories.slice(0, numRounds))
    } else {
      const numStandardCategories = numRounds - categories.length
      if (numStandardCategories < 0) {
        resolve(customCategories.slice(0, numRounds))
      } else if (numStandardCategories === 0) {
        resolve(customCategories)
      } else {
        const shuffledStandardCategories = CATEGORIES.sort(
          () => Math.random() - 0.5
        )
        const shuffledCategories = [
          ...customCategories,
          ...shuffledStandardCategories.slice(0, numStandardCategories)
        ].sort(() => Math.random() - 0.5)
        resolve(shuffledCategories)
      }
    }
  })
}

export async function initLocalStorage(
  teamOne: Player[],
  teamTwo: Player[],
  categories: string[],
  numRounds: number
): Promise<[boolean, string]> {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(
        'gameInfo',
        JSON.stringify({ teamOne, teamTwo, categories, numRounds })
      )
      resolve([true, ''])
    } catch (error) {
      reject([false, error])
    }
  })
}
