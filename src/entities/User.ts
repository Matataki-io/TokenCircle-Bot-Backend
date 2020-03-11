import { Entity, Column, PrimaryColumn, OneToMany, Index } from "typeorm";
import { type } from "os";
import { Token } from "./Token";

@Entity()
export class User {
    // Matataki User Id
    @PrimaryColumn()
    userId!: number;

    @Column({ type: "text", nullable: true })
    name!: string | null;

    @Column({ type: "text" })
    walletAddress!: string;

    @Column({ type: "bigint", nullable: true })
    @Index("user_telegramUid_idx", { unique: true })
    telegramUid!: number | string | null;

    // 仅指用户发行的 Token
    @OneToMany(type => Token, token => token.issuer)
    issuedTokens!: Array<Token>;
}
