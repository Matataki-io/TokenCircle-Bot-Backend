import { Module } from '@nestjs/common';
import { BearerStrategy } from './bearer.strategy';
import { AuthService } from './auth.service';

@Module({
    providers: [BearerStrategy, AuthService]
})
export class AuthModule { }
