import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { ReactComponent as NextRound } from '@/assets/icons/arrow_forward.svg'
import { useGameStore } from '@/stores/gameStore'
import { GameStatus, Player } from '@/types/types'

import Timer from './Timer'

const PlayerList = ({ players }: { players: Player[] }) => {
  return (
    <ul className="px-6">
      {players.map((player: Player) => (
        <li className="list-disc" key={player.id}>
          {player.name}
        </li>
      ))}
    </ul>
  )
}

const Round = () => {
  const { currentRound, numRounds } = useGameStore()
  return (
    <div>
      <h1 className="text-center text-xl font-bold text-white md:text-2xl">
        {currentRound > numRounds ? 'Game Over' :
          `Round ${currentRound} of ${numRounds}`
        }
      </h1>
    </div>
  )
}

const Team = ({
  team,
  name,
  score,
  updateTeamScore,
  gameStatus
}: {
  team: Player[]
  name: string
  score: number
  updateTeamScore: (action: 'add' | 'subtract') => void
  gameStatus: string | boolean
}) => {
  return (
    <div className="flex w-full flex-col items-center space-y-2 rounded-md border border-gray-500 p-4">
      <h1 className="text-lg font-bold underline md:text-2xl">{name}</h1>
      <div className="grow">
        <PlayerList players={team} />
      </div>
      <div className="relative bottom-0 left-0 w-full">
        <h2 className=" text-center text-lg font-bold underline md:text-2xl">
          Score
        </h2>
        <div className="mt-3 w-full flex-wrap items-center justify-center text-center md:grid md:grid-cols-3 ">
          <div className="flex items-center justify-center md:justify-self-end">
            <button
              className="flex h-fit w-fit items-center justify-center rounded-md bg-red-600 px-3 py-1 text-xl font-bold md:h-8 md:w-14"
              onClick={() => updateTeamScore('subtract')}
              disabled={gameStatus !== false}
            >
              -
            </button>
          </div>
          <p className="text-lg  md:text-3xl">{score}</p>
          <div className="flex items-center justify-center md:justify-self-start">
            <button
              className="flex h-fit w-fit items-center justify-center rounded-md bg-green-600 px-3 py-1 text-xl font-bold md:h-8 md:w-14"
              onClick={() => updateTeamScore('add')}
              disabled={gameStatus !== false}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Player({ onGameEnd }: { onGameEnd: () => void }) {
  const {
    teamOne,
    teamTwo,
    getCategory,
    teamOneScore,
    teamTwoScore,
    updateTeamOneScore,
    updateTeamTwoScore,
    updateCurrentRound,
    currentRound,
    numRounds,
    currentCategory: chosenCategory,
    changeGameStatus
  } = useGameStore()
  const [currentCategory, setCurrentCategory] = useState('')
  const [timerID, setTimerID] = useState(0)

  const chooseCategory = useCallback(() => {
    const category = getCategory()
    if (category === undefined) {
      return false
    }
    return true
  }, [getCategory])

  const nextRound = (currentRound: number, numRounds: number) => {
    if (currentRound > numRounds) {
      return
    }

    const categoryResult = chooseCategory()
    if (!categoryResult && currentRound < numRounds) {
      toast.error('No more categories left')
    }

    updateCurrentRound()
    setTimerID(prev => (prev + 1))
  }

  useEffect(() => {
    if (chosenCategory == undefined) {
      chooseCategory()
    } else {
      setCurrentCategory(chosenCategory)
    }
  }, [chooseCategory, chosenCategory])

  const gameStatus = useMemo(() => {
    if (currentRound > numRounds) {
      changeGameStatus(GameStatus.Finished)
      if (teamOneScore > teamTwoScore) {
        return 'Team 1 wins!'
      } else if (teamOneScore < teamTwoScore) {
        return 'Team 2 wins!'
      } else {
        return 'Tie Game!'
      }
    } else {
      return false
    }

  }, [teamOneScore, teamTwoScore, currentRound, numRounds, changeGameStatus])


  const startTimer = () => {
    const time = new Date()
    time.setSeconds(time.getSeconds() + 30)
    return time
  }

  if (teamOne.length === 0 || teamTwo.length === 0) {
    return (
      <div className="flex w-fit animate-fade-up flex-col space-y-5 rounded-md border bg-white px-4 py-2 md:w-3/4">
        <h1>Something went wrong</h1>
      </div>
    )
  }

  return (
    <div className="flex h-full w-11/12 grow flex-col items-center justify-between md:w-3/4">
      {gameStatus == false ?
        <div className="flex w-11/12 grow animate-fade-up flex-col items-center  space-y-5 rounded-md border bg-white p-4 md:w-3/4">
          <div className="flex w-full grow flex-col items-center justify-start space-y-3">
            <div className="flex w-full items-center justify-end">
              <button
                className="flex items-center justify-center space-x-2 rounded-md bg-sky-500 p-2 text-white hover:bg-sky-400"
                onClick={() => nextRound(currentRound, numRounds)}
              >
                <p>Next Round</p>
                <NextRound className="h-5 w-5 fill-white" />
              </button>
            </div>
            <div className="flex grow items-center justify-center">
              <h1 className="text-center text-4xl font-bold md:text-6xl">
                {currentCategory}
              </h1>
            </div>
            <div>
              <Timer key={timerID} expiryTimestamp={(() => startTimer())()} />
            </div>
          </div>
        </div>
        :
        <div className="flex w-11/12 grow animate-fade flex-col items-center justify-center  space-y-5 rounded-md border bg-white p-4 md:w-3/4">
          <p className='text-center text-4xl font-bold md:text-6xl'>{gameStatus}</p>

          <button className='bg-red-600 px-3 py-1 text-white rounded-md hover:bg-red-700 text-lg' onClick={onGameEnd}>End Game</button>
        </div>
      }
      <div className="flex w-11/12 animate-fade-up flex-col space-y-3 rounded-md border border-slate-800 bg-slate-800 p-4 md:w-3/4">
        <Round />
        <header className="gap-5 p-4 text-white md:grid md:grid-cols-2">
          <Team
            team={teamOne}
            name="Team 1"
            score={teamOneScore}
            updateTeamScore={updateTeamOneScore}
            gameStatus={gameStatus}
          />
          <Team
            team={teamTwo}
            name="Team 2"
            score={teamTwoScore}
            updateTeamScore={updateTeamTwoScore}
            gameStatus={gameStatus}

          />
        </header>
      </div>
    </div>
  )
}

export default Player
