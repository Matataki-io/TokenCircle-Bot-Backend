import {
    Controller, UseGuards,
    Get, Put, Delete, Patch,
    Param, Body,
    NotFoundException,
    HttpCode,
    ParseIntPipe,
    Res,
} from "@nestjs/common";
import { Response } from "express";
import { ApiSecurity, ApiTags, ApiOperation, ApiParam } from "@nestjs/swagger";
import { BearerGuard } from "../auth/bearer.guard";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto";

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
        const { name, walletAddress } = payload;

        await this._service.update(id, {
            name,
            walletAddress,
        });
    }

    @Delete("/:id")
    @HttpCode(204)
    async deleteUserRecord(@Param("id", ParseIntPipe) id: number) {
        await this._service.delete(id);
    }
}
