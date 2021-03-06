import { Module } from '@nestjs/common';
import { GetMappingController } from './get-mapping.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { TokenService } from 'src/token/token.service';
import { Token } from 'src/entities/Token';
import { TelegramUsernameService } from './telegram-username.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Token])],
    controllers: [GetMappingController],
    providers: [UserService, TokenService, TelegramUsernameService]
})
export class GetMappingModule {}
