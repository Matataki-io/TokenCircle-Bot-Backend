import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    name!: string;

    @IsNotEmpty()
    @ApiProperty()
    walletAddress!: string;
}
