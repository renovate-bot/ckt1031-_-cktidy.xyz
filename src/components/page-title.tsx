interface PageTitleProps {
  title: string;
  description: string;
}

export default function PageTitle(props: PageTitleProps) {
  return (
    <div className="mb-2 w-full">
      <h1 className="text-3xl font-bold">{props.title}</h1>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{props.description}</p>
    </div>
  );
}
