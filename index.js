const STAGE_WIDTH = 1024
const STAGE_HEIGHT = 576
const CENTER_POINT_X = STAGE_WIDTH / 2
const CENTER_POINT_Y = STAGE_HEIGHT / 2
const FIRST_CIRCLE_RADIUS = 50

const MAX_RADIUS = Math.pow(Math.pow(CENTER_POINT_X, 2) + Math.pow(CENTER_POINT_Y, 2), 0.5)

const CIRCLES_ANIMATION_DURATION = 0.8
const EMPTY_CIRCLES_ANIMATION_DURATION = CIRCLES_ANIMATION_DURATION * 0.6

var app = new PIXI.Application(STAGE_WIDTH, STAGE_HEIGHT, {antialias: true})
document.body.appendChild(app.view)

var fullCirclesGraphics = new PIXI.Graphics()

// set a fill and line style
fullCirclesGraphics.beginFill(0x00BAFF)
fullCirclesGraphics.lineStyle(4, 0x00BAFF, 1)
fullCirclesGraphics.alpha = 1

const fullCircles = {
  '1-angle': 0,
  '2-angle': 0,
  '3-angle': 0,
  '4-angle': 0,
  '5-angle': 0,
  '6-angle': 0,
  '7-angle': 0
}

const emptyCircles = {
  '1-angle': 0,
  '2-angle': 0,
  '3-angle': 0,
  '4-angle': 0,
  '5-angle': 0,
  '6-angle': 0
}

let isGoingBackwards = false

const firstFullCircleAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'1-angle': 360})
const secondFullCircleAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'2-angle': 360, delay: CIRCLES_ANIMATION_DURATION / 7})
const thirdFullCircleAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'3-angle': 360, delay: 2 * CIRCLES_ANIMATION_DURATION / 7})
const forthFullCircleAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'4-angle': 360, delay: 3 * CIRCLES_ANIMATION_DURATION / 7})
const fifthFullCircleAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'5-angle': 360, delay: 4 * CIRCLES_ANIMATION_DURATION / 7})
const sixthFullCircleAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'6-angle': 360, delay: 5 * CIRCLES_ANIMATION_DURATION / 7})
const seventhFullCircleAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'7-angle': 360, delay: 6 * CIRCLES_ANIMATION_DURATION / 7})

const firstEmptyCircleAnimation = new TweenLite.to(emptyCircles, EMPTY_CIRCLES_ANIMATION_DURATION, {'1-angle': 360, delay: CIRCLES_ANIMATION_DURATION / 6})
const secondEmptyCircleAnimation = new TweenLite.to(emptyCircles, EMPTY_CIRCLES_ANIMATION_DURATION, {'2-angle': 360, delay: 2 * CIRCLES_ANIMATION_DURATION / 6})
const thirdEmptyCircleAnimation = new TweenLite.to(emptyCircles, EMPTY_CIRCLES_ANIMATION_DURATION, {'3-angle': 360, delay: 3 * CIRCLES_ANIMATION_DURATION / 6})
const forthEmptyCircleAnimation = new TweenLite.to(emptyCircles, EMPTY_CIRCLES_ANIMATION_DURATION, {'4-angle': 360, delay: 4 * CIRCLES_ANIMATION_DURATION / 6})
const fifthEmptyCircleAnimation = new TweenLite.to(emptyCircles, EMPTY_CIRCLES_ANIMATION_DURATION, {'5-angle': 360, delay: 5 * CIRCLES_ANIMATION_DURATION / 6})
const sixthEmptyCircleAnimation = new TweenLite.to(emptyCircles, EMPTY_CIRCLES_ANIMATION_DURATION, {'6-angle': 360, delay: 6 * CIRCLES_ANIMATION_DURATION / 6})

const firstCircleCloseAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'7-angle': 0})
const secondCircleCloseAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'6-angle': 0, delay: CIRCLES_ANIMATION_DURATION / 7})
const thirdCircleCloseAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'5-angle': 0, delay: 2 * CIRCLES_ANIMATION_DURATION / 7})
const forthCircleCloseAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'4-angle': 0, delay: 3 * CIRCLES_ANIMATION_DURATION / 7})
const fifthCircleCloseAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'3-angle': 0, delay: 4 * CIRCLES_ANIMATION_DURATION / 7})
const sixthCircleCloseAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'2-angle': 0, delay: 5 * CIRCLES_ANIMATION_DURATION / 7})
const seventhCircleCloseAnimation = new TweenLite.to(fullCircles, CIRCLES_ANIMATION_DURATION, {'1-angle': 0, delay: 6 * CIRCLES_ANIMATION_DURATION / 7})


