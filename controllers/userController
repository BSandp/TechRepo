const bcrypt = require('bcrypt');
const UserSchema = require('../models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET= process.env.JWT_SECRET || '';
class UserController {

    constructor(){
        
    }

    async login(email, password){
        try {
        // Buscar al usuario con el email
        const user = await UserSchema.findOne({ email });
        if(!user){
            return { "status": "error", "message": "El usuario no existe"}
        }

        //Comparar la contraseña con la que tengo en base de datos
        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            return { "status": "error", "message": "Contraseña incorrecta"}
        }

      const token = jwt.sign({ userId: user._id, 
                            email: user.email,
                             avatar: user.avatar,
                            fullname: `${user.name} ${user.lastname}`}, JWT_SECRET, { expiresIn: '1h' })
        user.password = null
        return {"status": "success", "token": token, "user": user }//"token": token

        } catch (error) {
            console.log(error)
            return { "status": "error", "message": "Error al iniciar sesion"}
        }
    }
    validateToken (req, res, next){
        const bearertoken= req.headers['authorization']
        if(!bearertoken){
            return res.status(401).json({"message":"token no existe"})
        }
        const token = bearertoken.startsWith("Bearer ") ? bearertoken.slice(7): bearertoken;
        jwt.verify(token,JWT_SECRET, (err,decoded)=>{
            if(err){
                return res.status(401).json({"message":"token invalido"});
            }
            req.userId=decoded.userId
            next();
        })
    }
}

module.exports = UserController
