import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {fileURLToPath} from 'url'
import path from 'path' 

const __dirname = path.dirname(fileURLToPath(import.meta.url)) 


const app = express()
dotenv.config()
app.use(cors())


app.use(express.static(path.resolve(__dirname, 'client/build')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

const port  =  process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})