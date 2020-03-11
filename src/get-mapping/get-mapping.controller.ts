import { Controller, Get, UseGuards, Param, BadRequestException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BearerGuard } from 'src/auth/bearer.guard';
import { TokenService } from 'src/token/token.service';
import { getTokenByUserIdResponse, getTokenBySymbolResponse,
    getTgUidToUserResponse } from "./response.types";
import { ApiTags, ApiSecurity, ApiOperation, ApiOkResponse,
     ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('mapping')
@ApiSecurity('bearer')
@UseGuards(BearerGuard)
@ApiUnauthorizedResponse({ description: "You will get 401 if request headers is without Bearer token."})
@Controller('mapping')
export class GetMappingController {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) { }

    @ApiOperation({ summary: 'Get User profile with user-binded Telegram ID`' })
    @ApiParam({ name: "telegramUid", description: "Telegram User ID" })
    @ApiOkResponse({ description: "Return the user of provided telegram uid", type: getTgUidToUserResponse})
    @Get('/telegramUidToUser/:telegramUid')
    async getUserByTelegramId(@Param('telegramUid') telegramUid: string) {
        if (isNaN(Number(telegramUid))) throw new BadRequestException('"telegramUid" should be a number');
        const user = await this.userService.getUserByTelegramUid(telegramUid)
        if (!user) throw new NotFoundException(`No user record for telegram uid: ${telegramUid}`)
        return { user }
    }

    @ApiOperation({ summary: 'should be used with `getMinetokenIdFromSymbol`' })
    @ApiParam({ name: "symbol", description: "Matataki Token Symbol (For now)" })
    @ApiOkResponse({ description: "Return the token of the symbol", type: getTokenBySymbolResponse})
    @Get('/symbolToToken/:symbol')
    async getTokenBySymbol(@Param('symbol') symbol: string) {
        const token = await this.tokenService.getTokenBySymbol(symbol)
        if (!token) throw new NotFoundException(`No record for Token symbol: ${symbol}`)
        return { token }
    }

    @ApiOperation({ summary: 'should be used with `getUserMinetoken`' })
    @ApiParam({ name: "userId", description: "Matataki User ID"})
    @ApiOkResponse({ description: "Return the token issued by user", type: getTokenByUserIdResponse})
    @Get('/userToToken/:userId')
    async getTokenByUserId(@Param('userId') userId: string) {
        if (isNaN(Number(userId))) throw new BadRequestException('"telegramUid" should be a number');
        const user = await this.userService.get(Number(userId));
        if (!user) throw new NotFoundException(`No record for Token of the user: ${userId}`)
        return { issuedTokens: user.issuedTokens }
    }
}
