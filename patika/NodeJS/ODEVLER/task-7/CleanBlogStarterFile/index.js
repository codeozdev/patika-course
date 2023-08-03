const express = require('express')
const app = express()

const blog = { id: 1, title: 'Blog title', description: 'Blog description' }

app.get('/', (req, res) => {
    res.status(200).send(blog)
})

app.listen(port, () => {
    console.log(`Sunucu port ${port} de başlatildi.`)
})
