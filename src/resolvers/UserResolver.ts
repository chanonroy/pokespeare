import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

@InputType()
class SignUpInput {
  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  confirmPassword!: string;
}

@InputType()
class LoginInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User, {
    description: "Get the current user",
  })
  async getUser(): Promise<any> {
    const user = await User.findOne(1);
    return user;
  }

  @Mutation(() => User, {
    description: "Create new user and return userToken",
  })
  async signUp(@Arg("input") input: SignUpInput): Promise<any> {
    // validate
    // return userToken
    return {};
  }

  @Mutation(() => User, {
    description: "Use email and password to generate userToken",
  })
  async login(@Arg("input") input: LoginInput): Promise<any> {
    // invalidate session
    // return true
    return {};
  }

  @Mutation(() => User, {
    description: "End the user session",
  })
  async logout(): Promise<any> {
    // validate
    // return userToken
    return {};
  }
}
