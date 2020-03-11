import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { type } from "os";
import { Token } from "./Token";

@Entity()
export class User {
  // Matataki User Id
  @PrimaryColumn()
  userId!: number;

  @Column()
  walletAddress!: string;

  @Column({ type: "bigint", nullable: true })
  telegramUid!: number | string;

  // 仅指用户发行的 Token
  @OneToMany(type => Token, token => token.issuer)
  issuedTokens!: Array<Token>;
}
