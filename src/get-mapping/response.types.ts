import { ApiProperty } from '@nestjs/swagger';

class Token {
    @ApiProperty()
    tokenId: number;
    @ApiProperty()
    contractAddress: string;
    @ApiProperty()
    symbol: string;
}
class User {
    @ApiProperty()
    "userId": number;
    @ApiProperty()
    "walletAddress": string;
    @ApiProperty()
    "telegramUid": string;
}
export class getTokenByUserIdResponse {
    @ApiProperty({ type: Token, default: [], isArray: true })
    issuedTokens: Token[] = [];
}

export class getTokenBySymbolResponse {
    @ApiProperty()
    token: Token;
}

export class getTgUidToUserResponse {
    @ApiProperty()
    user: User;
}