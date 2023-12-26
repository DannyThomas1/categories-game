import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTimer } from 'react-timer-hook'

import { ReactComponent as Pause } from '@/assets/icons/pause.svg'
import { ReactComponent as Play } from '@/assets/icons/play.svg'
import { ReactComponent as Restart } from '@/assets/icons/restart.svg'

const PopupModal = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 ">
      <div className="p-6 shadow-md w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full  flex justify-center items-center bg-white border-8 border-red-600 animate-jump animate-twice">
        <p className='text-red-600 font-bold text-xl md:text-6xl'>{message}</p>
      </div>
    </div>
  );
};


function Timer({ expiryTimestamp }: { expiryTimestamp: Date }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { seconds, start, pause, restart } = useTimer({
    expiryTimestamp: expiryTimestamp,
    onExpire: () => openModal(),
    autoStart: false
  })

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-12 w-fit items-center justify-center rounded-full border-8 p-2 text-xl font-bold
        md:h-24 md:w-24 md:text-2xl
        ${seconds <= 10
            ? 'border-red-600 text-red-600'
            : 'border-green-600 text-black'
          } `}
      >
        <span>0:{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>

      <div className="mt-2 flex items-center justify-center space-x-2">
        <Play
          className="h-8 w-8 cursor-pointer fill-gray-500 hover:fill-blue-500"
          onClick={start}
        />

        <Pause
          className="h-8 w-8 cursor-pointer fill-gray-500 hover:fill-blue-500"
          onClick={pause}
        />

        <Restart
          className="h-8 w-8 cursor-pointer fill-gray-500 hover:fill-blue-500"
          onClick={() => {
            // Restarts to 5 minutes timer
            const time = new Date()
            time.setSeconds(time.getSeconds() + 30)
            restart(time)
          }}
        />
      </div>

      {isModalOpen && createPortal(
        <PopupModal message="Times Up!" onClose={closeModal} />,
        document.body
      )}
    </div>
  )
}

export default Timer
