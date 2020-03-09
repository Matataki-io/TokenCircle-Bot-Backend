import { Controller, Get, UseGuards } from '@nestjs/common';
import { BearerGuard } from "../auth/bearer.guard";

@Controller('user')
export class UserController {
    @UseGuards(BearerGuard)
    @Get('/')
    async getUsers() {
        return { foo: "bar" }
    }
}
