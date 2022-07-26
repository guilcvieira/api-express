import express from 'express'
import cors from 'cors'

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ hello: 'Hello World!' })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})