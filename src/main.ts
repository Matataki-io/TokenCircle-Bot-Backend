import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { corsOptions } from "./cors.config";
require('dotenv').config()

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: corsOptions });

    const options = new DocumentBuilder()
        .setTitle('Matataki Token Circle Telegram Bot API')
        .setDescription('The API description')
        .setVersion('1.0')
        .addSecurity('bearer', {
            type: 'http',
            scheme: 'bearer',
        })
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
