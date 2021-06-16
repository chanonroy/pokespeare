import { isAuth } from "./isAuth";
import { mocked } from "ts-jest/utils";
import { verify } from "jsonwebtoken";

jest.mock("jsonwebtoken");

const mockNext = jest.fn();
const mockContext = (token: string) =>
  ({
    context: {
      req: {
        headers: {
          authorization: token,
        },
      },
    },
  } as any);

describe("isAuth", () => {
  it("passes when token is valid", () => {
    mocked(verify).mockImplementationOnce(() => ({ id: "123" }));
    isAuth(mockContext("Bearer token"), mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
  it("throws error when access token is not provided", () => {
    expect(() => isAuth(mockContext(""), mockNext)).toThrow();
    expect(mockNext).not.toHaveBeenCalled();
  });
  it("throws error when we're unable to verify token", () => {
    mocked(verify).mockImplementationOnce(() => {
      throw new Error();
    });
    expect(() => isAuth(mockContext(""), mockNext)).toThrow();
    expect(mockNext).not.toHaveBeenCalled();
  });
});
