import React, { LegacyRef } from 'react'
import { Button, Text } from '@mantine/core'
import PageCover from '../layouts/PageCover'

type Props = {
  toNextPage: () => void
}
export default React.forwardRef(({ toNextPage }: Props, ref: LegacyRef<HTMLDivElement>) => {
  return (
    <div ref={ref} className={'page page-cover page-cover-top'}>
      <PageCover>
        <Text size={50}>YOUR ADVENTURE</Text>
        <Button onClick={toNextPage}>Press to Start</Button>
      </PageCover>
    </div>
  )
})
