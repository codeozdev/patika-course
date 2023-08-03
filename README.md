# PATIKA.DEV Projects

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