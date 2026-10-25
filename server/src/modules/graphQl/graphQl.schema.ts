import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userType } from "./graphQl.types";
import { chatQuery } from "../chat/chat.graphql.controller";
import { userQuery } from "../user/user.graphql.controller";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "query",
    fields: {
      ...userQuery,
      ...chatQuery,
    },
  }),
});

export default schema;
