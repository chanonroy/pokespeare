import { GraphQLError } from "graphql";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
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
  @Field()
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

    const list = await List.findOne({ where: { userId } });

    if (!list) {
      throw new GraphQLError("An error has occurred");
    }

    // get or create new pokemon
    const pokemonId = input?.id;
    const existingPokemon = await Pokemon.findOne({ where: { id: pokemonId } });

    if (!existingPokemon) {
      // new pokemon record is required
      const newPokemon = await Pokemon.create({ ...input });
      list.pokemon = [...list.pokemon, newPokemon];
    } else {
      // pokemon already exists
      list.pokemon = [...list.pokemon, existingPokemon];
    }

    // save list
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

    const list = await List.findOne({ where: { userId } });

    if (!list) {
      throw new GraphQLError("An error has occurred");
    }

    const idToRemove = input.id;

    // remove pokemon from existing list
    list.pokemon = list.pokemon.filter((pokemon) => pokemon.id !== idToRemove);

    // save list
    await list.save();

    return list;
  }
}
