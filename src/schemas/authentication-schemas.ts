import Joi from 'joi';
import { SignInParams } from '@/services';

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const githubSignInSchema = Joi.object<githubSignInSchemaParams>({
  code: Joi.string().required(),
});

type githubSignInSchemaParams = {
  code: string;
};
