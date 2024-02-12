//       id           String    @id @unique @default(uuid())
//   createdAt    DateTime  @default(now())
//   updatedAt    DateTime?
//   email        String    @unique
//   passwordHash String
//   rtHash       String?
export class AuthEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  passwordHash: string;
  rtHash: string;
}
