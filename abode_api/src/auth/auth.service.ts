import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
const DUPLICATE_ENTRY = 'P2002';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    // eslint-disable-next-line prettier/prettier
  ) { }

  async signup(dto: AuthDto): Promise<User> {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
        },
      });
      delete user.hash;
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === DUPLICATE_ENTRY) {
          throw new ForbiddenException('Credentials Taken');
        }
      } else {
        throw new Error(e);
      }
    }
  }

  async signin(dto: AuthDto): Promise<{ [access_token: string]: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    const passwordMatch = await argon.verify(user.hash, dto.password);
    if (!passwordMatch) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    delete user.hash;
    return await this.signtoken(user.id, user.email);
  }

  async signtoken(
    userid: number,
    email: string,
  ): Promise<{ [access_token: string]: string }> {
    const payload = {
      sub: userid,
      email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '60m',
        secret: this.config.get('JWT_SECRET'),
      }),
    };
  }
}
