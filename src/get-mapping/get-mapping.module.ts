import { Module } from '@nestjs/common';
import { GetMappingController } from './get-mapping.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GetMappingController],
  providers: [UserService]
})
export class GetMappingModule {}
