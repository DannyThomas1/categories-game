import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { makeCategoryList, makeTeams, valueValidations } from '@/helpers'
import { useGameStore } from '@/stores/gameStore'
import { GameStatus, InitializerInfo } from '@/types/types'

import InfoModal from './InfoModal'
import Initializer from './Initializer'
import Loading from './Loading'
import Player from './Player'
import StatusModal from './StatusModal'

const App = () => {
  const [loading, setLoading] = useState(false)
  const { initStore, currentRound, gameStatus, reset } = useGameStore()
  const [stage, setStage] = useState(currentRound === 0 ? 0 : 1)

  const onSubmit = async (values: InitializerInfo) => {
    const [result, errMsg] = await valueValidations(values)

    if (!result) {
      toast.error(errMsg)
      return
    }

    setLoading(true)
    const teamsPromise = makeTeams(values.players)
    const categoriesPromise = makeCategoryList(
      values.customCategories,
      values.numRounds,
      values.category
    )

    const [teams, categories]: [Player[][], string[]] = await Promise.all([
      teamsPromise,
      categoriesPromise
    ]).then(async (values) => {
      const [teams, categories] = values
      return [teams, categories]
    })

    const gameInfo = {
      teamOne: teams[0],
      teamTwo: teams[1],
      numRounds: values.numRounds,
      categories: categories,
      categoriesCopy: [...categories],
      currentRound: 1,
      gameStatus: GameStatus.InProgress,
      teamOneScore: 0,
      teamTwoScore: 0,
      currentCategory: undefined
    }

    initStore(gameInfo)
    setStage(1)
    setLoading(false)
  }

  const onGameEnd = () => {
    reset()
    setStage(0)
  }

  return (
    <div
      id="app"
      className="flex h-screen w-screen flex-col bg-sky-800 p-4 md:p-10 font-commissioner text-base xl:text-xl"
    >
      <div>
        <Toaster />
      </div>
      <div className="mb-10 flex justify-center items-center">
        <h1 className="text-4xl font-extrabold md:text-6xl">
          <p className="animate-fade-right  tracking-wide text-red-500">
            Categories{' '}
          </p>{' '}
          <p className="animate-fade-left text-right text-white">Game</p>
        </h1>
      </div>

      <div>
        <p className="text-center text-white text-lg xl:text-xl italic tracking-wide">
          A game of wit, creativity, and deception....
        </p>
      </div>
      <div className='flex justify-center items-center space-x-2'>
        <div className='flex w-11/12 animate-fade-up md:w-3/4 justify-end items-center space-x-2 mb-2 '>
          <InfoModal />
          {gameStatus !== GameStatus.NotStarted &&
            <StatusModal gameStatus={gameStatus} onGameEnd={onGameEnd} />
          }
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center ">
          <Loading message="Loading..." size="large" />
        </div>
      ) : stage === 0 ? (
        <div className="flex items-center justify-center">
          <Initializer onSubmit={onSubmit} />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <Player onGameEnd={onGameEnd} />
        </div>
      )}
    </div>
  )
}

export default App
