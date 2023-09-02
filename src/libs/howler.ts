import { Howl } from 'howler'

export const getHowl = (sound: string, volume: number) => {
  return new Howl({
    src: 'sounds/' + sound,
    loop: true,
    volume: volume / 100,
  })
}
