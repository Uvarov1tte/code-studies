const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
require('dotenv').config()

app.use(express.json())

let refreshTokens = []
//refresh token. should store refresh token in db or redis cache
app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) {
        res.sendStatus(401)
    }
    if (!refreshTokens.includes(refreshToken)) {
        res.sendStatus(403)
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

//delete refresh token
app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    console.log('log out successfully')
    res.sendStatus(204)
})

//create a token
app.post('/login', (req, res) => {
    //authenticated user
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    refreshTokens.push(refreshToken)

    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
}

const port = 4000
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})