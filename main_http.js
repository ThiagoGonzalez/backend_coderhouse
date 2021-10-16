const http = require('http');


const PORT = 8080

const server = http.createServer((peticion, respuesta) => {
    
    const { url, method } = peticion
    console.log(method, url)

})

const srvConnection = server.listen(PORT, () => {
    console.log(`ya estoy conectado al puerto ${srvConnection.address().port}`)
})

