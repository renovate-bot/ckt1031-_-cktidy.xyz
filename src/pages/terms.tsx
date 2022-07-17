import { DefaultMetaData } from '../components/seo';

export default function TermsPage() {
  return (
    <>
      <DefaultMetaData
        description="A cool website by cktsun1031!"
        title="Terms"
      />

      <div className="flex flex-col items-center">
        <h1 className="text-5xl">Terms of Service</h1>
      </div>
    </>
  );
}
