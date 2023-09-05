import React, { LegacyRef, useEffect, useMemo, useState } from 'react'
import QuestItem from '../parts/questList/QuestItem'
import { Quest, useQuestContext } from '../../../contexts/QuestContext'
import Page from '../layouts/Page'
import { ActionIcon, Button, Group, Text } from '@mantine/core'
import { IconCheck, IconDeviceFloppy, IconEdit, IconPlus, IconX } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { usePomodoroContext } from '../../../contexts/PomodoroContext'
import Enemy from '../parts/questList/Enemy'
import { createId } from '../../../libs/dataUtils'

interface Props {
  number: number
}

export default React.forwardRef(({ number }: Props, ref: LegacyRef<HTMLDivElement>) => {
  const { isRunning } = usePomodoroContext()
  const { questList, setQuestList, isEdit, setIsEdit } = useQuestContext()
  const [editQuestList, setEditQuestList] = useState(questList)
  const aliveEditQuestList = useMemo(
    () => editQuestList.filter((item) => !item.delete),
    [editQuestList]
  )

  useEffect(() => {
    if (questList.length < 1) {
      setIsEdit(true)
      handleAddQuest()
    }
  }, [])

  const handleNameChange = (questId: number, newName: string) => {
    const updatedQuestList = editQuestList.map((item) =>
      item.id === questId ? { ...item, name: newName } : item
    )
    setEditQuestList(updatedQuestList)
  }

  const handleDelete = (questId: number) => {
    const updatedQuestList = editQuestList.map((item) =>
      item.id === questId ? { ...item, delete: true } : item
    )
    setEditQuestList(updatedQuestList)
  }

  const handleAddQuest = () => {
    const newQuestId = createId(editQuestList)
    const newQuest: Quest = { id: newQuestId, name: '', totalMinutes: 0, delete: false }
    setEditQuestList([...editQuestList, newQuest])
  }

  const handleSaveAll = () => {
    const validateErrors = editQuestList.filter((item) => item.name === '' || item.name.length > 30)
    if (validateErrors.length > 0) {
      notifications.show({
        title: <Text weight="bold">保存に失敗しました。</Text>,
        message: `クエスト名は1~30文字以内で入力してください。`,
        color: 'red',
        icon: <IconX size="1.2rem" />,
      })
      return
    }
    if (editQuestList.length < 1) {
      notifications.show({
        title: <Text weight="bold">保存に失敗しました。</Text>,
        message: `クエストは１件以上登録してください。`,
        color: 'red',
        icon: <IconX size="1.2rem" />,
      })
      return
    }
    setQuestList(editQuestList)
    setIsEdit(false)
    notifications.show({
      title: <Text weight="bold">更新</Text>,
      message: `クエストの設定を更新しました。`,
      color: 'teal',
      icon: <IconCheck size="1.2rem" />,
    })
  }

  const cancelEdit = () => {
    setEditQuestList(questList)
    setIsEdit(false)
  }

  const onEditable = () => {
    setIsEdit(true)
    if (questList.length === 0) {
      handleAddQuest()
    }
  }

  const ButtonArea = () => {
    if (!isRunning) {
      if (isEdit) {
        return (
          <Group position="center">
            <Button radius="lg" onClick={handleSaveAll}>
              <IconDeviceFloppy />
              保存
            </Button>
            <Button radius="lg" variant="outline" onClick={cancelEdit}>
              キャンセル
            </Button>
          </Group>
        )
      } else {
        return (
          <Group position="right">
            <Button radius="lg" variant="outline" onClick={onEditable}>
              <IconEdit />
              編集
            </Button>
          </Group>
        )
      }
    }
  }

  return (
    <div className="page" ref={ref}>
      <Page number={number} header="Quest List">
        <ButtonArea />

        {aliveEditQuestList.map((quest) => {
          const storedQuest = questList.find((fixQuest) => fixQuest.id === quest.id)
          return (
            <QuestItem
              key={quest.id}
              storedQuest={storedQuest}
              editQuest={quest}
              onChangeName={handleNameChange}
              onDelete={handleDelete}
              isEdit={isEdit}
            />
          )
        })}

        {isEdit && aliveEditQuestList.length < 5 && (
          <Group position="right" pr={30}>
            <ActionIcon variant="filled" radius="lg" onClick={handleAddQuest}>
              <IconPlus />
            </ActionIcon>
          </Group>
        )}

        {!isEdit && <Enemy isRunning={isRunning}></Enemy>}
      </Page>
    </div>
  )
})
