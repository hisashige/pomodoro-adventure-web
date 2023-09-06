import React, { LegacyRef, useEffect, useState } from 'react'
import { Image } from '@mantine/core'
import Page from '../layouts/Page'
import Timer from '../parts/pomodoro/Timer'

interface Props {
  number: number
}
export default React.forwardRef(({ number }: Props, ref: LegacyRef<HTMLDivElement>) => {
  const gifs = ['monster.gif', 'witch.gif', 'bird.gif', 'asuka.gif', 'clock.gif', 'monster.gif']

  const [imageUrl, setImageUrl] = useState('')
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * gifs.length)
    const url = 'images/pomodoro/running/' + gifs[randomIndex]
    setImageUrl(url)
  }, [])
  return (
    <div className="page" ref={ref}>
      <Page number={number} header="Pomodoro   Field">
        <Image radius={5} height={400} src={imageUrl}></Image>
        <div className="page-text">
          <Timer></Timer>
        </div>
      </Page>
    </div>
  )
})
