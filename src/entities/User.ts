import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  // Matataki User Id
  @PrimaryColumn()
  userId!: number;

  @Column()
  walletAddress!: string;

  @Column({ type: "bigint", nullable: true })
  telegramUid!: number | string;
}
