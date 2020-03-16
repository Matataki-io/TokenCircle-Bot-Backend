import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTokenDto {
    @IsNotEmpty()
    @ApiProperty()
    name!: string;

    @IsNotEmpty()
    @ApiProperty()
    symbol!: string;

    @IsNotEmpty()
    @ApiProperty()
    issuer!: number;

    @IsNotEmpty()
    @ApiProperty()
    contractAddress!: string;
}
