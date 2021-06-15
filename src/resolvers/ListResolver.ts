import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { List } from "../entities/List";

@InputType()
class SavePokemonToListInput {
  @Field()
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;
}

@Resolver()
export class ListResolver {
  @Mutation(() => List, {
    description: "Add pokemon to the user's saved list",
  })
  async savePokemonToList(
    @Arg("input") input: SavePokemonToListInput
  ): Promise<any> {
    return List.create(input).save();
  }
  @Mutation(() => List, {
    description: "Remove pokemon from the user's saved list",
  })
  async removePokemonFromList(
    @Arg("input") input: SavePokemonToListInput
  ): Promise<any> {
    return List.create(input).save();
  }
}
