import { DefaultMetaData } from '../components/seo';

export default function HomePage() {
  return (
    <>
      <DefaultMetaData
        description="A cool website by cktsun1031!"
        title="Home"
      />
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-4xl text-green-500">
          Will be released early August
        </p>
      </div>
    </>
  );
}
