import { Arg, Query, Resolver } from "type-graphql";
import { Pokemon } from "../entities/Pokemon";
import { getPokemonFromName, parsePokemonInfo } from "../services/pokemon-api";

@Resolver()
export class PokemonResolver {
  @Query(() => Pokemon)
  async searchPokemon(@Arg("name") name: string): Promise<any> {
    // consider keeping in redis cache

    // Fetch information on pokemon
    const response = await getPokemonFromName(name);
    const pokemon = parsePokemonInfo(response);

    // Run through shakespearean translator
    // TODO: get proper API key
    // const translatedDescription = await shakespeareTranslate(name);

    // return results
    return {
      ...pokemon,
      description: pokemon?.description || "",
    };
  }
}
