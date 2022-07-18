import { AuthWrapperPage, useAuth } from '../components/context/auth';
import { DefaultMetaData } from '../components/seo';

function AccountDashboard() {
  const { signOut, user } = useAuth();

  return (
    <>
      <DefaultMetaData
        title="Account"
        description="Manage your account in cktidy.xyz"
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

export default function AccountPage() {
  return (
    <AuthWrapperPage>
      <AccountDashboard />
    </AuthWrapperPage>
  );
}
