# PATIKA.DEV Projects

### ODEV 1 Komut Satırı
<details>  
  <summary>Details</summary>

### Code

````js
let value = process.argv.slice(2)

const alan = (r) => {
    console.log(`Yaricapi ${r} olan dairenin alani: ${Math.PI * r * r}.`)
}

alan(value)
````
</details>

* * *

### ODEV 2 Post Sıralama ve Post Ekleme
<details>  
  <summary>Details</summary>

### Code

````js
const posts = [
    { postName: 'Post 1', postContent: 'Post 1 Content' },
    { postName: 'Post 2', postContent: 'Post 1 Content' },
    { postName: 'Post 3', postContent: 'Post 1 Content' },
]

const listPosts = () => {
    posts.map((post) => {
        console.log(post.postName)
    })
}

const addPost = (newPost) => {
    return new Promise((resolve, reject) => {
        posts.push(newPost)
        resolve(posts)
        //reject("Bir hata oluştu")
    })
}

async function showPosts() {
    try {
        await addPost({ postName: 'Post 4', postContent: 'Post 4 Content' })
        listPosts()
    } catch (err) {
        console.log(err)
    }
}

showPosts()
````
</details>

* * *


### ODEV 3 Daire Modülü
<details>  
  <summary>Details</summary>

### circle.js

````js
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
````

### index.js

```js
const { circleArea, circleCircumference } = require('./circle')

circleArea(5)
circleCircumference(5)
```
</details>


* * *

### ODEV 4 FS MODULE
<details>  
  <summary>Details</summary>

### Code

````js
//Veri okuma
fs.readFile('employees.json', 'utf8', (err, data) => {
    if (err) throw err
    console.log(data)
})

//Veri ekleme
fs.appendFile(
    'employees.json',
    '\n{"name": "Employee 2 Name", "salary": 4000}',
    'utf8',
    (err, data) => {
        if (err) throw err
        console.log(data)
    },
    console.log('Veri ekleme islemi tamamlandi.'),
)

//Veri silme
fs.unlink('employees.json', (err) => {
    if (err) throw err
    console.log('Dosya silindi.')
})
````
</details>


* * *

### ODEV 5 KENDI SUNUCUMUZ
<details>  
  <summary>Details</summary>

### Code

````js
const http = require('http')

const server = http.createServer((req, res) => {
    console.log('Bir istekte bulunuldu.')

    const url = req.url

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h2>INDEX SAYFASINA HOSGELDINIZ</h2>')
    } else if (url === '/hakkimizda') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h2>HAKKIMIZDA SAYFASINA HOSGELDINIZ</h2>')
    } else if (url === '/iletisim') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h2>ILETISIM SAYFASINA HOSGELDINIZ</h2>')
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write('<h2>404 SAYFA BULUNAMADI</h2>')
    }

    res.end()
})

const port = 5000

server.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi.`)
})
````
</details>