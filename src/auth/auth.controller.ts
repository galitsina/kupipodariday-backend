import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SigninDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    console.log('AuthController works');
    return this.authService.signin(signinDto);
  }

  @Post('signup')
  signup(@Body() signupDto: CreateUserDto) {
    console.log('AuthController works');
    return this.userService.signup(signupDto);
  }
}
