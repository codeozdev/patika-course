let value = process.argv.slice(2)

const alan = (r) => {
    console.log(`Yaricapi ${r} olan dairenin alani: ${Math.PI * r * r}.`)
}

alan(value)
