import {
    Controller,
    UseGuards,
    Get,
    Param,
    BadRequestException,
    NotFoundException,
    Put,
    Body,
    Delete,
    Patch
} from "@nestjs/common";
import { TokenService } from "./token.service";
import { BearerGuard } from "src/auth/bearer.guard";
import { ApiTags, ApiSecurity, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('token')
@ApiSecurity('bearer')
@UseGuards(BearerGuard)
@Controller("token")
export class TokenController {
    constructor(private readonly _service: TokenService) {}

    @Get()
    async getUsers() {
        const tokens = await this._service.getTokens();
        return { tokens }
    }

    @Get('/:id')
    async getToken(@Param('id') id: string) {
        if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
        const token = await this._service.get(Number(id));
        if (!token) throw new NotFoundException(`Token ${id} is not found from the database`);
        return { token }
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Add Token profile to backend' })
    @ApiParam({ name: "id", description: "Telegram Token ID" })
    async addToken(@Param('id') id: string,
        @Body('name') name: string,
        @Body('symbol') symbol: string,
        @Body('issuer') issuer: number,
        @Body('contractAddress') contractAddress?: string,
    ) {
        if (isNaN(Number(id)))
            throw new BadRequestException('"id" should be a number');

        if (!contractAddress)
            throw new BadRequestException('"contractAddress" should be not empty');

        const result = await this._service.create(Number(id), name, symbol, issuer, contractAddress);
        return { result }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Edit Token profile to backend' })
    @ApiParam({ name: "id", description: "Telegram Token ID" })
    async modifyToken(@Param('id') id: string, @Body() payload: object) {
        if (isNaN(Number(id)))
            throw new BadRequestException('"id" should be a number');

        const result = await this._service.update(Number(id), payload);
        return { result }
    }

    @Delete('/:id')
    async deleteTokenRecord(@Param('id') id: string) {
        if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
        await this._service.delete(Number(id))
        return { message: "delete successful." }
    }
}
