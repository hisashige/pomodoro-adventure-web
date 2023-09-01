import { useEffect, useRef, useState } from 'react'
import ReactHowler from 'react-howler'
import { Center, Grid, Slider, Text } from '@mantine/core'
import { IconGripHorizontal } from '@tabler/icons-react'
import SelectSound from './SelectSound'
import { SOUNDS } from '../../../consts'
import { usePomodoroContext } from '../../../context/PomodoroContext'

interface Props {
  playing: boolean
  isFinished: boolean
}
const Player = ({ playing, isFinished }: Props) => {
  const { volume, setVolume } = usePomodoroContext()
  const [sound, setSound] = useState(SOUNDS[0].value)
  const howlerRef = useRef(null)

  const handleChange = (value: number) => {
    setVolume(value)
  }

  useEffect(() => {
    if (isFinished) {
      howlerRef.current?.seek(0)
    }
  }, [isFinished])

  return (
    <>
      <ReactHowler
        src={'sounds/' + sound}
        playing={playing}
        volume={volume / 100}
        ref={howlerRef}
      />

      <Grid>
        <Grid.Col span={4}>
          <Center style={{ height: '100%' }}>
            <Text color="dimmed" size="xl" transform="uppercase" weight={700}>
              BGM
            </Text>
          </Center>
        </Grid.Col>
        <Grid.Col span={4}>
          <SelectSound setSound={setSound}></SelectSound>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text size="sm" weight="450">
            volume
          </Text>
          <Slider
            thumbChildren={<IconGripHorizontal size="1.2rem" stroke={1.5} />}
            value={volume}
            onChange={handleChange}
            label={volume + '%'}
            size="xs"
          />
        </Grid.Col>
      </Grid>
    </>
  )
}
export default Player
