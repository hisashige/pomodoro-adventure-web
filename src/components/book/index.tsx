import React from 'react'
import HTMLFlipBook from 'react-pageflip'
import './index.scss'
import useFlipPage from '../../hooks/useFlipPage'
import FrontCover from './pages/FrontCover'
import BackCover from './pages/BackCover'
import Pomodoro from './pages/Pomodoro'
import QuestList from './pages/QuestList'
import Log from './pages/Log'
import Status from './pages/Status'

const Book: React.FC = () => {
  const { bookRef, toNextPage, toPrevPage, onPage, onChangeOrientation, onChangePageState } =
    useFlipPage()

  return (
    <div>
      <div className="container-md" style={{ position: 'relative' }}>
        {/* @ts-ignore 設定不要なpropsがある */}
        <HTMLFlipBook
          width={window.innerWidth / 2}
          height={window.innerHeight - 56}
          size="stretch"
          style={{ backgroundImage: 'url(images/background.jpg)', backgroundSize: '100% 100%' }}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onPage}
          onChangeOrientation={onChangeOrientation}
          onChangeState={onChangePageState}
          className="demo-book"
          ref={bookRef}
          disableFlipByClick={true}
          useMouseEvents={false}
        >
          {/* 表紙 */}
          <FrontCover toNextPage={toNextPage} />
          {/* ページコンテンツ */}
          <Pomodoro number={1} />
          <QuestList number={2} />
          <Log number={3} />
          <Status number={4} />
          {/* 裏表紙 */}
          <BackCover toPrevPage={toPrevPage} />
        </HTMLFlipBook>
      </div>
    </div>
  )
}

export default Book
