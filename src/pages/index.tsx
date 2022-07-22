import Image from '../components/image';
import { DefaultMetaData } from '../components/seo';

export default function HomePage() {
  return (
    <>
      <DefaultMetaData
        description="A cool website by cktsun1031!"
        title="Home"
      />
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-4xl text-green-500">what is this?</p>
        <Image
          lightboxEnabled
          src="/icons/android-chrome-192x192.png"
          alt={''}
          height={60}
          width={60}
        />
      </div>
    </>
  );
}
