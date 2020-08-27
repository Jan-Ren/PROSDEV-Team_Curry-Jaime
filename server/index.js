const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const jwt = require('express-jwt');

const db = require('./db').connection
require('dotenv').config()
const prfRouter = require('./routes/prf-router')
const userRouter = require('./routes/user-router')
const poRouter = require('./routes/po-router')
const nf_prfRouter = require('./routes/nf_prf-router')
const nf_poRouter = require('./routes/nf_po-router')
const app = express()
const apiPort = 3000

// app.get('/jwt', (req, res) => {
//     res.json({
//       token: jsonwebtoken.sign({ user: 'johndoe' }, require('./db').secretOrKey)
//     });
//   });

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
// app.use(jwt({ secret: require('./db').secretOrKey, algorithms: ['HS256'] }));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })
app.use('/api', nf_poRouter)
app.use('/api', nf_prfRouter)
app.use('/api', poRouter)
app.use('/api', prfRouter)
app.use('/user', userRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))