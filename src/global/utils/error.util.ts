import { IResp } from "../api/_interfaces";

export class AppError<T = null> extends Error {
  constructor(message: string, public readonly parsedResp: IResp<T>) {
    super(message);
  }
}

export const errorHandler = (value?: unknown): string | undefined => {
  if (!value) return undefined;

  if (value instanceof Error) return value.message;

  if (value instanceof AppError)
    return JSON.stringify({ message: value.message, data: value.parsedResp });

  let stringified = "[Unable to stringify the thrown value]";

  try {
    stringified = JSON.stringify(value);
  } catch (err) {
    const errStr = JSON.stringify(err);
    const error = new Error(`Error value: ${stringified} \n ${errStr}`);

    return error.message;
  }

  return stringified;
};
