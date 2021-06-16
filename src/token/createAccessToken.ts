import * as jsonwebtoken from "jsonwebtoken";
import { User } from "../entities/User";
import { JWT_SECRET } from "../env";

export const createAccessToken = (user: User): string =>
  jsonwebtoken.sign(
    { id: user.id, emailAddress: user.emailAddress },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
