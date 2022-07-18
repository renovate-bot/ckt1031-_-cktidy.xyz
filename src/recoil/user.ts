import type { User } from 'firebase/auth';
import { atom } from 'recoil';

export const firebaseUserAtom = atom<User | undefined>({
  key: 'firebase-user',
  default: undefined,
  dangerouslyAllowMutability: true,
});
