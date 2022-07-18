import { DefaultMetaData } from '../../components/seo';

export default function BlogHomePage() {
  return (
    <>
      <DefaultMetaData
        description="Blog contains all my life, tech and latest information!"
        title="Blog"
      />
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-4xl text-green-500">Coming soon...</p>
      </div>
    </>
  );
}
