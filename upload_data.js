const xlsx = require('xlsx')// libreria para el manejo de excel
require('dotenv').config()
const bcrypt=require('bcrypt')
const DB_URL= process.env.DB_URL || '';
const mongoose = require('mongoose'); // Importo la libreria mongoose
mongoose.connect(DB_URL) // Creo la cadena de conexion
const UserSchema = require('./models/user.js')


const woorkbook= xlsx.readFile('datos.xlsx')
const sheet_list = woorkbook.SheetNames
const data = xlsx.utils.sheet_to_json(woorkbook.Sheets[sheet_list[0]])

for(const user of data){
    // Hasheamos la clave
    user.email = user.email.trim().toLowerCase();
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    // Seteamos la contraseña con la nueva hasheada
    user.password = hashedPassword

    UserSchema({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        id: user.id,
        password: hashedPassword
    }).save().then((result) => {
        console.log("Usuario subido:", user.name)
    }).catch((err) => {
        console.log("Error subiendo el usuario", user.name)
    })
}