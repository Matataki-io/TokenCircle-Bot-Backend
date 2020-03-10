import { Controller, Get, UseGuards, Param, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BearerGuard } from 'src/auth/bearer.guard';

@Controller('mapping')
export class GetMappingController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get('/telegramUidToUser/:telegramUid')
    @UseGuards(BearerGuard)
    async getUserByTelegramId(@Param('telegramUid') telegramUid: string) {
        if (isNaN(Number(telegramUid))) throw new BadRequestException('"telegramUid" should be a number');
        const user = await this.userService.getUserByTelegramUid(telegramUid)
        if (!user) throw new NotFoundException(`No user record for telegram uid: ${telegramUid}`)
        return { user }
    }
}
