import { CirclesWithBar } from 'react-loader-spinner'

function Loading({ message, size }: { message: string; size: string }) {
  if (size === 'small') {
    return (
      <div className="flex w-fit flex-col items-center justify-center space-y-5">
        <CirclesWithBar color="#FFFFFF" height="100" width="100" />
        <p className="animate-pulse text-center text-white">{message}</p>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center justify-center space-y-5">
        <CirclesWithBar color="#FFFFFF" height="300" width="300" />
        <p className="text-center text-white">{message}</p>
      </div>
    )
  }
}

export default Loading
