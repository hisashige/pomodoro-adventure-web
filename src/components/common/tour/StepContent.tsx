import { Image } from '@mantine/core'

interface StepContentProps {
  title: string
  img: string
  children: React.ReactNode
}
const StepContent: React.FC<StepContentProps> = ({ title, img, children }: StepContentProps) => {
  return (
    <div>
      <h4>{title}</h4>
      <Image
        maw={50}
        mx="auto"
        radius="md"
        src={img}
        alt="image"
        pos="absolute"
        style={{ top: 45, right: 30 }}
      />
      <div className="tour-description">{children}</div>
    </div>
  )
}

const overTour = () => {
  localStorage.setItem('isOverTour', JSON.stringify(true))
}
export const getIsOverTour = () => {
  return localStorage.getItem('isOverTour')
}

export const steps = [
  {
    selector: '.quest-area',
    content: () => (
      <StepContent title="クエスト" img="https://img.icons8.com/stickers/100/quest.png">
        <p>まずはクエストを登録してみよう。</p>
        <p>
          ここでのクエストとは、<b>努力したい=冒険したいことだよ。</b>
          例えば、「仕事」「読書」「勉強」「HP制作」みたいに、大きなカテゴリを入力してね。
        </p>
        <p>
          チュートリアルとして、<b>まずは1件だけ入力して、「保存」</b>を押してみよう。
        </p>
        <p>(ちなみに最大５件まで。目標は絞ろう。人生は有限だよ。)</p>
      </StepContent>
    ),
  },
  {
    selector: '.enemy-area',
    content: () => (
      <StepContent title="エネミー" img="/images/logo.jpg">
        <p>クエストに挑む時、毎回エネミーを入力できるよ。</p>
        <p>
          <b>今回倒したい敵=作業</b>
          ってとこかな。例えば、「"吾輩は猫でありトマトではない"を読む」とかね。
        </p>
        <p>必須ではないので、より細かく記録したい場合入力してみてね。</p>
      </StepContent>
    ),
  },
  {
    selector: '.image-area',
    content: () => (
      <StepContent title="画像" img="https://img.icons8.com/stickers/100/gallery.png">
        <p>なんかいい感じの画像を表示しとくね。</p>
        <p>
          ポモドーロがスタートしたり、終了したりすると画像が変わるよ。何パターンかあるので、何度も作業しようね。
        </p>
      </StepContent>
    ),
  },
  {
    selector: '.timer-area',
    content: () => (
      <StepContent title="タイマー" img="https://img.icons8.com/stickers/100/time.png">
        <p>ここでタイマーをスタートしてね。</p>
        <p>BGMも流れるから、好きなものを選んで。邪魔だったら音量ゼロにしたらいいよ。</p>
        <p>…え、ポモドーロって何って？</p>
        <p>
          そんな人はまずはポモドーロテクニックについて調べるエネミーでも倒してみたら？説明をサボったわけじゃないよ。
        </p>
      </StepContent>
    ),
  },
  {
    selector: '.nav-button',
    content: () => (
      <StepContent
        title="本めくりボタン"
        img="https://img.icons8.com/stickers/100/storytelling.png"
      >
        <p>おっと、忘れてた。</p>
        <p>ここでページをめくれるよ。</p>
        <p>
          次のページでは<b>ポモドーロの記録が見れたり、グラフで君の頑張りが視覚化</b>
          されてるよ。
        </p>
        <p>
          そうそう、25分1セット達成でクエストのレベルが1上がるよ。
          <b>途中で離脱すると中断になってレベルや経過時間は記録しない</b>
          から気をつけて。シビアにいくよ。
        </p>
        <p>…じゃあこれでツアーも終わりだよ。君だけのポモドーロの旅にいってらっしゃい！！</p>
      </StepContent>
    ),
    actionAfter: overTour,
  },
]
