import { Arg, Query, Resolver } from "type-graphql";
import { Pokemon } from "../entities/Pokemon";
import { parsePokemonInfo, pokemonClient } from "../services/pokemonClient";

@Resolver()
export class PokemonResolver {
  @Query(() => Pokemon)
  async searchPokemon(@Arg("name") name: string) {
    // consider keeping in redis cache

    // Fetch information on pokemon
    const response = await pokemonClient(name);
    const pokemon = parsePokemonInfo(response);

    // Run through shakespearean translator

    // return results
    return pokemon;
  }
}
