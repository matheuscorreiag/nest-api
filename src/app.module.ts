import { Module } from '@nestjs/common';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { ReportsModule } from './modules/reports/reports.module';
import { ReportsController } from './modules/reports/reports.controller';
import { ReportsService } from './modules/reports/reports.service';

@Module({
  imports: [PostModule, AuthModule, ReportsModule],
  controllers: [UserController, AuthController, ReportsController],
  providers: [UserService, ReportsService],
})
export class AppModule {}
