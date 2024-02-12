import { HttpException, NotImplementedException } from '@nestjs/common';

export async function tryCatchPrismaWrapper<T>(
  arg: any,
  exception = '',
): Promise<T> {
  let result: T;
  try {
    result = await arg;
  } catch (err) {
    console.log(err);
    throw new NotImplementedException(exception, {
      cause: err,
    });
  }

  return result;
}

export async function tryCatchPrismaExceptionWrapper<T>(
  arg: any,
  exception: HttpException,
): Promise<T> {
  let result: T;
  try {
    result = await arg;
  } catch (err) {
    console.log(err);

    throw exception;
  }

  return result;
}
