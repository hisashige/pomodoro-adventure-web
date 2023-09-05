import React, { LegacyRef } from 'react'
import Page from '../layouts/Page'
import { useQuestContext } from '../../../contexts/QuestContext'
import { level } from '../../../libs/dataUtils'
import QuestRadar from '../parts/status/QuestRadar'
import TimesBar from '../parts/status/TimesBar'
import { useLogContext } from '../../../contexts/LogContext'

interface Props {
  number: number
}
export default React.forwardRef(({ number }: Props, ref: LegacyRef<HTMLDivElement>) => {
  const { logs } = useLogContext()
  const { aliveQuestList } = useQuestContext()
  const questsForRadar = aliveQuestList.map((item) => {
    return { ...item, level: level(item) }
  })

  return (
    <div className="page" ref={ref}>
      <Page number={number} header="Status">
        <QuestRadar questsForRadar={questsForRadar} />
        <TimesBar logs={logs} />
      </Page>
    </div>
  )
})
