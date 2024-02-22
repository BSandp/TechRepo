
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



// router.get('/', (req, res) => {
//     //Informacion a modificar
//     res.send("Hello world")
// })
mongoose.connect(DB_URL) // Creo la cadena de conexion
const houseRoutes = require('./routes/houseRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

io.on('connect',(socket)=>{
    console.log('Connected')
    socket.on('message',(data)=>{
        console.log(data)
        socket.emit('message-receipt',{ 'message': 'mensaje recbido'})
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

//Ejecuto el servidor
app.use(router);
app.use('/uploads', express.static('uploads'));
app.use('/', userRoutes);
app.use('/', houseRoutes);
http.listen(port, () => {
    console.log('Listen on ' + port)
})