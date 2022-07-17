import type { User } from 'firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { createContext, FC, useContext, useEffect, useState } from 'react';

import { auth } from '../../utils/firebase/sdk';
import { LoadingPage } from '../loading';

interface UserInfoData {
  user?: User;
  signOut: () => void;
}

interface AuthUserPageOptions {
  disableLoading?: boolean;
  redirectToLoginPage?: boolean;
}

const AuthContext = createContext<UserInfoData>({} as UserInfoData);

export const useAuth = () => useContext(AuthContext);

export function AuthUserPage(
  ChildComponent: FC,
  {
    disableLoading = false,
    redirectToLoginPage = true,
  }: AuthUserPageOptions = {},
) {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  function AuthUserContext() {
    const [userInfo, setUserInfo] = useState<User | undefined>();
    const [isLoading, setLoadingState] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          if (window.location.pathname == '/login') {
            window.location.replace('/account');
          } else {
            setLoadingState(false);
          }

          setUserInfo(user);
        } else {
          if (redirectToLoginPage && window.location.pathname !== '/login') {
            window.location.replace('/login');
          } else {
            setLoadingState(false);
          }
          // eslint-disable-next-line unicorn/no-useless-undefined
          setUserInfo(undefined);
        }
      });
      return () => unsubscribe();
    }, []);

    const logout = () => {
      signOut(auth);
      // eslint-disable-next-line unicorn/no-useless-undefined
      setUserInfo(undefined);
    };

    return (
      <AuthContext.Provider value={{ user: userInfo, signOut: logout }}>
        {!disableLoading && isLoading ? <LoadingPage /> : <ChildComponent />}
      </AuthContext.Provider>
    );
  }

  hoistNonReactStatics(AuthUserContext, ChildComponent);

  return AuthUserContext;
}
