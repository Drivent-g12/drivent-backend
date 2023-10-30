import { Router } from 'express';
import { singInPost, githubSignInPost } from '@/controllers';
import { getGithubAccessToken, getGithubUserData, validateBody } from '@/middlewares';
import { signInSchema, githubSignInSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);
authenticationRouter.post(
  '/github',
  validateBody(githubSignInSchema),
  getGithubAccessToken,
  getGithubUserData,
  githubSignInPost,
);

export { authenticationRouter };
