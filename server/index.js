const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db').connection
const prfRouter = require('./routes/prf-router')
const userRouter = require('./routes/user-router')
const poRouter = require('./routes/po-router')
const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
app.use('/api', poRouter)
app.use('/api', prfRouter)
app.use('/user', userRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))