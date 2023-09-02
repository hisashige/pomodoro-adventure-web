import { useEffect, useState } from 'react'
import { Text, Paper, Container, Button, Center } from '@mantine/core'
import { useTimer } from 'react-timer-hook'
import Player from './Player'
import { POMODORO_TIME } from '../../../../consts'
import { useQuestContext } from '../../../../contexts/QuestContext'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { usePomodoroContext } from '../../../../contexts/PomodoroContext'
import { getHowl } from '../../../../libs/howler'
import { useLogContext } from '../../../../contexts/LogContext'

export default function Timer() {
  const { questList, setQuestList, selectedQuestId, isEdit } = useQuestContext()
  const { isRunning, setIsRunning, volume } = usePomodoroContext()
  const { createLog, doneLog } = useLogContext()
  const [isFinished, setIsFinished] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isCountDown, setIsCountDown] = useState(false)
  const [countNum, setCountNum] = useState(3)
  const [isFadeOut, setIsFadeOut] = useState(false)

  // カウントダウン音
  const [howl] = useState(getHowl('countdown.mp3', volume))
  useEffect(() => {
    if (isCountDown) {
      howl.play()
    } else {
      howl.stop()
    }
  }, [isCountDown])
  useEffect(() => {
    howl.volume(volume / 100)
  }, [volume])

  const initianExpiryTimestamp = new Date()
  initianExpiryTimestamp.setSeconds(initianExpiryTimestamp.getSeconds() + POMODORO_TIME)

  const onTimerExpire = () => {
    setIsFinished(true)
    const targetIndex = questList.findIndex((item) => item.id === selectedQuestId)
    if (targetIndex !== -1) {
      const updatedQuestList = structuredClone(questList)
      updatedQuestList[targetIndex].elapsedMinutes =
        updatedQuestList[targetIndex].elapsedMinutes + Math.round(POMODORO_TIME / 60)
      setQuestList(updatedQuestList)
      doneLog()
    } else {
      notifications.show({
        title: <Text weight="bold">達成データの作成に失敗しました。</Text>,
        message: `選択されているクエストが見つからなかったため、達成データを追加できませんでした。`,
        color: 'red',
        icon: <IconX size="1.2rem" />,
      })
    }
  }

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
    onExpire: onTimerExpire,
    autoStart: false,
  })
  useEffect(() => {
    setIsRunning(isTimerRunning)
  }, [isTimerRunning])
  useEffect(() => {
    if (minutes === 0 && seconds === 3) {
      setIsFadeOut(true)
      startCountDown()
    } else if (seconds === 0) {
      setIsFadeOut(false)
    }
  }, [seconds])

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
    startCountDown(start)
    createLog()
  }

  const restartTimer = () => {
    const restartExpiryTimestamp = new Date()
    restartExpiryTimestamp.setSeconds(restartExpiryTimestamp.getSeconds() + POMODORO_TIME + 3)
    setIsFinished(false)
    startCountDown(() => restart(restartExpiryTimestamp))
    createLog()
  }

  const startCountDown = (callback?: () => void) => {
    setIsCountDown(true)
    const countInterval = setInterval(() => {
      setCountNum((prev) => prev - 1)
    }, 1000)
    setTimeout(() => {
      if (callback) callback()
      setIsCountDown(false)
      clearInterval(countInterval)
      setCountNum(3)
    }, 3000)
  }

  const padingZero = (num: number) => ('00' + num).slice(-2)

  function ButtonArea() {
    if (isCountDown) {
      return (
        <Button variant="gradient" disabled>
          カウントダウン中
        </Button>
      )
    } else if (isRunning) {
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
            onClick={restartTimer}
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
      if (isCountDown && !isFadeOut) {
        return 'Are you ready?'
      }
      return '待機中'
    }
  }

  return (
    <>
      <Paper withBorder radius="md" p="xs" m="xs">
        <Player playing={isRunning} isFadeOut={isFadeOut} isFinished={isFinished}></Player>
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
              {isCountDown && !isFadeOut ? (
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
