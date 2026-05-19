This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Recommended Vercel setup (frontend only)

1. Push the repository to GitHub.
2. In Vercel, create a new project and import this repo.
3. Use the root directory (`/`) and let Vercel detect the Next.js app.
4. Configure environment variables in Vercel:
   - `NEXT_PUBLIC_API_URL` → URL of your backend API, for example `https://api.my-syntax-app.com`.

> The frontend lives in the repo root. The backend is a separate NestJS app in `server/`.

### Separating frontend and backend

This repository is already structured as a monorepo:

- Frontend: root folder (`app/`, `pages/`, `package.json`, `next.config.ts`)
- Backend: `server/` folder with its own `package.json` and NestJS app

That means you can deploy them separately:

- Deploy frontend to Vercel using the repo root.
- Deploy backend to a separate host (Render, Railway, Fly, Heroku, or another provider).

### Backend deployment

The backend uses environment variables defined in `server/.env.example`.
For production you should configure at least:

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_JAVA`
- `STRIPE_PRICE_ID_PYTHON`
- `STRIPE_PRICE_ID_JS`
- `FRONTEND_URL` or `APP_URL`
- `PORT`

After deploying the backend, point `NEXT_PUBLIC_API_URL` in the frontend to the backend public URL.

### Frontend configuration

The frontend will use `NEXT_PUBLIC_API_URL` to call the backend. You can set it in the Vercel project settings.

### Useful notes

- Keep `server/` ignored by the frontend deployment using `.vercelignore`.
- If you want both in Vercel, create two separate Vercel projects: one for root frontend, one for `server/` backend.
- For the backend, Vercel is not the most common choice unless you convert it to serverless functions. A dedicated Node host is simpler.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
