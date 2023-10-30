import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { authenticationService, SignInParams, userService } from '@/services';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  const result = await authenticationService.signIn({ email, password });

  return res.status(httpStatus.OK).send(result);
}

export async function githubSignInPost(req: Request, res: Response) {
  const githubEmail = res.locals.githubEmail;

  // look for email in database
  // if found, log in without password
  // if not found, create a new user and then log in without password

  const userWithEmailBoolean = await userService.validateUserWithEmail(githubEmail);

  if (!userWithEmailBoolean) {
    // create user and then log in without password
    // throws error for now -> database needs to be fixed so password is nullable
    // maybe generate new complex password instead so no db changes are needed?

    throw Error;
  }

  const result = await authenticationService.signInWithoutPassword(githubEmail);
  return res.status(httpStatus.OK).send(result);
}
