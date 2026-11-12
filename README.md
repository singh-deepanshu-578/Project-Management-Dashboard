# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## Deploy on Railway

1. Push this repository to GitHub.
2. In [Railway](https://railway.app), create a project and choose **Deploy from GitHub repo**.
3. Select this repository and deploy it. Railway will use `railway.json` to run the build and start commands.
4. Open the generated Railway domain from the service's **Networking** settings.

The app listens on Railway's `PORT` environment variable and supports client-side routes such as `/projects` and `/settings`.

## Deploy on Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), choose **Add New Project** and import this repository.
3. Keep the detected Vite settings and click **Deploy**.
4. Open the generated Vercel domain.

Vercel uses `vercel.json` to build the `dist` directory and serve the client-side application routes.

## Local development

```bash
npm install
npm run dev
```
