import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('LocalStrategy inisialize');

    super();
  }

  async validate(username: string, password: string) {
    console.log('LocalStrategy works');

    const user = await this.authService.validate({ username, password });
    if (!user) {
      console.log('user does not exist');
      throw new UnauthorizedException();
    }
    console.log('this is user', user);
    return user;
  }
}
