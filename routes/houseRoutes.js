const express = require('express');
const router = express.Router();
const multer = require('multer');
const houseSchema = require('../models/house')

router.get('/house', async (req, res) => {
    //Traer todos los usuarios
    let house= await houseSchema.find(); 
    res.json(house)
});

router.get('/house/:id', async (req, res) => {
    //Traer un usuario especifico pasando el ID
    var id = req.params.id
    let house = await houseSchema.findById(id); 
    // console.log(user)
    res.json(house)
});



router.post('/house', async (req, res) => {
    //Crear una casa
    // const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let house = houseSchema({
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        size: req.body.size,
        type: req.body.type,
        zip_code: req.body.zip_code,
        rooms: req.body.rooms,
        bathrooms: req.body.bathrooms,
        parking: req.body.parking,
        price: req.body.price,
        code: req.body.code,
        //image: req.body.image
    })

    house.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        if(err.code == 11000){
            res.send({"status" : "error", "message" :"the code of house existed"})      
        }else if(err.errors.code.message != null){
            res.send({"status" : "error", "message" :err.errors.code.message})      

        }else{
            res.send({"status" : "error", "message" :"Error almacenando la informacion"})      
        }
    })
});


router.patch('/house/:id', (req, res) => {
   
    var id = req.params.id
    
    var updateHouse = {
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        size: req.body.size,
        type: req.body.type,
        zip_code: req.body.zip_code,
        rooms: req.body.rooms,
        bathrooms: req.body.bathrooms,
        parking: req.body.parking,
        price: req.body.price,
        code: req.body.code,
    }

    houseSchema.findByIdAndUpdate(id, updateHouse, {new: true}).then((result) => {
        //console.log(id)
        res.send(result)
    }).catch((error) => {
        console.log(error)
        res.send("Error actualizando el registro")
    })
})

router.delete('/house/:id', (req, res) => {
    
    var id = req.params.id

    //Puedo establecer cualquier parametro para eliminar
  houseSchema.deleteOne({_id: id}).then(() => {
        res.json({"status": "success", "message": "User deleted successfully"})
    }).catch((error) => {
        console.log(error)
        res.json({"status": "failed", "message": "Error deleting user"})
    })

})

module.exports = router