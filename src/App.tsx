import { MantineProvider } from '@mantine/core'
import './App.css'
import Book from './components/book'
import Header from './components/common/Header'
import { BookProvider } from './context/BookContext'
import { QuestProvider } from './context/QuestContext'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { PomodoroProvider } from './context/PomodoroContext'

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        primaryColor: 'cyan',
      }}
    >
      <Notifications />
      <ModalsProvider>
        <BookProvider>
          <QuestProvider>
            <PomodoroProvider>
              <Header></Header>
              <Book></Book>
            </PomodoroProvider>
          </QuestProvider>
        </BookProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default App
