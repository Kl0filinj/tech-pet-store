import * as bcrypt from 'bcrypt';

export const hashData = async (data: string): Promise<string> =>
  bcrypt.hash(data, 10);

export const compareHash = async (data: string, hash: string) =>
  bcrypt.compare(data, hash);
