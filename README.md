## Coin Watch

An application to watch market capitalization and trending of cryptocurrencies and exchanges, built using React, Next, Zustand, Jest, and Tailwindcss.

## Project Status

This project is currently in development. Users can browse and sort columns of content tables and see global statistics on the top. The functionality to view more details of cryptocurrency or exchange on table cell click and adding end-to-end testing using `playwright` is in progress.

## Installation and Setup Instructions

Clone down this repository. You will need `node` or `bun` installed globally on your machine.

Installation:

```bash
npm install
# or
bun install
```

To Run Test Suite:

```bash
npm run test
# or
bun run test
```

To Start Development Server:

```bash
npm run dev
# or
bun dev
```

To Visit App:

```bash
localhost:3000
```

## Reflection

This is a side project built for showcase. Project goals included using technologies learned up until this point and familiarizing myself with documentation for new technology trends and features.

Originally I wanted to build an application that would pull data from a public server while showcasing large sets of data with various optimizations to handle the same providing a good user experience. I started this process by using `create-next-app` boilerplate, then adding `eslint`, `prettier`, and `sentry` configurations.

One of the main challenges I ran into was Client and Server State management sync-up. This led me to spend a few days on a research spike into the same. Hence, I had to table authentication and wishlist to focus more on client-server state management and data visualization.

The technologies implemented in this project are React, Nextjs, Tailwindcss, Zustand, Jest, and a significant amount of Typescript and TSX. I choose to use the `create-next-app` boilerplate since that is highly maintained and also recommended by the React core team. I invested more time in diving into the new technological learning rabbit hole.
