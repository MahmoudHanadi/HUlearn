# HUlearn

Static Hungarian study app built with React, TypeScript, and Vite.

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run build
npm run lint
```

## GitHub Pages deployment

The repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

To publish:

1. Push this project to a GitHub repository.
2. Make sure your default deployment branch is `main`.
3. In the repository settings, open `Pages`.
4. Set the source to `GitHub Actions`.
5. Push to `main` or run the workflow manually.

The Vite config already uses a relative `base` path, so the built app works on GitHub Pages project URLs without extra path rewrites.
