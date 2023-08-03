const pi = 3.14159265359

function circleArea(radius) {
    const area = pi * Math.pow(radius, 2)
    console.log('Circle Area', area)
}

function circleCircumference(radius) {
    const circumference = 2 * pi * radius
    console.log('Circle Circumference', circumference)
}

module.exports = {
    circleArea,
    circleCircumference,
}
