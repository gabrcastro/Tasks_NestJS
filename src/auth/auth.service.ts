import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthRepository } from './auth.repository';
import { AuthResponseDto } from './dto/auth-reponse.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  signin(signInDto: SignInDto): Promise<AuthResponseDto> {
    return this.authRepository.signIn(signInDto);
  }
}
