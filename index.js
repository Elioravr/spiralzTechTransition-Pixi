const STAGE_WIDTH = 1024
const STAGE_HEIGHT = 576
const CENTER_POINT_X = STAGE_WIDTH / 2
const CENTER_POINT_Y = STAGE_HEIGHT / 2
const FIRST_CIRCLE_RADIUS = 50

const MAX_RADIUS = Math.pow(Math.pow(CENTER_POINT_X, 2) + Math.pow(CENTER_POINT_Y, 2), 0.5)

const CIRCLES_ANIMATION_DURATION = 1

var app = new PIXI.Application(STAGE_WIDTH, STAGE_HEIGHT, {antialias: true})
document.body.appendChild(app.view)

var graphics = new PIXI.Graphics()

// set a fill and line style
graphics.beginFill(0x00BAFF)
graphics.lineStyle(4, 0x00BAFF, 1)
graphics.alpha = 1

const triangle = {
  '1-angle': 0,
  '2-angle': 0,
  '3-angle': 0,
  '4-angle': 0,
  '5-angle': 0,
  '6-angle': 0,
  '7-angle': 0
}

let isGoingBackwards = false

const firstCircle = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'1-angle': 360})
const secondCircle = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'2-angle': 360, delay: CIRCLES_ANIMATION_DURATION / 7})
const thirdCircle = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'3-angle': 360, delay: 2 * CIRCLES_ANIMATION_DURATION / 7})
const forthCircle = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'4-angle': 360, delay: 3 * CIRCLES_ANIMATION_DURATION / 7})
const fifthCircle = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'5-angle': 360, delay: 4 * CIRCLES_ANIMATION_DURATION / 7})
const sixthCircle = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'6-angle': 360, delay: 5 * CIRCLES_ANIMATION_DURATION / 7})
const seventhCircle = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'7-angle': 360, delay: 6 * CIRCLES_ANIMATION_DURATION / 7})

const firstCircleCloseAnimation = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'7-angle': 0})
const secondCircleCloseAnimation = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'6-angle': 0, delay: CIRCLES_ANIMATION_DURATION / 7})
const thirdCircleCloseAnimation = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'5-angle': 0, delay: 2 * CIRCLES_ANIMATION_DURATION / 7})
const forthCircleCloseAnimation = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'4-angle': 0, delay: 3 * CIRCLES_ANIMATION_DURATION / 7})
const fifthCircleCloseAnimation = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'3-angle': 0, delay: 4 * CIRCLES_ANIMATION_DURATION / 7})
const sixthCircleCloseAnimation = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'2-angle': 0, delay: 5 * CIRCLES_ANIMATION_DURATION / 7})
const seventhCircleCloseAnimation = new TweenLite.to(triangle, CIRCLES_ANIMATION_DURATION, {'1-angle': 0, delay: 6 * CIRCLES_ANIMATION_DURATION / 7})


const firstCirclesTimeline = new TimelineLite()
  firstCirclesTimeline
    .add(() => {isGoingBackwards = false})
    .add([
      firstCircle,
      secondCircle,
      thirdCircle,
      forthCircle,
      fifthCircle,
      sixthCircle,
      seventhCircle
    ])
    .add(() => {isGoingBackwards = true})
    .add([
      firstCircleCloseAnimation,
      secondCircleCloseAnimation,
      thirdCircleCloseAnimation,
      forthCircleCloseAnimation,
      fifthCircleCloseAnimation,
      sixthCircleCloseAnimation,
      seventhCircleCloseAnimation
    ])

app.stage.addChild(graphics)

const animate = () => {
  graphics.clear()

  animateCircle(0x00BAFF, 1, triangle['1-angle'])
  animateCircle(0x00ADED, 2, triangle['2-angle'])
  animateCircle(0x009FDB, 3, triangle['3-angle'])
  animateCircle(0x0092C9, 4, triangle['4-angle'])
  animateCircle(0x0085B6, 5, triangle['5-angle'])
  animateCircle(0x0078A4, 6, triangle['6-angle'])
  animateCircle(0x006A92, 7, triangle['7-angle'])
}

TweenLite.ticker.addEventListener('tick', animate)

const animateCircle = (color, circleIndex, currentCircleAngle) => {
  graphics.moveTo(CENTER_POINT_X, CENTER_POINT_Y)
  graphics.beginFill(color, 1)

  const radius = circleIndex * MAX_RADIUS / 7

  for (var i = 0; i <= currentCircleAngle; i++) {
    const currentAngle = getRadianDegree(isGoingBackwards ? i : 360 - i)
    graphics.lineTo(CENTER_POINT_X + radius * Math.cos(currentAngle), CENTER_POINT_Y + radius * Math.sin(currentAngle))
  }

  graphics.endFill()
}

const getRadianDegree = (degree) => {
  return degree * Math.PI / 180
}

document.addEventListener('click', () => {
  firstCirclesTimeline.restart()
})
