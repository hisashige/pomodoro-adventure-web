import React, { LegacyRef } from 'react'
import Page from '../layouts/Page'
import Timer from '../parts/Timer'

interface Props {
  number: number
}
export default React.forwardRef(({ number }: Props, ref: LegacyRef<HTMLDivElement>) => {
  return (
    <div className="page" ref={ref}>
      <Page number={number} header="Pomodoro   Field">
        <div
          className="page-image"
          style={{ backgroundImage: 'url(images/html/monster.gif)' }}
        ></div>
        <div className="page-text">
          <Timer></Timer>
        </div>
      </Page>
    </div>
  )
})
