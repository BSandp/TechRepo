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
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        avatar: { type: GraphQLString }
    }
})
const message = new GraphQLObjectType({
    name: "message",
    fields: {
        _id: { type: GraphQLID },
        body: { type: GraphQLString },
        from: { type: user },
        to: { type: user },
        readed: { type: GraphQLBoolean }
    }
})

const houseType = new GraphQLObjectType({
    name: "House",
    fields: () => ({
        id: { type: GraphQLID },
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
      name: {type: GraphQLString},
      lastname: {type: GraphQLString},
      email: {type: GraphQLString}
    }
  })
  
  
  const queries = {
    hello: {
      type: GraphQLString, // Tipo de respuesta
      resolve: resolvers.hello
    },
    User: {
      type: user,
      resolve: resolvers.User,
      args: {
        id: {type: GraphQLString}
      }
    },
    Users: {
      type: GraphQLList(user),
      resolve: resolvers.Users
    },
    UsersByFilter: {
      type: GraphQLList(user),
      resolve: resolvers.UsersByFilter,
      args: {
        filter: { type: UserFilterInput }
      }
    }
  }
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: queries
  })
  
  const schema = new GraphQLSchema({
    query: queryType
  })
  
  module.exports = schema