import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AccessBearerTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;
}
