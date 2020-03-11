import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Token {
  // Matataki Token Id
  @PrimaryColumn()
  tokenId!: number;

  @Column()
  contractAddress!: string;

  @Column({ nullable: true })
  symbol! :string;

  // 目前 Matataki 用户与发行的Token是一对一关系
  // ManyToOne 这样设计是为了后续懒得改动结构而考虑
  @ManyToOne(type => User, user => user.issuedTokens)
  issuer!: User;
}
