import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 4000;

const { url } = await startStandaloneServer(server, {
  app,
  listen: { port },
});

console.log(`  Server ready at: ${url}`);
