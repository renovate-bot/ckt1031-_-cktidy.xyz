import type { Tag } from '$lib/sanity/schema';

interface Props {
  tags: Tag[];
}

export default function PostTagComponent({ tags }: Props) {
  return (
    <div className="base-border mt-7 border-t">
      <div className="mt-2">
        <span>Tags: </span>
        {tags.map(tag => (
          <span
            key={tag.name}
            className="mr-2 rounded bg-gray-500 px-1 py-0.5 text-white dark:bg-gray-600"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
