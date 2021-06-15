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
  id: string;

  @Field({ nullable: true })
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column()
  userId: string;

  @Field(() => [Pokemon])
  @ManyToMany(() => Pokemon)
  @JoinTable()
  pokemon: Pokemon[];
}
