# cktidy.xyz

[![Next](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-black?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

A personal website showcasing information about me and my articles!

Currently hosted on [Vercel](https://vercel.com) and which uses [Sanity.io](https://sanity.io) as a CMS.

## Official Website

Visit the official website [here](https://cktidy.xyz).

## Host Locally

Node.js 16 or latest LTS is required.

Please install [PNPM](https://pnpm.io) first.

```bash
corepack enable # if you haven't enabled corepack
corepack prepare # if you haven't prepared corepack
```

And add the following environment variables:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
SANITY_STUDIO_REVALIDATE_SECRET=
```

Then run the following commands:

```bash
pnpm install
pnpm run dev
```

## Build

```bash
pnpm run build
```

## License

This project is licensed under the [MIT License](LICENSE).
