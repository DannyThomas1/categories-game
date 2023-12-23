import { InitializerInfo } from '@/types/types'
import { Player } from '@/types/types'

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

export async function makeTeams(players: Player[]) {
  return new Promise((resolve, reject) => {
    if (players.length < 2) {
      reject('Please enter at least two players')
    }

    const teamOne: Player[] = []
    const teamTwo: Player[] = []
    const teams: Player[][] = [teamOne, teamTwo]
    const shuffledPlayers = players.sort(() => Math.random() - 0.5)
    shuffledPlayers.forEach((player, index) => {
      if (index % 2 === 0) {
        teamOne.push(player)
      } else {
        teamTwo.push(player)
      }
    })
    resolve(teams)
  })
}

export async function makeCategoryList