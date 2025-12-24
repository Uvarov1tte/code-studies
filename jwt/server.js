const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const { authenticateToken } = require('./middleware')
require('dotenv').config()


app.use(express.json())

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
]

app.get('/posts', authenticateToken, (req, res) => {

    console.log(req.user)
    res.json(posts.filter(post => post.username === req.user.name))

})

const port = 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})