import { Resolver, Query } from "type-graphql";
import { Pokemon } from "../entities/Pokemon";

@Resolver()
export class PokemonResolver {
  @Query(() => [Pokemon], {
    description: "A list of pokemon",
  })
  async searchPokemon(): Promise<any> {
    return [
      {
        id: 1,
        title: "123",
        description: "123",
      },
    ];
  }
}
