import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsOptions: CorsOptions = {
    "origin": [/\.matataki\.io$/, /\.matataki\.cn$/, /\.frontenduse\.top$/, /\.mttk\.net$/],
    "allowedHeaders": ['Content-Type', 'Authorization'],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}