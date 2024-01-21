import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SigninDto } from './dto/signin.dto';
import { compare as compareHash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signin(signinDto: SigninDto) {
    const user = await this.usersService.findOne(signinDto.username);
    const payload = { id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validate(signinDto: SigninDto) {
    const user = await this.usersService.findOneWithPassword(
      signinDto.username,
    );

    if (!user || !(await compareHash(signinDto.password, user.password))) {
      throw new UnauthorizedException('Неправильный логин или пароль');
    }
    return user;
  }
}
