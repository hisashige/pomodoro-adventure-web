import React, { LegacyRef, useEffect, useState } from 'react'
import QuestItem from '../parts/QuestItem'
import { Quest, useQuestContext } from '../../../context/QuestContext'
import Page from '../layouts/Page'
import { ActionIcon, Button, Group, Text } from '@mantine/core'
import { IconCheck, IconDeviceFloppy, IconEdit, IconPlus, IconX } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'

interface Props {
  number: number
}

export default React.forwardRef(({ number }: Props, ref: LegacyRef<HTMLDivElement>) => {
  const { questList, setQuestList, isEdit, setIsEdit } = useQuestContext()
  const [editQuestList, setEditQuestList] = useState(questList)

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
    const updatedQuestList = editQuestList.filter((item) => item.id !== questId)
    setEditQuestList(updatedQuestList)
  }

  const handleAddQuest = () => {
    const newQuestId =
      editQuestList.length > 0 ? Math.max(...editQuestList.map((item) => item.id)) + 1 : 0
    const newQuest: Quest = { id: newQuestId, name: '', elapsedMinutes: 0 }
    setEditQuestList([...editQuestList, newQuest])
  }

  const handleSaveAll = () => {
    const validateErrors = editQuestList.filter(
      (item) => item.name === '' || item.name.length > 100
    )
    if (validateErrors.length > 0) {
      notifications.show({
        title: <Text weight="bold">保存に失敗しました。</Text>,
        message: `タスク名は1~100文字以内で入力してください。`,
        color: 'red',
        icon: <IconX size="1.2rem" />,
      })
      return
    }
    if (editQuestList.length < 1) {
      notifications.show({
        title: <Text weight="bold">保存に失敗しました。</Text>,
        message: `タスクは１件以上登録してください。`,
        color: 'red',
        icon: <IconX size="1.2rem" />,
      })
      return
    }
    setQuestList(editQuestList)
    setIsEdit(false)
    notifications.show({
      title: <Text weight="bold">更新</Text>,
      message: `タスクの設定を更新しました。`,
      color: 'teal',
      icon: <IconCheck size="1.2rem" />,
    })
  }

  const canselEdit = () => {
    setEditQuestList(questList)
    setIsEdit(false)
  }

  const onEditable = () => {
    setIsEdit(true)
    if (questList.length === 0) {
      handleAddQuest()
    }
  }

  return (
    <div className="page" ref={ref}>
      <Page number={number} header="Quest List">
        {isEdit ? (
          <Group position="center">
            <Button radius="lg" onClick={handleSaveAll}>
              <IconDeviceFloppy />
              保存
            </Button>
            <Button radius="lg" variant="outline" onClick={canselEdit}>
              キャンセル
            </Button>
          </Group>
        ) : (
          <Group position="right">
            <Button radius="lg" variant="outline" onClick={onEditable}>
              <IconEdit />
              編集
            </Button>
          </Group>
        )}

        {editQuestList.map((quest) => {
          const oldQuest = questList.find((oldQuest) => oldQuest.id === quest.id)
          return (
            <QuestItem
              key={quest.id}
              oldQuest={oldQuest}
              editQuest={quest}
              onNameChange={handleNameChange}
              onDelete={handleDelete}
              isEdit={isEdit}
            />
          )
        })}

        {isEdit && editQuestList.length < 5 && (
          <Group position="right" pr={30}>
            <ActionIcon variant="filled" radius="lg" onClick={handleAddQuest}>
              <IconPlus />
            </ActionIcon>
          </Group>
        )}
      </Page>
    </div>
  )
})
