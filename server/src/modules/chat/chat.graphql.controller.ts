import { GraphQLBoolean } from "graphql";
import chatResolvers from "./chat.graphql.services";

export const chatQuery = {
  getChats: {
    type: GraphQLBoolean,
    resolve: chatResolvers.getChats
  }
}