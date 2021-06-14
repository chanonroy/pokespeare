import { InputType, Field } from "type-graphql";

@InputType()
export class SavePokemonInput {
  @Field()
  id: string;

  @Field()
  description!: string;
}
