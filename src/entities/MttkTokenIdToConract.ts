import { Entity,PrimaryColumn, Column } from "typeorm";

@Entity()
export class MttkTokenIdToConract {
    @PrimaryColumn()
    tokenId: number;

    @Column()
    contractAddress: string;
}