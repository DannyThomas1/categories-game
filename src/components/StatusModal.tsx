import { useState } from 'react'
import { createPortal } from 'react-dom'

import { ReactComponent as Home } from '@/assets/icons/home.svg'
import { GameStatus } from '@/types/types'


function StatusModal({ gameStatus, onGameEnd }: { gameStatus: GameStatus, onGameEnd: () => void }) {

  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => setShowModal((showModal) => !showModal)

  return (
    <div className=' '>
      <Home className='h-8 w-8 fill-white cursor-pointer hover:fill-green-400' onClick={toggleModal} />


      {showModal && createPortal(
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 ">
            <div className="p-6 shadow-md w-full h-full md:h-fit md:w-1/2 rounded-lg  flex flex-col justify-start  bg-slate-900 animate-fade">
              <div className='flex w-full justify-end items-center'>
                <button onClick={toggleModal} className='rounded-md p-1'>
                  <p className='text-white hover:text-red-500 '>Close</p>
                </button>
              </div>
              <div className='flex flex-col w-full justify-center items-center h-full md:h-fit'>
                <h1 className='text-white font-bold text-xl md:text-2xl text-center mb-5'>Game Status: <span className='text-green-500'>{gameStatus === GameStatus.InProgress ? "In Progress" : "Finished"}</span></h1>

                <div className='flex justify-center items-center text-white w-full'>
                  <button className='py-1 px-3 text-white bg-red-600 rounded-md hover:bg-red-700 self-center' onClick={onGameEnd}>End Game</button>
                </div>


              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default StatusModal



/*
While game is in progress:
  - Option to end game
  - Option to start a new game with same categories
When game is over:
  - Option to start a new game with new categories
  - Option to start a new game with same categories
*/