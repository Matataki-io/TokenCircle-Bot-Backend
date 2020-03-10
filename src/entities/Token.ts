import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Token {
  // Matataki Token Id
  @PrimaryColumn()
  tokenId: number;

  @Column()
  contractAddress: string;
}
