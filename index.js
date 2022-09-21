// config inicial
require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
var cors = require('cors')
const app = express()

// forma de ler JSON / Middlewares
app.use(cors())

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// rotas da API
const personRoutes = require('./routes/personRoutes')
const productRoutes = require('./routes/productRoutes')
const employeeRoutes = require('./routes/employeeRoutes')

app.use('/person', personRoutes)
app.use('/product', productRoutes)
app.use('/employee', employeeRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Oi express!' })
})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.gm4cz4j.mongodb.net/dados_barber?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))
