

const TIME_OFFSET = 2 // Madrid

// Convierte tiempo a ángulos
const getHandAngles = () => {
  const t = new Date()
  const sec = t.getUTCSeconds()
  const min = t.getUTCMinutes()
  const hrs = t.getUTCHours() + TIME_OFFSET
  return {
    hrs: ((hrs * 30) + (min / 2)) % 360,
    min: (min * 6) % 360,
    sec: (sec * 6) % 360
  }
}

// Actualiza el ángulo de las manillas
const updateHand = ({ selector, angle }) => {
  document.querySelector(selector).style.transform = `rotateZ(${angle}deg)`
  document.querySelector(selector).style.webkitTransform = `rotateZ(${angle}deg)`
}

// Observable por temporizador
Rx.Observable.interval(1000)
  .map(getHandAngles)
  .subscribe(time => {
    updateHand({ selector: '.hours-container', angle: time.hrs })
    updateHand({ selector: '.minutes-container', angle: time.min })
    updateHand({ selector: '.seconds-container', angle: time.sec })
  })

