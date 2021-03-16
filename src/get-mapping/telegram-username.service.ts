import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";

@Injectable()
export class TelegramUsernameService {
    constructor(
        @InjectConnection() private readonly connection: Connection
    ) {}

    async getUsername(id: number): Promise<string | null> {
        if (this.connection.options.type !== "postgres")
            throw new Error("Not postgres");

        const result = await this.connection.query(`SELECT username FROM ${this.connection.options.schema}.telegram_username WHERE id = $1;`, [id]);
        if (result.length === 0)
            return null;

        return result[0].username;
    }
}
