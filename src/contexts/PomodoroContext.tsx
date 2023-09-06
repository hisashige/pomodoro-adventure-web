import { createContext, useContext, ReactNode, useState } from 'react'

enum TimerStatus {
  Waiting = 'waiting',
  Playing = 'playing',
  Paused = 'paused',
  Finished = 'finished',
  CountDown = 'countDown',
  FadeOut = 'fadeOut',
}

type PomodoroContext = {
  isRunning: boolean
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
  status: TimerStatus
  setStatus: React.Dispatch<React.SetStateAction<TimerStatus>>
  volume: number
  setVolume: React.Dispatch<React.SetStateAction<number>>
}

const defaultPomodoroContext = {
  isRunning: false,
  setIsRunning: () => {},
  status: TimerStatus.Waiting,
  setStatus: () => {},
  volume: 20,
  setVolume: () => {},
}

const PomodoroContext = createContext<PomodoroContext>(defaultPomodoroContext)

interface Props {
  children: ReactNode
}
export const PomodoroProvider = ({ children }: Props) => {
  const [isRunning, setIsRunning] = useState(defaultPomodoroContext.isRunning)
  const [status, setStatus] = useState(defaultPomodoroContext.status)
  const [volume, setVolume] = useState<number>(defaultPomodoroContext.volume)

  return (
    <PomodoroContext.Provider
      value={{
        isRunning,
        setIsRunning,
        status,
        setStatus,
        volume,
        setVolume,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  )
}

export const usePomodoroContext = () => useContext(PomodoroContext)
