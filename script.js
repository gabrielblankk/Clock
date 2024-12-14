let interval
let countSec = 0
let countMin = 0
let countHour = 0
let speed

const root = document.documentElement
const hours = document.querySelectorAll('.hour')
const minutes = document.querySelectorAll('.minute')
const seconds = document.querySelectorAll('.second')

const startBtn = document.querySelector('#startBtn')
const realTimeBtn = document.querySelector('#realTimeBtn')
const pauseBtn = document.querySelector('#pauseBtn')
const resumeBtn = document.querySelector('#resumeBtn')
const resetBtn = document.querySelector('#resetBtn')
const sliderContainer = document.querySelector('#slider-container')
const speedSlider = document.querySelector('#speedSlider')
const defaultSpeedBtn = document.querySelector('#defaultSpeedBtn')

speedSlider.addEventListener('change', () => {
    changeSpeed(speedSlider.value)
})

defaultSpeedBtn.addEventListener('click', () => {
    changeSpeed(1000)
})

startBtn.addEventListener('click', () => {
    startBtn.style.display = "none"
    realTimeBtn.style.display = "none"
    pauseBtn.style.display = "block"
    sliderContainer.style.display = "flex"
 
    speed = 1000
    startClock(false)
})

realTimeBtn.addEventListener('click', () => {
    realTimeBtn.style.display = "none"
    startBtn.style.display = "none"
    resetBtn.style.display = "block"
    
    speed = 0
    startClock(true)
})

pauseBtn.addEventListener('click', () => {
    pauseBtn.style.display = "none" 
    sliderContainer.style.display = "none"
    resumeBtn.style.display = "block" 
    resetBtn.style.display = "block"
    
    clearInterval(interval)
})

resumeBtn.addEventListener('click', () => {
    resumeBtn.style.display = "none"
    resetBtn.style.display = "none"
    sliderContainer.style.display = "flex"
    pauseBtn.style.display = "block"
    
    startClock(false)
})

resetBtn.addEventListener('click', () => {
    resetBtn.style.display = "none"
    resumeBtn.style.display = "none"
    startBtn.style.display = "block"
    realTimeBtn.style.display = "block"
    
    reset()
})

function startClock(rt) {
    interval = setInterval(() => {
        if (rt) {
            let date = new Date()
            
            countSec = date.getSeconds()
            countMin = date.getMinutes()
            countHour = date.getHours()
        } else {
            countSec++

            if (countSec === 60) {
                countSec = 0
                countMin++
            }

            if (countMin === 60) {
                countMin = 0
                countHour++
            }
            
            if (countHour === 24) {
                countHour = 0
            }
        }

        seconds.forEach(e => {
            e.textContent = countSec
        })

        minutes.forEach(e => {
            e.textContent = countMin
        })

        hours.forEach(e => {
            e.textContent = countHour
        })
        
        root.style.setProperty('--secondsDeg', `${countSec * 6}deg`)
        root.style.setProperty('--minutesDeg', `${countMin * 6}deg`)
        root.style.setProperty('--hoursDeg', `${countHour * 30}deg`)
    }, speed)
}

function reset() {
    clearInterval(interval)

    countSec = 0
    countMin = 0
    countHour = 0

    speedSlider.value = 1000
    speed = 1000

    root.style.setProperty('--secondsDeg', "0deg")
    root.style.setProperty('--minutesDeg', "0deg")
    root.style.setProperty('--hoursDeg', "0deg")

    seconds.forEach(e => {
        e.textContent = countSec
    })

    minutes.forEach(e => {
        e.textContent = countMin
    })

    hours.forEach(e => {
        e.textContent = countHour
    })
}

function changeSpeed(s) {
    speedSlider.value = s
    speed = s
    clearInterval(interval)
    startClock(false)
}