const firstCirclesTimeline = new TimelineLite()
  firstCirclesTimeline
    .add(() => {isGoingBackwards = false})
    .add([
      firstFullCircleAnimation,
      secondFullCircleAnimation,
      thirdFullCircleAnimation,
      forthFullCircleAnimation,
      fifthFullCircleAnimation,
      sixthFullCircleAnimation,
      seventhFullCircleAnimation
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
    .add(() => {TweenLite.ticker.removeEventListener('tick', animate)})

var firstEmptyCircleGraphics = new PIXI.Graphics()
var secondEmptyCircleGraphics = new PIXI.Graphics()
var thirdEmptyCircleGraphics = new PIXI.Graphics()
var forthEmptyCircleGraphics = new PIXI.Graphics()
var fifthEmptyCircleGraphics = new PIXI.Graphics()
var sixthEmptyCircleGraphics = new PIXI.Graphics()

app.stage.addChild(fullCirclesGraphics)
app.stage.addChild(firstEmptyCircleGraphics)
app.stage.addChild(secondEmptyCircleGraphics)
app.stage.addChild(thirdEmptyCircleGraphics)
app.stage.addChild(forthEmptyCircleGraphics)
app.stage.addChild(fifthEmptyCircleGraphics)
app.stage.addChild(sixthEmptyCircleGraphics)

const animate = () => {
  fullCirclesGraphics.clear()

  animateCircle(0x00BAFF, 1, fullCircles['1-angle'])
  animateCircle(0x00ADED, 2, fullCircles['2-angle'])
  animateCircle(0x009FDB, 3, fullCircles['3-angle'])
  animateCircle(0x0092C9, 4, fullCircles['4-angle'])
  animateCircle(0x0085B6, 5, fullCircles['5-angle'])
  animateCircle(0x0078A4, 6, fullCircles['6-angle'])
  animateCircle(0x006A92, 7, fullCircles['7-angle'])

  animateCircle(0x00BAFF, 1, emptyCircles['1-angle'], {emptyCircleGraphics: firstEmptyCircleGraphics})
  animateCircle(0x00ADED, 2, emptyCircles['2-angle'], {emptyCircleGraphics: secondEmptyCircleGraphics})
  animateCircle(0x009FDB, 3, emptyCircles['3-angle'], {emptyCircleGraphics: thirdEmptyCircleGraphics})
  animateCircle(0x0092C9, 4, emptyCircles['4-angle'], {emptyCircleGraphics: forthEmptyCircleGraphics})
  animateCircle(0x0085B6, 5, emptyCircles['5-angle'], {emptyCircleGraphics: fifthEmptyCircleGraphics})
  animateCircle(0x0078A4, 6, emptyCircles['6-angle'], {emptyCircleGraphics: sixthEmptyCircleGraphics})
}

TweenLite.ticker.addEventListener('tick', animate)

const animateCircle = (color, circleIndex, currentCircleAngle, {emptyCircleGraphics=null}={}) => {
  let currentGraphics = emptyCircleGraphics || fullCirclesGraphics

  if (!emptyCircleGraphics) {

    currentGraphics.moveTo(CENTER_POINT_X, CENTER_POINT_Y)
  }
  currentGraphics.beginFill(color, 1)

  let radius = circleIndex * MAX_RADIUS / 7

  if (emptyCircleGraphics) {
    currentGraphics.alpha = (360 - currentCircleAngle) / 360
    radius += 50
    currentGraphics.fillAlpha = 0
    currentGraphics.position.x = CENTER_POINT_X
    currentGraphics.position.y = CENTER_POINT_Y
    currentGraphics.pivot.x = CENTER_POINT_X
    currentGraphics.pivot.y = CENTER_POINT_Y
    currentGraphics.lineStyle(1, 0xFFFFFF)

    currentGraphics.moveTo(CENTER_POINT_X, CENTER_POINT_Y)
  }

  for (let i = 0; i <= currentCircleAngle; i++) {
    const angle = isGoingBackwards ? i : 360 - i
    const currentAngle = getRadianDegree(angle)

    if (i === 0 && emptyCircleGraphics) {
      currentGraphics.lineStyle(1, 0xFFFFFF, 0)
    } else if (i !== 0 && emptyCircleGraphics) {
      currentGraphics.lineStyle(1, 0xFFFFFF, 1)
      currentGraphics.rotation = getRadianDegree(currentAngle + -30 * circleIndex)
    }

    currentGraphics.lineTo(CENTER_POINT_X + radius * Math.cos(currentAngle), CENTER_POINT_Y + radius * Math.sin(currentAngle))
  }

  currentGraphics.endFill()
}

const getRadianDegree = (degree) => {
  return degree * Math.PI / 180
}

document.addEventListener('click', () => {
  firstCirclesTimeline.restart()
})
