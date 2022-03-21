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
import { ApiTags } from '@nestjs/swagger';
import { ApiCommonResponse } from '../../shared/response.dto';

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
  @ApiTags('user')
  @Get()
  getUser(): Promise<ApiCommonResponse> {
    return this.userService.getUser();
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('user')
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiTags('user')
  @HttpCode(200)
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto): Promise<ApiCommonResponse> {
    return this.userService.create(createUserDto);
  }

  @ApiTags('user')
  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiCommonResponse> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiTags('user')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/delete/:id')
  delete(@Param('id') id: string): Promise<ApiCommonResponse> {
    return this.userService.delete(id);
  }
}
