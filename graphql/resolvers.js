const userSchema = require('../models/user')
const houseSchema = require('../models/house')
const messageSchema = require('../models/message')


const resolvers = {
    hello: async () => {
        return "Hola Mundo!";
    },
    user: async (_, { id }) => {
        try {
            return user = await userSchema.findById(id);
            console.log(id)
        } catch (e) {
            console.log()
        }
    },
    users: async () => {
        try {
            return await userSchema.find();
        }
        catch (e) {
            console.log(e)
        }
    },
    usersByFilter: async (_, { filter }) => {
        try {
            let query = {};

            if (filter) {
                if (filter.name) {

                    query.name = { $regex: filter.name, $options: 'i' } // 'i' se utiliza para hacer una busqueda insesible de mayusculas y minusculas
                }
                if (filter.email) {

                    query.email = { $regex: filter.email, $options: 'i' }
                }
                if (filter.lastname) {

                    query.lastname = { $regex: filter.lastname, $options: 'i' }
                }

                const users = await userSchema.find(query)
                return users;
            }

        } catch (e) {
            console.log("Error obteniendo el usuario")

        }
    },
    Message: async (_, { id }) => {
        try {
            return message = await messageSchema.findById(id).populate({
                path: 'from',
                select: '-password'
            })
                .populate({
                    path: 'to',
                    select: '-password'
                });
        } catch (e) {
            console.log()
        }
    },
    Messages: async () => {
        try {
            return await messageSchema.find().populate({
                path: 'from',
                select: '-password'
            })
                .populate({
                    path: 'to',
                    select: '-password'
                });
        }
        catch (e) {
            console.log(e)
        }
    },
    MessagesByFilter: async (_, { filter }) => {
        try {
            let query = {};
            if (filter) {
                if (filter.from) {
                    query = { from: filter.from }
                }
                if (filter.to) {
                    query = { to: filter.to }
                }
                if (filter.body) {
                    query.body = { $regex: filter.body, $options: 'i' }
                }

                const message = await messageSchema.find(query).populate('from')
                    .populate('to')
                return message;
            }

        } catch (e) {
            console.log("Error obteniendo el mensaje")
        }
    },

    //// IMPLEMENTACION PARA CASA
    //un usuario
    House: async (_, { id }) => {
        try {
            return house = await houseSchema.findById(id);
        } catch (e) {
            console.log()
        }
    },
    Houses: async () => {
        try {
            return await houseSchema.find();
        }
        catch (e) {
            console.log(e)
        }
    },  





    /////////***********************************/////////////////// 
    HouseByFilter: async (_, { filter }) => {
        try {
            let query = {};

            if (filter) {
                if (filter.city) {

                    query.city = { $regex: filter.city, $options: 'i' } // 'i' se utiliza para hacer una busqueda insesible de mayusculas y minusculas
                }
                if (filter.adress) {

                    query.adress = { $regex: filter.adress, $options: 'i' }
                }
                if (filter.state) {

                    query.state = { $regex: filter.state, $options: 'i' }
                }

                const houses = await houseSchema.find(query)
                return houses;
            }

        } catch (e) {
            console.log("failed in get this house")

        }
    },


}
module.exports = resolvers;