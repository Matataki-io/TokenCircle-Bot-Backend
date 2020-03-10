import {
  Controller,
  UseGuards,
  Get,
  Param,
  BadRequestException,
  NotFoundException,
  Put,
  Body,
  Delete
} from "@nestjs/common";
import { TokenService } from "./token.service";
import { BearerGuard } from "src/auth/bearer.guard";

@Controller("token")
export class TokenController {
  constructor(private readonly _service: TokenService) {}

  @UseGuards(BearerGuard)
  @Get()
  async getUsers() {
      const tokens = await this._service.getTokens();
      return { tokens }
  }

  @UseGuards(BearerGuard)
  @Get('/:id')
  async getToken(@Param('id') id: string) {
      if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
      const user = await this._service.get(Number(id));
      if (!user) throw new NotFoundException(`Token ${id} is not found from the database`);
      return { user }
  }

  @UseGuards(BearerGuard)
  @Put('/:id')
  async addToken(
      @Param('id') id: string,
      @Body('contractAddress') contractAddress: string
  ) {
      if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
      if (!contractAddress) throw new BadRequestException('"contractAddress" should be not empty');
      const result = await this._service.create(Number(id), contractAddress);
      return { result }
  }

  @UseGuards(BearerGuard)
  @Delete('/:id')
  async deleteTokenRecord(@Param('id') id: string) {
      if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
      await this._service.delete(Number(id))
      return { message: "delete successful." }
  }
}
