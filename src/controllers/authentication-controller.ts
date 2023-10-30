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
  // if not found, create a new user
  // logs the user in after

  const userWithEmailBoolean = await userService.validateUserWithEmail(githubEmail);

  if (!userWithEmailBoolean) {
    const user = await userService.createUserWithouPassword(githubEmail);
  }

  const result = await authenticationService.signInWithoutPassword(githubEmail);
  return res.status(httpStatus.OK).send(result);
}
