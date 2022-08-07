import type { User } from 'firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';

import { firebaseUserAtom } from '../../recoil/user';
import { auth } from '../../utils/firebase/sdk';
import { LoadingPage } from '../loading';

interface UserInfoData {
  userInfo?: User;
  logOut: () => void;
}

interface AuthUserPageOptions {
  disableLoading?: boolean;
}

const AuthContext = createContext<UserInfoData>({} as UserInfoData);

export const useAuth = () => useContext(AuthContext);

export function AuthWrapperPage({
  children,
  disableLoading = false,
}: PropsWithChildren<AuthUserPageOptions>) {
  const [isInitalizing, setInitalizing] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(firebaseUserAtom);

  // Listen to Auth State
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, user => {
      const location = window.location;

      if (user) {
        // route to private pages when they tried to pass login page
        if (location.pathname === '/login') {
          location.replace('/account');
        } else {
          setInitalizing(false);
        }

        if (userInfo?.uid !== user.uid) setUserInfo(user);
      } else {
        if (location.pathname !== '/login') {
          location.replace('/login');
        } else {
          setInitalizing(false);
        }
      }
    });

    return () => subscribe();
  }, [setUserInfo, userInfo?.uid]);

  const logOut = useCallback(async () => {
    await signOut(auth);
    setUserInfo(undefined);
  }, [setUserInfo]);

  return (
    <AuthContext.Provider value={{ userInfo, logOut }}>
      {!disableLoading && isInitalizing ? <LoadingPage /> : <>{children}</>}
    </AuthContext.Provider>
  );
}
