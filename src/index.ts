import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PokemonResolver } from "./resolvers/PokemonResolver";
import { ListResolver } from "./resolvers/ListResolver";
import { UserResolver } from "./resolvers/UserResolver";

(async () => {
  const app = express();

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PokemonResolver, ListResolver, UserResolver],
    }),
    context: ({ req }) => {
      const context = {
        req,
      };
      return context;
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("express server started");
  });
})();
