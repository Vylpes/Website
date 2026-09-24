---
title: 'Deprecating Random Bunny'
published: '2026-09-24'
categories: 'Random Bunny'
slug: '2026/09/random-bunny-deprecation'
---

After a good few years of fetching random images from subreddits, I'm
officially deprecating [Random Bunny](/page/random-bunny). The repository has
been archived, and there will be no further releases.

## What happened

Random Bunny was always a thin wrapper around Reddit's public listing endpoints.
You pointed it at a subreddit, it pulled the `.json` feed, and it handed back a
random image post. That worked for ages without needing an account or API keys.

In late May 2026, Reddit shut down unauthenticated `.json` access as part of
their scraper and platform-abuse changes. Requests that used to just work now
return HTTP 403. Both the npm package and the CLI fail with `Failed to fetch
result from Reddit`.

The "proper" fix is OAuth against `oauth.reddit.com`, with each consumer
registering their own Reddit application and supplying credentials. I started
down that path for a 2.5 release, but Reddit's Data API access is no longer a
simple self-serve signup for new apps. New credentials need explicit approval,
and their preferred route for in-platform tooling is Devvit — which can't host
a Node CLI or an npm library.

## Why I'm not continuing it

Random Bunny's whole appeal was that you could install it and get a bunny (or
whatever) with almost no setup. Asking every user to apply for Reddit API access,
wait for approval, and wire up client secrets turns a one-liner into a small
project of its own. Shipping a shared maintainer key in the package isn't
acceptable either.

For a tool that was mostly for my own use, that trade-off isn't worth it. So
rather than leave a broken package half-alive, I'm calling it done.

## What this means for you

- The [git repository](https://git.vylpes.xyz/RabbitLabs/random-bunny) is
  archived (read-only).
- Existing installs on npm will still download, but they will not work against
  Reddit anymore.
- There will be no 2.5, no OAuth release, and no further bug fixes.
- The code remains MIT-licensed if anyone wants to fork it and take on the
  authenticated API path themselves.

If you were depending on Random Bunny for something, sorry for the abrupt end —
Reddit changed the ground rules, and the project doesn't make sense under the
new ones.

Thanks to everyone who used it, starred it, or contributed along the way. It
was a fun little package while it lasted.

\- Vylpes
