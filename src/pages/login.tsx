import { AuthErrorCodes } from 'firebase/auth';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

import { AuthWrapperPage } from '../components/context/auth';
import { DefaultMetaData } from '../components/seo';
import { signWithGoogle } from '../utils/firebase/auth';

function OauthLoginBlock() {
  const loginAction = useCallback(async () => {
    const status = await signWithGoogle();
    if (status === AuthErrorCodes.USER_DISABLED) {
      toast.error('Account Disabled!');
    }
  }, []);

  return (
    <div className="mt-3 flex flex-col items-center border-t-2 border-gray-300 dark:border-gray-600">
      <p className="mt-2">OAuth login:</p>
      <button
        className="button-normal mt-2 flex flex-row items-center"
        onClick={loginAction}
        type="button">
        <div className="mr-2 text-2xl">
          <FcGoogle />
        </div>
        Sign with Google
      </button>
    </div>
  );
}

function LoginBlock() {
  return (
    <div className="min-w-sm mt-3 mb-5 block rounded-xl bg-zinc-200 p-5 text-center shadow-lg dark:bg-zinc-800 md:mt-10 md:mb-0">
      <h1 className="text-4xl">Login to access secret features</h1>
      <div className="text-orange-500">
        <h3 className="mt-2 text-3xl">&#8226; Comment Access</h3>
        <h3 className="mt-2 text-3xl">&#8226; Communitcation</h3>
      </div>
      <OauthLoginBlock />
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <DefaultMetaData
        description="A cool website by cktsun1031!"
        title="Login"
      />
      <AuthWrapperPage>
        <LoginBlock />
      </AuthWrapperPage>
    </>
  );
}
