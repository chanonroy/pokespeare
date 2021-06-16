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
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ unique: true })
  emailAddress!: string;

  @Column()
  password!: string;

  @Field(() => [Pokemon], { nullable: true })
  @ManyToMany(() => Pokemon)
  @JoinTable()
  pokemon: Pokemon[];
}
