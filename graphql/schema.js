const { GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLSchema } = require('graphql')
const resolvers = require('./resolvers')



const user = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString }
  }
})
const message = new GraphQLObjectType({
  name: "message",
  fields: {
    _id: { type: GraphQLString },
    body: { type: GraphQLString },
    from: { type: user },
    to: { type: user },
    readed: { type: GraphQLBoolean }
  }
})

const House = new GraphQLObjectType({
  name: "House",
  fields: () => ({
    id: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    size: { type: GraphQLInt },
    type: { type: GraphQLString },
    zip_code: { type: GraphQLString },
    code: { type: GraphQLString },
    rooms: { type: GraphQLInt },
    bathrooms: { type: GraphQLInt },
    price: { type: GraphQLInt },
    image: { type: GraphQLString },
  })
})

const UserFilterInput = new GraphQLInputObjectType({
  name: 'UserFilterInput',
  fields: {
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString }
  }
})
const messageFilterInput = new GraphQLInputObjectType({
  name: 'messageFilterInput',
  fields: {
    body: { type: GraphQLString },
    from: { type: GraphQLString },
    to: { type: GraphQLString }
  }
})
const HouseFilterInput = new GraphQLInputObjectType({
  name: 'HouseFilterInput',
  fields: {
    city: { type: GraphQLString },
    address: { type: GraphQLString },
    state: { type: GraphQLString }
  }
})

const queries = {
  hello: {
    type: GraphQLString, // Tipo de respuesta
    resolve: resolvers.hello
  },
  User: {
    type: user,
    resolve: resolvers.user,
    args: {
      id: { type: GraphQLString }
    }
  },
  Users: {
    type: new GraphQLList(user),
    resolve: resolvers.users
  },
  UsersByFilter: {
    type: new GraphQLList(user),
    resolve: resolvers.usersByFilter,
    args: {
      filter: { type: UserFilterInput }
    }
  },
  Message: {
    type: message,
    resolve: resolvers.Message,
    args: {
      id: { type: GraphQLString } // argumentos de
    }
  },
  Messages: {
    type: new GraphQLList(message),
    resolve: resolvers.Messages
  },
  MessagesByFilter: {
    type: new GraphQLList(message),
    resolve: resolvers.MessagesByFilter,
    args: {
      filter: { type: messageFilterInput }
    }
  },
  ///CASASSS SCHEMA DE BUSQUEDA
/* get house for id   */
  House: {
    type: House,
    resolve: resolvers.House,
    args: {
      id: { type: GraphQLString }
    }
  },
/* get all house  */
  Houses: {
    type: new GraphQLList(House),
    resolve: resolvers.Houses
    
  },
  /* get house for filter*/

  HouseByFilter: {
    type: new GraphQLList(House),
    resolve: resolvers.HouseByFilter,
    args: {
      filter: { type: HouseFilterInput }
    }
  },


}


const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: queries
})

const schema = new GraphQLSchema({
  query: queryType
})





module.exports = schema