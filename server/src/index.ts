import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { PokemonResolver } from "./resolvers/PokemonResolver";
import { UserResolver } from "./resolvers/UserResolver";

(async () => {
  const app = express();

  app.use(
    cors({
      origin: (_, callback) => {
        callback(null, true);
      },
      credentials: true,
    })
  );

  await createConnection();

  const apolloServer = new ApolloServer({
    introspection: true,
    schema: await buildSchema({
      resolvers: [UserResolver, PokemonResolver],
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
