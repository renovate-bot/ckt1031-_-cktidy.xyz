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
  user?: User;
  signOut: () => void;
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
  const [hasError, setError] = useState(false);
  const [isInitalizing, setInitalizing] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(firebaseUserAtom);
  // const [userInfo, setUserInfo] = useState<User | undefined>();

  useEffect(() => {
    return onAuthStateChanged(
      auth,
      user => {
        const location = window.location;

        if (user) {
          if (location.pathname === '/login') {
            location.replace('/account');
          } else {
            setInitalizing(false);
          }

          setUserInfo(user);
        } else {
          if (location.pathname !== '/login') {
            location.replace('/login');
          } else {
            setInitalizing(false);
          }
          // eslint-disable-next-line unicorn/no-useless-undefined
          setUserInfo(undefined);
        }
      },
      () => {
        setError(true);
      },
    );
  }, [setUserInfo]);

  const logout = useCallback(() => {
    signOut(auth);
    // eslint-disable-next-line unicorn/no-useless-undefined
    setUserInfo(undefined);
  }, [setUserInfo]);

  return (
    <AuthContext.Provider value={{ user: userInfo, signOut: logout }}>
      {hasError && <LoadingPage />}
      {!disableLoading && isInitalizing ? <LoadingPage /> : <>{children}</>}
    </AuthContext.Provider>
  );
}
