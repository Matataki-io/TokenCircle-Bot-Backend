import {
    Controller, UseGuards,
    Get, Put, Delete, Patch,
    Param, Body,
    BadRequestException,
    NotFoundException
} from "@nestjs/common";
import { ApiSecurity, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { BearerGuard } from "../auth/bearer.guard";
import { UserService } from "./user.service";

@ApiSecurity('bearer')
@ApiTags('user')
@UseGuards(BearerGuard)
@Controller("user")
export class UserController {
    constructor(
        private readonly _service: UserService
    ) {}

    @Get('/')
    async getUsers() {
        const users = await this._service.getUsers();
        return { users }
    }

    @Get('/:id')
    async getUser(@Param('id') id: string) {
        if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
        const user = await this._service.get(Number(id));
        if (!user) throw new NotFoundException(`User ${id} is not found from the database`);
        return { user }
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Add User profile to the database for bot' })
    @ApiParam({ name: "id", description: "Matataki User ID" })
    async addUser(@Param('id') id: string,
        @Body('walletAddress') walletAddress: string,
        @Body('username') username: string
    ) {
        if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
        if (!walletAddress) throw new BadRequestException('"walletAddress" should be not empty');
        const result = await this._service.create(Number(id), username, walletAddress);
        return { result }
    }

    @Patch('/:id')
    async updateUser(
    @Param('id') id: string,
        @Body() partialData: object
    ) {
        if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
        if (!partialData) throw new BadRequestException('"partialData" should be a proper object');
        try {
            const result = await this._service.update(Number(id), partialData);
            return { result }
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Delete('/:id')
    async deleteUserRecord(@Param('id') id: string) {
        if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
        await this._service.delete(Number(id))
        return { message: "delete successful." }
    }
}
