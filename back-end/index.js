import express from 'express'
import bootstrap from './src/index.router.js'
import dotenv from 'dotenv'
dotenv.config({path:"./config/.env"})
const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))
bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))