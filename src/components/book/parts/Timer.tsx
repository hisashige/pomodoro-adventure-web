import { useTimer } from 'react-timer-hook'
import { Text, Paper, Container, Button, Center } from '@mantine/core'
import Player from './Player'
import { useEffect, useState } from 'react'
import ReactHowler from 'react-howler'
import { POMODORO_TIME } from '../../../consts'
import { useQuestContext } from '../../../context/QuestContext'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { usePomodoroContext } from '../../../context/PomodoroContext'

export default function Timer() {
  const { questList, setQuestList, selectedQuestId, isEdit } = useQuestContext()
  const { isRunning, setIsRunning, volume } = usePomodoroContext()
  const [isFinished, setIsFinished] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isCountUp, setIsCountUp] = useState(false)
  const [countNum, setCountNum] = useState(3)

  const initianExpiryTimestamp = new Date()
  initianExpiryTimestamp.setSeconds(initianExpiryTimestamp.getSeconds() + POMODORO_TIME)

  const {
    seconds,
    minutes,
    isRunning: isTimerRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: initianExpiryTimestamp,
    onExpire: () => {
      setIsFinished(true)
      const targetIndex = questList.findIndex((item) => item.id === selectedQuestId)
      if (targetIndex !== -1) {
        questList[targetIndex].elapsedMinutes = POMODORO_TIME / 60
        setQuestList(questList)
      } else {
        notifications.show({
          title: <Text weight="bold">達成データの作成に失敗しました。</Text>,
          message: `選択されているクエストが見つからなかったため、達成データを追加できませんでした。`,
          color: 'red',
          icon: <IconX size="1.2rem" />,
        })
      }
    },
    autoStart: false,
  })
  useEffect(() => {
    setIsRunning(isTimerRunning)
  }, [isTimerRunning])

  const startTimer = () => {
    if (isEdit) {
      modals.open({
        title: 'クエストの編集中は開始できません。',
        children: (
          <>
            <Button fullWidth onClick={() => modals.closeAll()} mt="md">
              閉じる
            </Button>
          </>
        ),
      })
      return
    }
    if (selectedQuestId === null) {
      modals.open({
        title: 'クエストを選択して開始してください。',
        children: (
          <>
            <Button fullWidth onClick={() => modals.closeAll()} mt="md">
              閉じる
            </Button>
          </>
        ),
      })
      return
    }
    setIsCountUp(true)
    const countInterval = setInterval(() => {
      setCountNum((prev) => prev - 1)
    }, 1000)
    setTimeout(() => {
      start()
      setIsCountUp(false)
      clearInterval(countInterval)
    }, 3000)
  }

  const padingZero = (num: number) => ('00' + num).slice(-2)

  function ButtonArea() {
    if (isRunning) {
      return (
        <Button
          onClick={() => {
            setIsPaused(true)
            pause()
          }}
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
        >
          STOP
        </Button>
      )
    } else {
      if (isFinished) {
        return (
          <Button
            onClick={() => {
              const restartExpiryTimestamp = new Date()
              restartExpiryTimestamp.setSeconds(restartExpiryTimestamp.getSeconds() + POMODORO_TIME)
              setIsFinished(false)
              restart(restartExpiryTimestamp)
            }}
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
          >
            RE-START
          </Button>
        )
      }
      if (isPaused) {
        return (
          <Button
            onClick={() => {
              setIsPaused(false)
              resume()
            }}
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
          >
            RESUME
          </Button>
        )
      }
      return (
        <Button
          onClick={startTimer}
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
        >
          START
        </Button>
      )
    }
  }

  const subMessage = () => {
    if (isRunning) {
      return 'クエスト中'
    } else {
      if (isFinished) {
        return 'クエスト完了!'
      }
      if (isPaused) {
        return '一時停止中...'
      }
      if (isCountUp) {
        return 'Are you ready?'
      }
      return '待機中'
    }
  }

  return (
    <>
      <ReactHowler src={'sounds/countdown.mp3'} playing={isCountUp} volume={volume / 100} />

      <Paper withBorder radius="md" p="xs" m="xs">
        <Player playing={isRunning} isFinished={isFinished}></Player>
      </Paper>
      <Paper withBorder radius="md" p="xs" m="xs">
        <Center>
          <Text color="dimmed" size="xl" transform="uppercase" weight={700}>
            {subMessage()}
          </Text>
        </Center>
        <Center>
          <Container size={500}>
            <Text weight={400} size={100}>
              {isCountUp ? (
                countNum
              ) : (
                <>
                  <span>{padingZero(minutes)}</span>:<span>{padingZero(seconds)}</span>
                </>
              )}
            </Text>
          </Container>
        </Center>
        <Center>
          <ButtonArea />
        </Center>
      </Paper>
    </>
  )
}
