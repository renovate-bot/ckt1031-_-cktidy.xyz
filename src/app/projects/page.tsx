import type { Metadata } from 'next/types';

import { IconBrandJavascript, IconBrandKotlin, IconBrandTypescript } from '@tabler/icons-react';
import sAgo from 's-ago';
import { z } from 'zod';

import PageTitle from '$components/page-title';
import { config } from '$lib/constants';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'You can have a quick look of what projects I have been working on.',
};

const GithubRepositoryDataSchema = z.object({
  name: z.string(),
  language: z.string(),
  description: z.string(),
  pushed_at: z.coerce.date(),
});

const getIconByLanguage = (language: string) => {
  switch (language) {
    case 'TypeScript': {
      return <IconBrandTypescript />;
    }
    case 'JavaScript': {
      return <IconBrandJavascript />;
    }
    case 'Kotlin': {
      return <IconBrandKotlin />;
    }
    default: {
      return <IconBrandTypescript />;
    }
  }
};

const getProjects = async () => {
  const projects = await Promise.all(
    config.projects.map(async project => {
      const response = await fetch(project.github.replace('github.com', 'api.github.com/repos'));

      if (!response.ok) {
        throw new Error(`Failed to fetch ${project.github}`);
      }

      const _json = await response.json();
      const repoInfo = GithubRepositoryDataSchema.parse(_json);

      return {
        ...project,
        name: repoInfo.name,
        description: repoInfo.description,
        pushed_at: repoInfo.pushed_at,
        language: repoInfo.language,
        icon: getIconByLanguage(repoInfo.language),
      };
    }),
  );

  // Sort projects by last updated date
  return projects.sort((a, b) => b.pushed_at.getTime() - a.pushed_at.getTime());
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mt-5 flex w-full flex-col items-center text-left">
      <PageTitle
        title="Projects"
        description="You can have a quick look of what projects I have been working on."
      />
      <div className="mb-10 mt-3 w-full space-y-5 text-left">
        {projects.map(project => (
          <div
            key={project.name}
            className="base-border flex flex-col space-y-2 rounded-md border p-5"
          >
            <div className="flex flex-row items-center space-x-2">
              <a
                className="text-xl font-bold hover:underline"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                {project.name}
              </a>
              {project.wip && (
                <span className="rounded-lg bg-orange-500 p-1 text-xs font-medium text-gray-100 dark:bg-orange-700 dark:text-gray-300">
                  Work In Progress
                </span>
              )}
            </div>
            <div className="flex flex-row gap-1">
              {project.icon}
              <span>{project.language}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
            <div className="flex flex-row space-x-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="base-border rounded-full border bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last Pushed: {sAgo(project.pushed_at)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
