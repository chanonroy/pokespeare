import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pokemon } from "./Pokemon";

@ObjectType()
@Entity()
export class List extends BaseEntity {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  userId!: string;

  @Field(() => [Pokemon], { nullable: true })
  @ManyToMany(() => Pokemon)
  @JoinTable()
  pokemon: Pokemon[];
}
