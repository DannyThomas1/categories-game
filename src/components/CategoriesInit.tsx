import React, { useEffect, useRef, useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { ReactComponent as Add } from '@/assets/icons/add.svg'
import { ReactComponent as Delete } from '@/assets/icons/delete.svg'
import { generateUID } from '@/helpers'
import { Category } from '@/types/types'

type CategoryOption = {
  name: string
  id: string
}

function CategoriesInit({
  changeCategoryOption,
  changeCustomCategories
}: {
  changeCategoryOption: (category: Category) => void
  changeCustomCategories: (categories: string[]) => void
}) {
  const [selectedOption, setSelectedOption] = useState<
    'standard' | 'custom' | 'mix'
  >('standard')
  const [customCategories, setCustomCategories] = useState<CategoryOption[]>([])

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (event.target.value === 'custom' || event.target.value === 'mix') &&
      customCategories.length === 0
    ) {
      setCustomCategories([{ name: '', id: generateUID(5) }])
    } else if (event.target.value === 'standard') {
      setCustomCategories([])
    }
    setSelectedOption(event.target.value as Category)
    changeCategoryOption(event.target.value as Category)
  }

  const addCategory = () => {
    setCustomCategories([...customCategories, { name: '', id: generateUID(5) }])
  }
  const inputRefs = useRef<HTMLInputElement[]>([])

  const handleCategoryInputChange = (id: string, value: string) => {
    const updatedList = [...customCategories]
    const index = updatedList.findIndex((player) => player.id === id)
    updatedList[index].name = value
    setCustomCategories([...updatedList])
  }

  const removeCategory = (id: string) => {
    const updatedList = customCategories.filter((player) => player.id !== id)
    setCustomCategories([...updatedList])
  }

  useEffect(() => {
    // Focus the last input whenever customCategories are updated
    if (inputRefs.current.length > 0) {
      inputRefs.current[inputRefs.current.length - 1]?.focus()
    }
  }, [customCategories.length])

  useEffect(() => {
    changeCustomCategories(customCategories.map((category) => category.name))
  }, [customCategories])

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center justify-between">
        <div className="mb-4 mr-5 flex items-center">
          <p className="font-semibold">Categories:</p>
          <div
            id="my-anchor-element"
            className="ml-2 flex  h-5 w-5 cursor-default items-center justify-center rounded-full border border-gray-500 p-1 text-center"
          >
            <a className="text-sm">i</a>
            <Tooltip anchorSelect="#my-anchor-element">
              <ul>
                <li>
                  <strong>Custom:</strong>
                  <p className="text-xs">
                    Enter your own categories for the game
                  </p>
                </li>
                <li>
                  <strong>Mix:</strong>
                  <p className="text-xs">
                    Mix standard categories with your own
                  </p>
                </li>
              </ul>
            </Tooltip>
          </div>
        </div>
        <div className="flex space-x-3">
          <label className="cursor-pointer">
            <input
              type="radio"
              value="standard"
              checked={selectedOption === 'standard'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Standard
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              value="custom"
              checked={selectedOption === 'custom'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Custom
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              value="mix"
              checked={selectedOption === 'mix'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Mix
          </label>
        </div>
      </div>

      {(selectedOption === 'custom' || selectedOption === 'mix') && (
        <div className="my-5 flex justify-center">
          <div className=" flex w-11/12 flex-col  ">
            <div className="mb-4 flex items-center justify-between border-b-2">
              <div>
                <p className="font-semibold">Custom</p>
              </div>
              <div className="flex items-center justify-center">
                <span
                  className="cursor-pointer rounded-lg "
                  onClick={addCategory}
                >
                  <Add className="h-6 w-6 fill-gray-500 hover:fill-blue-500" />
                </span>
              </div>
            </div>

            <div className="mb-3 flex flex-col space-y-4">
              {customCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex animate-fade-up items-center justify-between space-x-4"
                >
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="w-full rounded-md border p-2"
                    value={category.name || ''}
                    onChange={(e) => {
                      handleCategoryInputChange(
                        category.id,
                        e.currentTarget.value
                      )
                    }}
                    ref={(el) => (inputRefs.current[index] = el!)}
                  />
                  <Delete
                    className="h-6 w-6 cursor-pointer fill-gray-500 hover:fill-red-500"
                    onClick={() => removeCategory(category.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoriesInit
