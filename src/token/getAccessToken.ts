import * as jsonwebtoken from "jsonwebtoken";
import { User } from "src/entities/User";

export const createAccessToken = (user: User): string =>
  jsonwebtoken.sign(
    { id: user.id, email: user.emailAddress },
    "secret", // TODO: make more durable
    { expiresIn: "30d" }
  );
