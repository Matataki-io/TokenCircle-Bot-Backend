import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class AccessBearerToken {
    @PrimaryColumn()
    id!: number;

    @Column({ type: "text" })
    token!: string;
}
