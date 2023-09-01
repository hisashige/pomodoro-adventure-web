import { createContext, useContext, ReactNode, useState } from 'react'

export interface Pomodoro {
  isRunning: boolean
  volume: number
}
type PomodoroContext = {
  isRunning: boolean
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
  volume: number
  setVolume: React.Dispatch<React.SetStateAction<number>>
}

const defaultPomodoroContext = {
  isRunning: false,
  setIsRunning: () => {},
  volume: 20,
  setVolume: () => {},
}

const PomodoroContext = createContext<PomodoroContext>(defaultPomodoroContext)

interface Props {
  children: ReactNode
}
export const PomodoroProvider = ({ children }: Props) => {
  const [isRunning, setIsRunning] = useState(defaultPomodoroContext.isRunning)
  const [volume, setVolume] = useState<number>(defaultPomodoroContext.volume)

  return (
    <PomodoroContext.Provider
      value={{
        isRunning,
        setIsRunning,
        volume,
        setVolume,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  )
}

export const usePomodoroContext = () => useContext(PomodoroContext)
