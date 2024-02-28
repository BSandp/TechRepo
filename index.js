
const express = require('express') //Importo la libreria
const app = express() //Inicializacion de la variable que usara la libreria
const router = express.Router(); // Enrutar los servicios web
const port = 3000; // Escuchar la ejecucion del servidor
require('dotenv').config();
const DB_URL= process.env.DB_URL || '';
const mongoose = require('mongoose'); // Importo la libreria mongoose
const socket= require('socket.io');//importr libreria socket.io
const http = require('http').Server(app); //configuracion de servidor http almacenado en APP
const io=socket(http)//al servidor http ;



//crear servidor GRAPHQL 
const { createYoga } = require('graphql-yoga');
const schema = require('./Graphql/schema');

// router.get('/', (req, res) => {
//     //Informacion a modificar
//     res.send("Hello world")
// })
mongoose.connect(DB_URL) // Creo la cadena de conexion
const houseRoutes = require('./routes/houseRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const messageSchemas = require('./models/message');





io.on('connect', (socket) => {
    console.log("connected")
    //Escuchando eventos desde el servidor
    socket.on('message', (data) => {
        /** Almacenando el mensaje en la BD */
        var payload = JSON.parse(data)
        console.log(payload)
        /** Lo almaceno en la BD */
        messageSchemas(payload).save().then((result) => {
            /** Enviando el mensaje a todos los clientes conectados al websocket */
            socket.broadcast.emit('message-receipt', payload)
        }).catch((err) => {
            console.log({"status" : "error", "message" :err.message})
        })        
    })

    socket.on('disconnect', (socket) => {
        console.log("disconnect")    
    })
})
    


app.use(express.urlencoded({extended: true})) // Acceder a la informacion de las urls
app.use(express.json()) // Analizar informacion en formato JSON

app.use((res,req,next) => {
    res.io=io;
    next();
});
//Metodo [GET, POST, PUT, PATCH, DELETE]
// Nombre del servicio [/]



const yoga= new createYoga({schema});
app.use('/graphql', yoga)


//Ejecuto el servidor
app.use(router);
app.use('/uploads', express.static('uploads'));
app.use('/', userRoutes);
app.use('/', houseRoutes);
app.use('/', messageRoutes);

http.listen(port, () => {
    console.log('Listen on ' + port)
})