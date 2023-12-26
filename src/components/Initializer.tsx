import { useState } from 'react'
import toast from 'react-hot-toast'

import { Category, InitializerInfo, Player } from '@/types/types'

import CategoriesInit from './CategoriesInit'
import PlayersInit from './PlayersInit'

function Initializer({
  onSubmit
}: {
  onSubmit: (values: InitializerInfo) => Promise<void>
}) {
  const [initInfo, setInitInfo] = useState<InitializerInfo>({
    players: [],
    customCategories: [],
    category: 'standard',
    numRounds: 1
  })

  const handleNumRoundsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value && isNaN(parseInt(event.target.value))) {
      toast.error('Please enter a valid number')
      return
    }
    setInitInfo({ ...initInfo, numRounds: parseInt(event.target.value) })
  }

  const changePlayers = (players: Player[]) => {
    setInitInfo((initInfo) => ({ ...initInfo, players }))
  }

  const changeCategoryOption = (category: Category) => {
    setInitInfo((initInfo) => ({ ...initInfo, category }))
  }

  const changeCustomCategories = (categories: string[]) => {
    setInitInfo((initInfo) => ({ ...initInfo, customCategories: categories }))
  }

  return (
    <div className="flex w-11/12 animate-fade-up flex-col space-y-5 rounded-md border bg-white px-4 py-2 md:w-3/4">
      <h1 className="mt-6 text-center text-xl font-semibold text-blue-500  md:text-3xl ">
        Get Started
      </h1>

      <div>
        <PlayersInit changePlayers={changePlayers} />
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <div>
          <p className="font-semibold">Number of Rounds:</p>
        </div>
        <div>
          <input
            type="number"
            className=" rounded-md border p-2"
            min={1}
            defaultValue={initInfo.numRounds || 1}
            onChange={handleNumRoundsChange}
          />
        </div>
      </div>

      <div>
        <CategoriesInit
          changeCategoryOption={changeCategoryOption}
          changeCustomCategories={changeCustomCategories}
        />
      </div>

      <div>
        <button
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          onClick={() => onSubmit(initInfo)}
        >
          Start Game
        </button>
      </div>
    </div>
  )
}

export default Initializer
