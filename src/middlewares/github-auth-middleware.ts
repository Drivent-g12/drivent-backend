import { NextFunction, Request, Response } from 'express';

export async function getGithubAccessToken(req: Request, res: Response, next: NextFunction) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const { code } = req.body;

  const params = `?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

  await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
  })
    .then((fetchResponse) => {
      return fetchResponse.json();
    })
    .then((data) => {
      res.locals.githubAccessToken = data.access_token;
    });

  next();
}

export async function getGithubUserData(req: Request, res: Response, next: NextFunction) {
  const githubAccessToken = res.locals.githubAccessToken;

  await fetch('https://api.github.com/user/emails', {
    method: 'GET',
    headers: { Authorization: `Bearer ${githubAccessToken}` },
  })
    .then((fetchResponse) => {
      return fetchResponse.json();
    })
    .then((data) => {
      res.locals.githubEmail = data.find((obj: githubEmailObject) => obj.primary === true).email;
    });

  next();
}

type githubEmailObject = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
};
