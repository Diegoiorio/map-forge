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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project description

A platform that lets tabletop RPG players upload maps, place and describe custom markers, and browse a searchable archive of all their mapped worlds.

Those are the main features:

- Load a map as image (png, jspg...)
- Put some markers on the map
- Give a title and descriptions each marker
- Open and read a map from archive with all relative markers

## Notes ---------------------------------

FRONT END STACK:
chackra ui

STORAGE MAPPE

1. Supabase
2. Cloudinary
3. Save in /public/maps

### Map FE Handler

react-zoom-pan-pinch

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

```javascript
export function MapViewer() {
  return (
    <div className="w-full h-full bg-slate-900 overflow-hidden">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit
      >
        <TransformComponent>
          <div className="relative">
            <img src="/maps/example-map.jpg" alt="Map" />

            {/* Marker di esempio */}
            <button
              className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2
                         w-4 h-4 rounded-full bg-red-500 border-2 border-white cursor-pointer"
              onClick={() => console.log("Open side panel with marker info")}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
```
