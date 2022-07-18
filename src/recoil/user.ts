import type { User } from 'firebase/auth';
import { atom } from 'recoil';

export const firebaseUserAtom = atom<User | undefined>({
  key: 'firebaseUser',
  default: undefined,
});
