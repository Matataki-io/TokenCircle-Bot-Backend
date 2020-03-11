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
import { ApiTags, ApiSecurity } from '@nestjs/swagger';

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
      const user = await this._service.get(Number(id));
      if (!user) throw new NotFoundException(`Token ${id} is not found from the database`);
      return { user }
  }

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

  @Delete('/:id')
  async deleteTokenRecord(@Param('id') id: string) {
      if (isNaN(Number(id))) throw new BadRequestException('"id" should be a number');
      await this._service.delete(Number(id))
      return { message: "delete successful." }
  }
}
