import React, { LegacyRef } from 'react'
import { Image } from '@mantine/core'
import Page from '../layouts/Page'
import Timer from '../parts/pomodoro/Timer'

interface Props {
  number: number
}
export default React.forwardRef(({ number }: Props, ref: LegacyRef<HTMLDivElement>) => {
  return (
    <div className="page" ref={ref}>
      <Page number={number} header="Pomodoro   Field">
        <Image src="images/html/monster.gif"></Image>
        <div className="page-text">
          <Timer></Timer>
        </div>
      </Page>
    </div>
  )
})
