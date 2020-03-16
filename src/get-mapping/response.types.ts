import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TokenResponse {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    contractAddress!: string;
    @ApiProperty()
    symbol!: string;
}
export class UserResponse {
    @ApiProperty()
    id!: number;
    @ApiProperty()
    name!: string;
    @ApiProperty()
    walletAddress!: string;
    @ApiPropertyOptional()
    telegramUid!: string;
}
