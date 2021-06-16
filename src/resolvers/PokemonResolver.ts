import { GraphQLError } from "graphql";
import { Arg, Query, Resolver } from "type-graphql";
import { Pokemon } from "../entities/Pokemon";
import { getPokemonFromName, parsePokemonInfo } from "../services/pokemon-api";

@Resolver()
export class PokemonResolver {
  @Query(() => Pokemon)
  async searchPokemon(@Arg("name") name: string): Promise<any> {
    // consider keeping in redis cache

    // Fetch information on pokemon
    try {
      const response = await getPokemonFromName(name);
      const pokemon = parsePokemonInfo(response);

      return {
        ...pokemon,
        description: pokemon?.description || "",
      };
    } catch (err) {
      throw new GraphQLError("An error has occurred");
    }

    // Run through shakespearean translator
    // TODO: get proper API key
    // const translatedDescription = await shakespeareTranslate(name);
  }
}
