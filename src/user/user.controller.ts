import {
  Controller,
  Get,
  UseGuards,
  Put,
  Param,
  Body,
  BadRequestException,
  NotFoundException,
  Delete
} from "@nestjs/common";
import { BearerGuard } from "../auth/bearer.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(
      private readonly _service: UserService
  ) {}

  @UseGuards(BearerGuard)
  @Get('/')
  async getUsers() {
      const users = await this._service.getUsers();
      return { users }
  }

  @UseGuards(BearerGuard)
  @Get('/:id')
  async getUser(@Param('id') id: string) {
      if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
      const user = await this._service.get(Number(id));
      if (!user) throw new NotFoundException(`User ${id} is not found from the database`);
      return { user }
  }

  @UseGuards(BearerGuard)
  @Put('/:id')
  async addUser(
      @Param('id') id: string,
      @Body('walletAddress') walletAddress: string
  ) {
      if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
      if (!walletAddress) throw new BadRequestException('"walletAddress" should be not empty');
      const result = await this._service.create(Number(id), walletAddress);
      return { result }
  }
  
  @UseGuards(BearerGuard)
  @Delete('/:id')
  async deleteUserRecord(@Param('id') id: string) {
      if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
      await this._service.delete(Number(id))
      return { message: "delete successful." }
  }
}
