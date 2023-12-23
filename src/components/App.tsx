import { Toaster } from 'react-hot-toast'

import Initializer from './Initializer'

const App = () => {
  return (
    <div
      id="app"
      className="flex h-screen w-screen flex-col bg-sky-800 p-10 font-commissioner text-base xl:text-xl"
    >
      <div>
        <Toaster />
      </div>
      <div className="mb-10 flex items-center justify-center">
        <h1 className="text-4xl font-extrabold xl:text-6xl">
          <p className="animate-fade-right  tracking-wide text-red-500">
            Categories{' '}
          </p>{' '}
          <p className="animate-fade-left text-right text-white">Game</p>
        </h1>
      </div>

      <div className="flex items-center justify-center">
        <Initializer />
      </div>
    </div>
  )
}

export default App
