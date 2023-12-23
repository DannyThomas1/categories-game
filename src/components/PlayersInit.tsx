import { useEffect, useRef, useState } from 'react'

import { ReactComponent as Add } from '@/assets/icons/add.svg'
import { ReactComponent as Delete } from '@/assets/icons/delete.svg'
import { generateUID } from '@/helpers'
import { Player } from '@/types/types'

function PlayersInit({
  changePlayers
}: {
  changePlayers: (players: Player[]) => void
}) {
  const [players, setPlayers] = useState<Player[]>([
    { name: '', id: generateUID(5) }
  ])
  const inputRefs = useRef<HTMLInputElement[]>([])

  const addPlayer = () => {
    setPlayers([...players, { name: '', id: generateUID(5) }])
  }

  const handlePlayerInputChange = (id: string, value: string) => {
    const updatedList = [...players]
    const index = updatedList.findIndex((player) => player.id === id)
    updatedList[index].name = value
    setPlayers([...updatedList])
  }

  const removePlayer = (id: string) => {
    const updatedList = players.filter((player) => player.id !== id)
    setPlayers([...updatedList])
  }

  useEffect(() => {
    // Focus the last input whenever players are updated
    if (inputRefs.current.length > 0) {
      inputRefs.current[inputRefs.current.length - 1]?.focus()
    }
  }, [players.length])

  useEffect(() => {
    changePlayers(players)
  }, [players])

  return (
    <div>
      <div className="mb-4 flex items-center justify-between border-b-2">
        <div>
          <p className="font-semibold">Players</p>
        </div>
        <div className="flex items-center justify-center">
          <span className="cursor-pointer rounded-lg " onClick={addPlayer}>
            <Add className="h-6 w-6 fill-gray-500 hover:fill-blue-500" />
          </span>
        </div>
      </div>
      <div className="mb-3 flex flex-col space-y-4">
        {players.map((player, index) => (
          <div
            key={index}
            className="flex animate-fade-up items-center justify-between space-x-4"
          >
            <input
              type="text"
              placeholder="Player Name"
              className="w-full rounded-md border p-2"
              value={player.name || ''}
              onChange={(e) => {
                handlePlayerInputChange(player.id, e.currentTarget.value)
              }}
              ref={(el) => (inputRefs.current[index] = el!)}
            />
            <Delete
              className="h-6 w-6 cursor-pointer fill-gray-500 hover:fill-red-500"
              onClick={() => removePlayer(player.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlayersInit
