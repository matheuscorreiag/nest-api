import { Module } from '@nestjs/common';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';

@Module({
  imports: [PostModule, AuthModule],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class AppModule {}
