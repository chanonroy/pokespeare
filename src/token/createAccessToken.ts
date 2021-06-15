import * as jsonwebtoken from "jsonwebtoken";
import { User } from "../entities/User";

export const createAccessToken = (user: User): string =>
  jsonwebtoken.sign(
    { id: user.id, emailAddress: user.emailAddress },
    "secret", // TODO: make more durable
    { expiresIn: "30d" }
  );
