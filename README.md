# Reactilities Website

Official website and interactive demo app for [`reactilities`](https://github.com/petar-basic/reactilities).

## What this project includes

- Product landing page and positioning content
- Interactive demos powered by real `reactilities` hooks
- Searchable API explorer
- SEO baseline (metadata, JSON-LD, `robots.txt`, `sitemap.xml`)

## Tech stack

- Next.js App Router with static export (`output: "export"`)
- React 18
- `reactilities` as a direct npm dependency

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available scripts

- `npm run dev` - start development server
- `npm run build` - create production static export
- `npm run start` - run production server locally
- `npm run lint` - run ESLint checks

## Production build output

```bash
npm run build
```

The static website is generated in `out/`.

## Related links

- Reactilities package: `https://www.npmjs.com/package/reactilities`
- Reactilities source: `https://github.com/petar-basic/reactilities`
