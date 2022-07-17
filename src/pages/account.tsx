import { AuthUserPage, useAuth } from '../components/context/auth';
import { DefaultMetaData } from '../components/seo';

function AccountPage() {
  const { signOut, user } = useAuth();

  return (
    <>
      <DefaultMetaData
        description="Manage your account in cktidy.xyz"
        title="Account"
      />

      <div className="flex flex-col items-center">
        <h1 className="text-5xl">Account Data</h1>

        <div className="mt-2 text-3xl">
          <p>
            Hello,{' '}
            <span className="text-blue-500 dark:text-blue-300">
              {user?.displayName ?? user?.email}
            </span>
          </p>
        </div>

        <button className="button-normal mt-3" onClick={signOut} type="button">
          Sign Out
        </button>
      </div>
    </>
  );
}

export default AuthUserPage(AccountPage);
