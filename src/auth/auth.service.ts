import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './dto/auth-reponse.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(signInDto: SignInDto): Promise<AuthResponseDto> {
    console.log('signIn', signInDto);
    const user = await this.userService.findByEmail(signInDto.email);
    console.log('user', user);

    if (!user || user == null || user == undefined)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    if (user && !compareSync(signInDto.password, user.password))
      throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      fullName: user.fullName,
      email: user.email,
    };
    console.log('payload', payload);
    const token = this.jwtService.sign(payload);
    console.log('token', token);

    return { token: token, expireIn: this.jwtExpirationTimeInSeconds };
  }
}
