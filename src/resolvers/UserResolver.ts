import { AuthenticationError } from "apollo-server-express";
import { compare, hash } from "bcryptjs";
import { GraphQLError } from "graphql";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { ServerContext } from "../@types";
import { List } from "../entities/List";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { createAccessToken } from "../token/createAccessToken";

// TODO: consider putting these into their own folders
@InputType()
class SignUpInput {
  @Field()
  emailAddress!: string;

  @Field()
  password!: string;
}

@InputType()
class LoginInput {
  @Field()
  emailAddress!: string;

  @Field()
  password!: string;
}

@ObjectType()
class LoginOutput {
  @Field()
  user!: User;

  @Field()
  accessToken!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User, {
    description: "Get the current user",
  })
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: ServerContext): Promise<User | null> {
    const id = ctx.payload?.id;

    const user = await User.findOne(id, { relations: ["list"] });

    if (!user) {
      throw new AuthenticationError("You are not authorized to access");
    }

    return user;
  }

  @Mutation(() => LoginOutput, {
    description: "Create new user and return userToken",
  })
  async signUp(@Arg("input") input: SignUpInput): Promise<LoginOutput> {
    const { emailAddress, password } = input;

    const user = await User.findOne({ where: { emailAddress } });

    if (user) {
      throw new GraphQLError("User already exists");
    }

    const hashedPassword = await hash(password, 12);

    try {
      // create new user
      const user = await User.create({
        emailAddress,
        password: hashedPassword,
      }).save();

      // create list for that user
      const list = await List.create({ userId: user.id, pokemon: [] }).save();

      // save list to that user
      user.list = list;
      user.save();

      const accessToken = createAccessToken(user);

      return {
        user,
        accessToken,
      };
    } catch {
      throw new GraphQLError("An error has occurred");
    }
  }

  @Mutation(() => LoginOutput, {
    description: "Use email and password to receive an accessToken",
  })
  async login(@Arg("input") input: LoginInput): Promise<LoginOutput> {
    const { emailAddress, password } = input;

    const user = await User.findOne({ where: { emailAddress } });

    if (!user) {
      throw new GraphQLError("Your email and password combo is incorrect");
    }

    const verify = await compare(password, user.password);

    if (!verify) {
      throw new GraphQLError("Your email and password combo is incorrect");
    }

    const accessToken = createAccessToken(user);

    return {
      user,
      accessToken,
    };
  }
}
