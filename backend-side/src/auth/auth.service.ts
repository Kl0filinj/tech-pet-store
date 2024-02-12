import { AuthEntity, RegistrationDto, TokensDto, hashData } from '@app/shared';
import { tryCatchPrismaWrapper } from '@app/shared/helpers/error-wrappers';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async registeration(dto: RegistrationDto) {
    const { password, email } = dto;
    const passwordHash = await hashData(password);
    const newAuth = await tryCatchPrismaWrapper<AuthEntity>(
      this.prisma.auth.create({
        data: {
          email,
          passwordHash,
        },
      }),
    );

    const tokens = await this.getTokens(newAuth.id, newAuth.email);
    await this.updateRtHash(newAuth.id, tokens.refresh_token);
    return tokens;
  }

  async getTokens(userId: string, email: string): Promise<TokensDto> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: string, refreshToken: string) {
    const rtHash = await hashData(refreshToken);

    await tryCatchPrismaWrapper(
      this.prisma.auth.update({
        where: { id: userId },
        data: {
          rtHash,
        },
      }),
    );
  }
}
