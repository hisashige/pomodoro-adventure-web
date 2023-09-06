import { MantineProvider } from '@mantine/core'
import { useOs } from '@mantine/hooks'
import TagManager from 'react-gtm-module'
import './App.css'
import Book from './components/book'
import Header from './components/common/Header'
import { BookProvider } from './contexts/BookContext'
import { QuestProvider } from './contexts/QuestContext'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { PomodoroProvider } from './contexts/PomodoroContext'
import { LogProvider } from './contexts/LogContext'
import { useEffect } from 'react'
import { GTM_INFO } from './consts/common'

function App() {
  const os = useOs()
  const isSupportedOS = os === 'windows' || os === 'macos'

  // GTM設定
  useEffect(() => {
    let gtmInfo
    if (import.meta.env.PROD) {
      gtmInfo = GTM_INFO.production
    } else {
      gtmInfo = GTM_INFO.development
    }
    TagManager.initialize(gtmInfo)
  }, [])

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
                {isSupportedOS ? <Book></Book> : 'サポート外のOSです。PCで開いてね。'}
              </PomodoroProvider>
            </LogProvider>
          </QuestProvider>
        </BookProvider>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default App
