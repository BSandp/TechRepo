const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserSchema = require('../models/user.js')
const UserController = require('../controllers/userController')
const userController = new UserController();
const multer = require('multer');




router.get('/user', async (req, res) => {
    let users = await UserSchema.find(); 
    res.json(users)
})

router.get('/user/:id', async (req, res) => {
    //Traer un usuario especifico pasando el ID
    var id = req.params.id
    let user = await UserSchema.findById(id); 
    //console.log(id, user)
    res.json(user)

    //Traer un usuario pasandole el email
    // const query = UserSchema.where({ email: email });
    // const user = await query.findOne()
})

router.post('/user', async (req, res) => {
    //Crear un usuario
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    let user = UserSchema({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        id: req.body.id,
        password: hashedPassword
    })

    user.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        if(err.code == 11000){
            res.send({"status" : "error", "message" :"El correo ya fue registrado"})      
        }else if(err.errors.email.message != null){
            res.send({"status" : "error", "message" :err.errors.email.message})      

        }else{
            res.send({"status" : "error", "message" :"Error almacenando la informacion"})      
        }
    })
})

router.patch('/user/:id',userController.validateToken, async (req, res) => {
    //Actualizar un usuario
    // Cuando viene por la url del servicio web params
    let hashedPassword;

    if(req.body.password){
        hashedPassword = await bcrypt.hash(req.body.password, 10)
    }
    var id = req.params.id
    
    // Cuando viene por el body se usa body
    var updateUser = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        id: req.body.id,
    }

    UserSchema.findByIdAndUpdate(id, updateUser, {new: true}).then((result) => {
        res.send(result)
    }).catch((error) => {
        console.log(error)
        res.send("Error actualizando el registro")
    })
})

router.delete('/user/:id', userController.validateToken, (req, res) => {
    
    var id = req.params.id

    //Puedo establecer cualquier parametro para eliminar
    UserSchema.deleteOne({_id: id}).then(() => {
        res.json({"status": "success", "message": "User deleted successfully"})
    }).catch((error) => {
        console.log(error)
        res.json({"status": "failed", "message": "Error deleting user"})
    })


})
// SERVICIO WEB DE LOGIN Y AUTENTIFICACION
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    userController.login(email, password).then((result) => {
        if(result.status == "error"){
            res.status(401).send(result)
        }else{
            res.send(result)
        }
    })
})

//CONFIGURACION LIBRERIA MULTER
const storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null,Date.now()+ '-'+ file.originalname)
    }
});
const fileFilter= (req,file,cb)=>{
    
    if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }else{
        cb(new Error("El archivo no es una imagen"))
    }
}
const upload= multer({storage: storage, fileFilter: fileFilter})

//SERVICIO WEB PARA SUBIR ARCHIVOS - --  

router.post('/upload/:id/user', upload.single('file'),(req, res)=>{
    if(!req.file){
        return req.status(400).send({"status": "error", "message": "no se proporciono ningun archivo"})
    }
    var id = req.params.id
    var updateUser= {
        avatar: req.file.path
    }
    UserSchema.findByIdAndUpdate(id, updateUser, {new: true}).then((result) => {
        res.send({"status": "success","message": "archivo subido correctamente"})
    }).catch((error) => {
        console.log(error)
        res.send("Error al subir el archivo")
    })
} )


module.exports = router