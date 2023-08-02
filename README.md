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