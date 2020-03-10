import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class MttkUidToWallet {
    @PrimaryColumn()
    userId: number;

    @Column()
    walletAddress: string;
}