const mongoose = require('mongoose') // Importando la libreria

// Creando el modelo de users
const HouseSchema = new mongoose.Schema({

    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        // validate: {
        //     validator: async function(state) {
        //       // Validacion del departamento
        //       var response = await fetch('https://api-colombia.com/api/v1/Department');
        //       var departments = await response.json()
        //       return departments.some(department => department.name.toUpperCase().includes(state.toUpperCase()));
        //     },
        //     message: props => `${props.value} no es un Departamento de Colombia!`
        //   }
    },
size: {
    type: Number,
        required: true
},
type: {
    type: String,
        required: true
},
zip_code: {
    type: String,
        required: true
},
rooms: {
    type: Number,
        required: true
},
bathrooms: {
    type: Number,
        required: true
},
parking: {
    type: String,
        required: true
},
price: {
    type: Number,
        required: true
},
code: {
    type: String,
        required: true,
            unique: true
},
image: {
    type: String,
       
    },
});
module.exports = mongoose.model('house', HouseSchema) 