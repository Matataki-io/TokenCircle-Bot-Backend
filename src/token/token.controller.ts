import {
    Controller,
    UseGuards,
    Get,
    Param,
    NotFoundException,
    Put,
    Body,
    Delete,
    Patch,
    HttpCode,
    ParseIntPipe,
    Res,
} from "@nestjs/common";
import { Response } from "express";
import { TokenService } from "./token.service";
import { BearerGuard } from "src/auth/bearer.guard";
import { ApiTags, ApiSecurity, ApiOperation, ApiParam } from "@nestjs/swagger";
import { CreateTokenDto } from "./dto";

@ApiTags("token")
@ApiSecurity("bearer")
@UseGuards(BearerGuard)
@Controller("token")
export class TokenController {
    constructor(private readonly _service: TokenService) {}

    @Get()
    async getAllTokens() {
        return {
            data: await this._service.getTokens(),
        };
    }

    @Get("/:id")
    async getToken(@Param("id", ParseIntPipe) id: number) {
        const token = await this._service.get(id);
        if (!token) throw new NotFoundException(`Token ${id} is not found from the database`);

        return {
            data: token,
        };
    }

    @Put("/:id")
    @ApiOperation({ summary: "Add Token profile to backend" })
    @ApiParam({ name: "id", description: "Telegram Token ID" })
    async addToken(@Param("id", ParseIntPipe) id: number, @Body() dto: CreateTokenDto, @Res() response: Response) {
        const { name, symbol, issuer, contractAddress } = dto;

        const record = await this._service.get(id)

        await this._service.create(id, name, symbol, issuer, contractAddress);

        response.status(record ? 200 : 201);
    }

    @Patch("/:id")
    @ApiOperation({ summary: "Edit Token profile to backend" })
    @ApiParam({ name: "id", description: "Telegram Token ID" })
    async modifyToken(@Param("id", ParseIntPipe) id: number, @Body() payload: any) {
        const { name, symbol, issuer, contractAddress } = payload;

        await this._service.update(id, {
            name,
            symbol,
            issuer,
            contractAddress,
        });
    }

    @Delete("/:id")
    @HttpCode(204)
    async deleteTokenRecord(@Param("id", ParseIntPipe) id: number) {
        await this._service.delete(id);
    }
}
