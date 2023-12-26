import { useState } from 'react'
import { createPortal } from 'react-dom'

import { ReactComponent as Info } from '@/assets/icons/info.svg'

function InfoModal() {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => setShowModal((showModal) => !showModal)


  return (
    <div className=''>
      <Info className='h-8 w-8 fill-white cursor-pointer hover:fill-green-400' onClick={toggleModal} />

      {showModal && createPortal(
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 ">
            <div className="p-6 shadow-md w-full h-full md:h-fit md:w-1/2 rounded-lg  flex flex-col justify-start  bg-slate-900 animate-fade">
              <div className='flex w-full justify-end items-center'>
                <button onClick={toggleModal} className='rounded-md p-1'>
                  <p className='text-white hover:text-red-500 '>Close</p>
                </button>
              </div>
              <div className='flex flex-col'>
                <h1 className='text-white font-bold text-xl md:text-4xl text-center mb-5'>How to Play</h1>

                <div className='text-gray-300 px-5 h-1/2 overflow-y-scroll'>
                  <ul className='list-decimal space-y-3 '>
                    <li><strong>Display:</strong> This game is meant to be displayed on a big screen for all players to see the categories.</li>
                    <li><strong>Team Formation:</strong> Input all players to be divided into two teams, setting the stage for an epic showdown.</li>
                    <li><strong>Head-to-Head Showdown:</strong> A representative from each team goes head-to-head, ready to outwit their opponent.</li>
                    <li><strong>Category Unveiling:</strong> Anticipation builds as a captivating category illuminates the screen, challenging contestants&apos; knowledge and creativity.</li>
                    <li><strong>Countdown Challenge:</strong> In a daring display of confidence, participants boldly declare the number of items they can list from the category in just 30 seconds, aiming to outshine their rivals.</li>
                    <li><strong>Strategic Bluffing:</strong> Raise the stakes by calling out a bluff! If you sense your adversary might be stretching the truth, challenge them to prove their prowess.</li>
                    <li><strong>Rapid Fire Countdown:</strong> Feel the excitement as the countdown begins, pushing contestants to rapidly list their items within the tight timeframe.</li>
                    <li><strong>Consequences Unleashed:</strong> The tension peaks as failure to meet the declared count results in a collective penalty— prehaps a shot for the entire team. On the flip side, if successful, the opposing team must raise their glasses for an unexpected toast.</li>
                  </ul>
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

export default InfoModal