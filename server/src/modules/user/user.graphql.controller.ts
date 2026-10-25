import { GraphQLFieldConfig, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, ThunkObjMap } from "graphql";
import { userType } from "../graphQl/graphQl.types";
import userResolvers from "./user.graphql.services"
import { graphQlValidation } from "../../middleware/validation.middleware";
import { sayHelloData, sayHelloSchema } from "./user.validation";
import { decodeToken } from "../../middleware/auth.middleware";

export const userQuery: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  getUsers: {
    type: new GraphQLList(userType),
    resolve: userResolvers.getUsers
  },
  sayHello: {
    type: new GraphQLObjectType({
      name: "sayHello",
      fields: {
        username: { type: GraphQLString },
        userAge: { type: GraphQLInt }
      }
    }),
    args: {
      name: { type: new GraphQLNonNull(GraphQLString)},
      age: { type: GraphQLInt}
    },
    resolve: async(parent, args: sayHelloData, ctx)=> {
      const name = args.name
      await graphQlValidation(sayHelloSchema, args)
      const { user } = await decodeToken(ctx)
      return {
        username: name,
        userAge: args.age
      }
    }
  }
};
