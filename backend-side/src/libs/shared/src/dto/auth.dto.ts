import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class TokensDto {
  access_token: string;
  refresh_token: string;
}

export class RegistrationDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  secondName: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Max(32)
  @Min(6)
  password: string;
}
