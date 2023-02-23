import Image from '$components/image';

export function generateMetadata() {
  return {
    title: 'Home',
    description: 'A cool website by ckt1031!',
  };
}

export default function HomePage() {
  return (
    <section>
      <div className="my-10 flex flex-col items-center justify-center">
        <Image
          alt="ckt"
          src="/media/avatar.png"
          className="h-32 w-32 rounded-full"
          height={150}
          width={150}
        />
        <h1 className="mt-4 text-4xl font-bold">Chan Ka Tsun</h1>
        <p className="mt-2 text-center text-lg font-medium italic text-gray-600 dark:text-gray-300">
          A secondary school (Form 5) student in Hong Kong.
        </p>
      </div>
    </section>
  );
}
