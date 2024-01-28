import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getme(@Req() req: any) {
    return this.usersService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateById(@Req() req: any, @Body() updateStudentDto: UpdateUserDto) {
    return this.usersService.updateById(req.user.id, updateStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/wishes')
  getMyWishes(@Req() req: any) {
    return this.usersService.findWishes(req.user.id);
  }

  @Post('find')
  findMany(@Body() query: string) {
    return this.usersService.findMany(query);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/wishes')
  findWishes(@Param('username') username: string) {
    return this.usersService.findWishesByUsername(username);
  }
}
