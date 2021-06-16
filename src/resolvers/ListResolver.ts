import { GraphQLError } from "graphql";
import {
  Arg,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getRepository } from "typeorm";
import { ServerContext } from "../@types";
import { List } from "../entities/List";
import { Pokemon } from "../entities/Pokemon";
import { isAuth } from "../middleware/isAuth";

@InputType()
class SavePokemonToListInput {
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
export class ListResolver {
  @Mutation(() => List, {
    description: "Add pokemon to the user's saved list",
  })
  @UseMiddleware(isAuth)
  async savePokemonToList(
    @Ctx() ctx: ServerContext,
    @Arg("input") input: SavePokemonToListInput
  ): Promise<List> {
    const userId = ctx.payload?.id;

    const list = await getRepository(List).findOne({
      relations: ["pokemon"],
      where: {
        userId,
      },
    });

    if (!list) {
      throw new GraphQLError("An error has occurred");
    }

    // saved pokemon already exists
    const pokemonId = input?.id;
    if (list.pokemon.find((pokemon) => pokemon.id === input.id)) {
      return list;
    }

    // get or create new pokemon
    const existingPokemon = await Pokemon.findOne({ where: { id: pokemonId } });

    if (!existingPokemon) {
      // pokemon record does not exist
      const newPokemon = await Pokemon.create({ ...input }).save();
      list.pokemon = [...list.pokemon, newPokemon];
    } else {
      // pokemon record already exists
      list.pokemon = [...list.pokemon, existingPokemon];
    }

    // save list with new pokemon relation
    await list.save();

    return list;
  }
  @Mutation(() => List, {
    description: "Remove pokemon from the user's saved list",
  })
  @UseMiddleware(isAuth)
  async removePokemonFromList(
    @Ctx() ctx: ServerContext,
    @Arg("input") input: RemovePokemonFromListInput
  ): Promise<List> {
    const userId = ctx.payload?.id;

    const list = await getRepository(List).findOne({
      relations: ["pokemon"],
      where: {
        userId,
      },
    });

    if (!list) {
      throw new GraphQLError("An error has occurred");
    }

    const idToRemove = input.id;

    // remove pokemon from existing list
    list.pokemon = list.pokemon.filter(
      (pokemon) => pokemon.id.toString() !== idToRemove
    );

    // save list
    await list.save();

    return list;
  }
}
