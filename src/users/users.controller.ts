import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }

  //get all users
  // @Get()
  // async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //   const student = await this.usersService.findById(id);
  //   if (!student) {
  //     throw new NotFoundException('Student not found');
  //   }
  //   return student;
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  //deleting:
  // @Delete(':id')
  // async removeById(@Param('id', ParseIntPipe) id: number) {
  //   const student = await this.usersService.findById(id);
  //   if (!student) {
  //     throw new NotFoundException('Student not found');
  //   }

  //   await this.usersService.removeById(id);
  //   // Возвращаем сообщение об успешном удалении или что-то подобное
  //   return { message: 'Student removed successfully' };
  // }

  //updating:
  // @Patch(':id')
  // async updateById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateStudentDto: UpdateUserDto,
  // ): Promise<User> {
  //   const existingStudent = await this.usersService.findById(id);
  //   if (!existingStudent) {
  //     throw new NotFoundException('Student not found');
  //   }
  //   // Обновляем информацию о студенте
  //   await this.usersService.updateById(id, updateStudentDto);
  //   // Возвращаем обновленного студента
  //   return await this.usersService.findById(id);
  // }
}
