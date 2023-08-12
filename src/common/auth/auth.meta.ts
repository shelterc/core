import { SetMetadata } from '@nestjs/common';

export const IsAuth = () => SetMetadata('isAuth', true);
