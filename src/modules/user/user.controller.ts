import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from 'src/shared/responses/response';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Roles } from '../auth/role/role.decorator';
import { Role } from '../auth/role/role.enum';
import { RolesGuard } from '../auth/role/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getUser(): Promise<ApiResponse> {
    return this.userService.getUser();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @HttpCode(200)
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse> {
    return this.userService.update(id, updateUserDto);
  }
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/delete/:id')
  delete(@Param('id') id: string): Promise<ApiResponse> {
    return this.userService.delete(id);
  }
}
