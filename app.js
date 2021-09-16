import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import {fileURLToPath} from 'url'
import path from 'path' 

const __dirname = path.dirname(fileURLToPath(import.meta.url)) 


const app = express()

app.use(cors())
// app.use(helmet())

app.use(express.static(path.resolve(__dirname, 'client/build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

const port  = 5000 || process.env.PORT
app.listen(port)