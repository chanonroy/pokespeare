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
import { getRepository } from "typeorm";
import { ServerContext } from "../@types";
import { Pokemon } from "../entities/Pokemon";
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

@InputType()
class SavePokemonInput {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;
}

@InputType()
class RemovePokemonFromListInput {
  @Field(() => String)
  id!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User, {
    description: "Get the current user",
  })
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: ServerContext): Promise<User | null> {
    const id = ctx.payload?.id;

    const user = await getRepository(User).findOne({
      relations: ["pokemon"],
      where: {
        id,
      },
    });

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
        pokemon: [],
      }).save();

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

  @Mutation(() => User, {
    description: "Add pokemon to the user's saved list",
  })
  @UseMiddleware(isAuth)
  async savePokemon(
    @Ctx() ctx: ServerContext,
    @Arg("input") input: SavePokemonInput
  ): Promise<User> {
    const id = ctx.payload?.id;

    const user = await getRepository(User).findOne({
      relations: ["pokemon"],
      where: {
        id,
      },
    });

    if (!user) {
      throw new GraphQLError("An error has occurred");
    }

    // saved pokemon already exists
    const pokemonId = input?.id;
    if (user.pokemon.find((pokemon) => pokemon.id === input.id)) {
      return user;
    }

    // get or create new pokemon
    const existingPokemon = await Pokemon.findOne({ where: { id: pokemonId } });

    if (!existingPokemon) {
      // pokemon record does not exist
      const newPokemon = await Pokemon.create({ ...input }).save();
      user.pokemon = [...user.pokemon, newPokemon];
    } else {
      // pokemon record already exists
      user.pokemon = [...user.pokemon, existingPokemon];
    }

    // save user with new pokemon relation
    await user.save();

    return user;
  }

  @Mutation(() => User, {
    description: "Remove pokemon from the user's saved list",
  })
  @UseMiddleware(isAuth)
  async removePokemon(
    @Ctx() ctx: ServerContext,
    @Arg("input") input: RemovePokemonFromListInput
  ): Promise<User> {
    const userId = ctx.payload?.id;

    const user = await getRepository(User).findOne({
      relations: ["pokemon"],
      where: {
        userId,
      },
    });

    if (!user) {
      throw new GraphQLError("An error has occurred");
    }

    const idToRemove = input.id;

    // remove pokemon from existing list
    user.pokemon = user.pokemon.filter(
      (pokemon) => pokemon.id.toString() !== idToRemove
    );

    // save list
    await user.save();

    return user;
  }
}
