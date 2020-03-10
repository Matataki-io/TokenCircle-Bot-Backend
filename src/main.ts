import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { corsOptions } from "./cors.config";
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  await app.listen(process.env.SERVER_PORT || 3000);
}
bootstrap();
