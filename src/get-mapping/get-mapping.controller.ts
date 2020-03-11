import { Controller, Get, UseGuards, Param, BadRequestException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BearerGuard } from 'src/auth/bearer.guard';
import { TokenService } from 'src/token/token.service';

@Controller('mapping')
export class GetMappingController {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) { }

    @Get('/telegramUidToUser/:telegramUid')
    @UseGuards(BearerGuard)
    async getUserByTelegramId(@Param('telegramUid') telegramUid: string) {
        if (isNaN(Number(telegramUid))) throw new BadRequestException('"telegramUid" should be a number');
        const user = await this.userService.getUserByTelegramUid(telegramUid)
        if (!user) throw new NotFoundException(`No user record for telegram uid: ${telegramUid}`)
        return { user }
    }

    // For Bot getMinetokenIdFromSymbol
    @Get('/symbolToToken/:symbol')
    @UseGuards(BearerGuard)
    async getTokenBySymbol(@Param('symbol') symbol: string) {
        const token = await this.tokenService.getTokenBySymbol(symbol)
        if (!token) throw new NotFoundException(`No record for Token symbol: ${symbol}`)
        return { token }
    }

    // getUserMinetoken
    @Get('/userToToken/:userId')
    @UseGuards(BearerGuard)
    async getTokenByUserId(@Param('userId') userId: string) {
        if (isNaN(Number(userId))) throw new BadRequestException('"telegramUid" should be a number');
        const user = await this.userService.get(Number(userId));
        if (!user) throw new NotFoundException(`No record for Token of the user: ${userId}`)
        return { issuedTokens: user.issuedTokens }
    }
}
