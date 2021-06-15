import { Resolver, Query } from "type-graphql";
import { Pokemon } from "../entities/Pokemon";

@Resolver()
export class PokemonResolver {
  @Query(() => [Pokemon], {
    description: "A list of pokemon",
  })
  async searchPokemon(): Promise<any> {
    // check redis cache
    // fetch pokemon search query
    // run shakespeare check
    return [
      {
        id: 1,
        title: "123",
        description: "123",
      },
    ];
  }
}
