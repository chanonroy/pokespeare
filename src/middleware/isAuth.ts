import { AuthenticationError } from "apollo-server-express";
import { verify } from "jsonwebtoken";
import { ServerContext, DecodedAccessToken } from "../@types";

import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<ServerContext> = ({ context }, next) => {
  const accessToken = context.req.headers["authorization"];

  if (!accessToken) {
    throw new AuthenticationError("A valid user token is required");
  }

  try {
    // receive token
    const token = accessToken.split(" ")[1];

    // verify that we signed the token
    const payload = verify(token, "secret"); // TODO: add secret key

    // add token to context
    context.payload = payload as DecodedAccessToken;
  } catch (err) {
    throw new AuthenticationError("A valid user token is required");
  }
  return next();
};
