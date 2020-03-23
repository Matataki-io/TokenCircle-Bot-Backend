import {
    Controller, UseGuards,
    Get, Put, Delete, Patch,
    Param, Body,
    NotFoundException,
    HttpCode,
    ParseIntPipe,
    Res,
    HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { ApiSecurity, ApiTags, ApiOperation, ApiParam, ApiBody } from "@nestjs/swagger";
import { BearerGuard } from "../auth/bearer.guard";
import { UserService } from "./user.service";
import { CreateUserDto, UserUpdateTelegramDto } from "./dto";

@ApiSecurity("bearer")
@ApiTags("user")
@UseGuards(BearerGuard)
@Controller("user")
export class UserController {
    constructor(
        private readonly _service: UserService
    ) {}

    @Get("/")
    async getUsers() {
        return {
            data: await this._service.getUsers(),
        };
    }

    @Get("/:id")
    async getUser(@Param("id", ParseIntPipe) id: number) {
        const user = await this._service.get(id);
        if (!user) throw new NotFoundException(`User ${id} is not found from the database`);

        return {
            data: user,
        };
    }

    @Put("/:id")
    @ApiOperation({ summary: "Add User profile to the database for bot" })
    @ApiParam({ name: "id", description: "Matataki User ID" })
    async addUser(@Param("id", ParseIntPipe) id: number, @Body() dto: CreateUserDto, @Res() response: Response) {
        const { name, walletAddress } = dto;

        const record = await this._service.get(id);

        await this._service.create(id, name, walletAddress);

        response.status(record ? 200 : 201);
    }

    @Patch("/:id")
    async updateUser(@Param("id", ParseIntPipe) id: number, @Body() payload: any) {
        const { name, walletAddress, telegramUid } = payload;

        await this._service.update(id, {
            name,
            walletAddress,
            telegramUid
        });
    }

    @Delete("/:id")
    @HttpCode(204)
    async deleteUserRecord(@Param("id", ParseIntPipe) id: number) {
        await this._service.delete(id);
    }

    @Put("/:id/telegramUid")
    @ApiOperation({ summary: "User bind telegram account to the database" })
    @ApiParam({ name: "id", description: "Matataki User ID" })
    @ApiBody({ type: UserUpdateTelegramDto })
    async addUserTelegramUid(@Param("id", ParseIntPipe) id: number,
        @Body("telegramUid") telegramUid: string
    ) {
        await this._service.update(id, { telegramUid });
    }

    @Delete("/:id/telegramUid")
    @ApiOperation({ summary: "User unbind telegram UID from the database" })
    @ApiParam({ name: "id", description: "Matataki User ID" })
    async deleteUserTelegramUid(@Param("id", ParseIntPipe) id: number) {
        await this._service.update(id, { telegramUid: null });
    }
}
