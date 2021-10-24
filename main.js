import express from 'express'
import { routerProductos } from "./Router/routerProductos.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

/* --------- SERVER ------- */
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`ya estoy conectado al puerto ${server.address().port}`)
})

server.on('error', () => {
    console.log('hubo un error...')
    console.log(error)
})
/* --------- SERVER ------- */

app.get('/', (req, res) => {
    res.redirect('/index.html')
})

app.use(express.static('public'))

app.use('/api', routerProductos)

