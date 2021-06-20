import { Request, Response } from "express";

export interface DecodedAccessToken {
  id: string;
  emailAddress: string;
  iat: number;
  exp: number;
}

export interface ServerContext {
  req: Request;
  res: Response;
  payload?: DecodedAccessToken;
}

export enum ErrorStatusCodes {
  InvalidCredentials = "INVALID_CREDENTIALS",
  Conflict = "CONFLICT",
}
