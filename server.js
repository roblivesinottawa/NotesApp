const express = require('express')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.get('/', (req, res) => res.json({"message": "Welcome to Notes App"}))

const port = process.env.PORT || 7000
app.listen(port, () => console.log(`app listening at localhost:${port}`))
 
