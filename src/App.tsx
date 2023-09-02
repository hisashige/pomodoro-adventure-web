import { MantineProvider } from '@mantine/core'
import './App.css'
import Book from './components/book'
import Header from './components/common/Header'
import { BookProvider } from './contexts/BookContext'
import { QuestProvider } from './contexts/QuestContext'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { PomodoroProvider } from './contexts/PomodoroContext'
import { LogProvider } from './contexts/LogContext'

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
            <LogProvider>
              <PomodoroProvider>
                <Header></Header>
                <Book></Book>
              </PomodoroProvider>
            </LogProvider>
          </QuestProvider>
        </BookProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default App
