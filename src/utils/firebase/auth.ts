import type { AuthError } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

import { auth } from './sdk';

export async function userLoginCredential(username: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, username, password);
    return true;
  } catch {
    return false;
  }
}

export async function signWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);

    return 'SUCCESS';
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return (error as AuthError).code;
    }
  }
}

export function checkAuthState(): string | undefined {
  return auth.currentUser?.uid ?? undefined;
}
