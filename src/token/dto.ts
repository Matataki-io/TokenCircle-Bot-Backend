import { IsNotEmpty } from 'class-validator';

export class CreateTokenDto {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    symbol!: string;

    @IsNotEmpty()
    issuer!: number;

    @IsNotEmpty()
    contractAddress!: string;
}
