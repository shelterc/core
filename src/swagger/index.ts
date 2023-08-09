import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
  .setTitle('nest api for swagger')
  .setDescription('搭配swagger构建shelter-nest应用')
  .setVersion('1.0')
  // .addBearerAuth()
  .addBearerAuth({
    type: 'http',
    in: 'headerss',
    name: 'authorization',
  })
  .build();

const createSwagger = (app) => {
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, document);
};
export default createSwagger;
