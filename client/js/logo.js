import mojs from 'mo-js'

const init = () => {
  const rec = [].slice.call(document.querySelectorAll('.rec'))
  const el = [].slice.call(document.querySelectorAll('ellipse'))

  const OPTS = {
    duration: 300,
    isYoyo: true,
  }

  const row1 = new mojs.Tween({
    duration: OPTS.duration,
    isYoyo: OPTS.isYoyo,
    onUpdate: (progress) => {
      const bProgress = mojs.easing.cubic.in(progress)
      rec[0].setAttribute('d', `M ${41.9 + (30 * bProgress)} 87C ${41.9 + (30 * bProgress)} 94.9 ${48 + (30 * bProgress)} 101.4 ${55.8 + (30 * bProgress)} 102L132.9 102.1C140.8 101.5 147.1 95 147.1 87 147.1 79 140.8 72.5 132.9 72 L ${55.8 + (30 * bProgress)} 72C ${48 + (30 * bProgress)} 72.6 ${41.9 + (30 * bProgress)} 79.1 ${41.9 + (30 * bProgress)} 87Z`)

      el[0].setAttribute('cx', 198.4 - (30 * bProgress))
    }
  })

  const row2 = new mojs.Tween({
    duration: OPTS.duration,
    isYoyo: OPTS.isYoyo,
    onUpdate: (progress) => {
      const bProgress = mojs.easing.cubic.in(progress)
      rec[2].setAttribute('d', `M ${92.6 + (40 * bProgress)} 128.1C ${92.6 + (40 * bProgress)} 136 ${98.8 + (40 * bProgress)} 142.5 ${106.5 + (40 * bProgress)} 143.1L168 143.2C175.9 142.7 182.1 136.1 182.1 128.1 182.1 120.1 175.9 113.6 168 113.1L ${106.5 + (40 * bProgress)} 113.1C ${98.8 + (40 * bProgress)} 113.7 ${92.6 + (40 * bProgress)} 120.2 ${92.6 + (40 * bProgress)} 128.1Z`)

      el[2].setAttribute('cx', 61.9 + (40 * bProgress))
    }
  })

  const row3 = new mojs.Tween({
    duration: OPTS.duration,
    isYoyo: OPTS.isYoyo,
    onUpdate: (progress) => {
      const bProgress = mojs.easing.cubic.in(progress)
      rec[1].setAttribute('d', `M84.9 154C77.1 154.6 71 161.1 71 169 71 176.9 77.1 183.4 84.9 184L ${142 - (10 * bProgress)} 184C ${149.9 - (10 * bProgress)} 183.5 ${156.2 - (10 * bProgress)} 177 ${156.2 - (10 * bProgress)} 169 ${156.2 - (10 * bProgress)} 161 ${149.9 - (10 * bProgress)} 154.5 ${142 - (10 * bProgress)} 154L84.9 154Z`)

      el[1].setAttribute('cx', 198.4 - (30 * bProgress))
    }
  })

  const timeline = (new mojs.Timeline()).add(row1, row2, row3)
  const logo = document.querySelector('#logo')

  logo.addEventListener('mouseenter', () => {
    timeline.play()
  })

  logo.addEventListener('mouseleave', () => {
    timeline.playBackward()
  })
}

export default { init }
