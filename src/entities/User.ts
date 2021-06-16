import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { List } from "./List";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ unique: true })
  emailAddress!: string;

  @Column()
  password!: string;

  @Field()
  @OneToOne(() => List, (list) => list.userId)
  @JoinColumn()
  list!: List;
}
