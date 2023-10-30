import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { eventsService } from '@/services';
import { cannotEnrollBeforeStartDateError, duplicatedEmailError } from '@/errors';
import { userRepository } from '@/repositories';

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  await canEnrollOrFail();

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

export async function createUserWithouPassword(email: string): Promise<User> {
  await canEnrollOrFail();

  // technically unecessary as the function is only being executed if there's no matching email to begin with
  // but I'll keep it just for the sake of avoiding issues were this function to be used in another way in the future
  await validateUniqueEmailOrFail(email);

  return userRepository.create({
    email,
    password: null,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function canEnrollOrFail() {
  const canEnroll = await eventsService.isCurrentEventActive();
  if (!canEnroll) {
    throw cannotEnrollBeforeStartDateError();
  }
}

async function validateUserWithEmail(email: string) {
  const userWithEmail = await userRepository.findByEmail(email);
  return !!userWithEmail;
}

export type CreateUserParams = Pick<User, 'email' | 'password'>;

export const userService = {
  createUser,
  validateUserWithEmail,
  createUserWithouPassword,
};
