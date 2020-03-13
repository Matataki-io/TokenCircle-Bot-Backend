import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    walletAddress!: string;
}
