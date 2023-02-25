import type { Metadata } from 'next/types';

import axios from 'axios';

import PageTitle from '$components/page-title';
import { config } from '$lib/constants';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'You can have a quick look of what projects I have been working on.',
};

const getGithubRepoInfo = async (url: string) => {
  const repoApiURL = url.replace('github.com', 'api.github.com/repos');

  const { data } = await axios.get<{
    name: string;
    description: string;
  }>(repoApiURL);

  return data;
};

const getProjects = async () => {
  return await Promise.all(
    config.projects.map(async project => {
      const repoInfo = await getGithubRepoInfo(project.github);

      return {
        ...project,
        name: repoInfo.name,
        description: repoInfo.description,
      };
    }),
  );
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
          </div>
        ))}
      </div>
    </div>
  );
}
