import { Checkbox, Grid, Group, Paper, TextInput, Text, ActionIcon } from '@mantine/core'
import React, { useState } from 'react'
import { useQuestContext } from '../../../context/QuestContext'
import { IconBackspace } from '@tabler/icons-react'

interface Quest {
  id: number
  name: string
}

interface Props {
  oldQuest: Quest | undefined
  editQuest: Quest
  onNameChange: (questId: number, newName: string) => void
  onDelete: (questId: number) => void
  isEdit: boolean
}

const QuestItem: React.FC<Props> = ({ oldQuest, editQuest, onNameChange, onDelete, isEdit }) => {
  const { selectedQuestId, setSelectedQuestId } = useQuestContext()
  const [name, setName] = useState(editQuest.name)

  const isEmpty = editQuest.name === ''

  const selectQuest = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEmpty && event.target.checked) {
      setSelectedQuestId(editQuest.id)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    onNameChange(editQuest.id, e.target.value)
  }

  const handleDelete = () => {
    onDelete(editQuest.id)
  }

  return (
    <Paper withBorder radius="md" p="xs" m="xs">
      <Grid grow gutter="sm" align="center">
        {isEdit ? (
          <>
            <Grid.Col span={10}>
              <TextInput
                placeholder="タスク名"
                value={editQuest.name}
                onChange={handleNameChange}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Group>
                <ActionIcon
                  color="red"
                  size="xl"
                  radius="md"
                  variant="light"
                  onClick={handleDelete}
                >
                  <IconBackspace />
                </ActionIcon>
                {oldQuest && oldQuest.name === name}
              </Group>
            </Grid.Col>
          </>
        ) : (
          <>
            <Grid.Col span={1}>
              <Checkbox
                styles={{ body: { justifyContent: 'center' } }}
                onChange={selectQuest}
                checked={!isEmpty && editQuest.id === selectedQuestId}
              />
            </Grid.Col>
            <Grid.Col span={11}>
              <Text>{editQuest.name}</Text>
            </Grid.Col>
          </>
        )}
      </Grid>
    </Paper>
  )
}

export default QuestItem
