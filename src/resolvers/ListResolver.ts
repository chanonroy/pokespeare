import { Pokemon } from "../entities/Pokemon";
import { SavePokemonInput } from "../inputs/SavePokemonInput";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { List } from "../entities/List";

@Resolver()
export class ListResolver {
  @Query(() => List, {
    description: "Saved list of Pokemon",
  })
  async getList(): Promise<any> {
    return {
      id: 1,
      title: "123",
      description: "123",
    };
  }
  @Mutation(() => Pokemon)
  async savePokemon(@Arg("input") input: SavePokemonInput): Promise<any> {
    // const pokemon = Pokemon.create(input);
    // await pokemon.save();
    return {
      id: 1,
      title: "123",
      description: "123",
    };
  }
}
