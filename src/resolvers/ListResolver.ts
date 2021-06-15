import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { List } from "../entities/List";

@InputType()
class CreateListInput {
  @Field()
  description!: string;
}

@Resolver()
export class ListResolver {
  @Mutation(() => List)
  async savePokemonToList(@Arg("input") input: CreateListInput): Promise<any> {
    return List.create(input).save();
  }
  @Mutation(() => List)
  async removePokemonFromList(
    @Arg("input") input: CreateListInput
  ): Promise<any> {
    return List.create(input).save();
  }
}
