import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async validateToken(token: string): Promise<boolean> {
        console.info(token)
        return [
            "c11322fc-b413-4fd2-acd1-39af7d07f958",
            "9e8b27b0-0cca-4df0-8c14-625f71d3bfec"
        ].indexOf(token) >= 0;
    }
}
