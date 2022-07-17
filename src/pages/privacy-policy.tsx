import { DefaultMetaData } from '../components/seo';
import Link from '../components/text/link';

export default function PrivacyPolicyPage() {
  return (
    <>
      <DefaultMetaData
        description="Listing data we will be collecting, make sure a good user experience!"
        title="Privacy Policy"
      />

      <div className="flex flex-col items-center text-2xl">
        <h1 className="text-5xl">Privacy Policy</h1>

        <p className="mt-5 italic text-red-500">Last modified: 2022-07-07</p>

        <div className="mt-10 space-y-5">
          <div className="text-gray-500 dark:text-gray-400">
            <p className="text-green-500">
              Welcome for visiting &quot;
              <Link href="/">cktidy.xyz</Link>
              &quot; (hereinafter this website)
            </p>

            <p>
              To allow you to access this website with peace of mind, we hereby
              explain to you about the privacy policy and its protection to
              ensure your rights and interests.
            </p>

            <p className="text-red-500">Please read the following carefully:</p>
          </div>

          <h2 className="mt-3 mb-4 border-b-2 text-4xl">
            1. Information we collect
          </h2>

          <div className="text-gray-500 dark:text-gray-400">
            <p>
              LocalStorage: We use localstorage to save identity ID, messaging
              token and further logging files. They are primarily used for
              enhancing the user experience.
            </p>

            <br />

            <p>
              Cookies: We use cookies and related technologies to ensure the
              user experience, which are also a small brunch of files stored on
              local browser. We will be using for authentication and visiting
              records.
            </p>
          </div>

          <h2 className="mt-3 mb-4 border-b-2 text-4xl">
            2. Third Party Services
          </h2>

          <div className="text-gray-500 dark:text-gray-400">
            <p>
              This website contains hyperlinks to other websites, SDKs, and API
              which are not owned by cktidy.xyz.
            </p>

            <p>
              In general, they will be used to serval specified and intented
              services. Please be aware about that we are not responsible for
              the privacy policies of thier-party services.
            </p>
          </div>

          <h2 className="mt-3 mb-4 border-b-2 text-4xl">3. Amendment</h2>

          <p className="text-gray-500 dark:text-gray-400">
            Privacy Policy of this site subject to change responding to any
            requirements, all of mutation will be publicized here.
          </p>

          <h2 className="mt-3 mb-4 border-b-2 text-4xl">4. Contact Us</h2>

          <p className="text-gray-500 dark:text-gray-400">
            If any inquiries, issues you are going to lodge or any kind of data
            removal, please email us by the methods mentioned in Contact Me
            page.
          </p>
        </div>
      </div>
    </>
  );
}
