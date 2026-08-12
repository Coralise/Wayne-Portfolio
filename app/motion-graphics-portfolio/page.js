"use client";

import { motionGraphicsPortfolio, toId } from '../data/motionGraphicsPortfolio'
import { VideoCarousel } from '../components/VideoCarousel'

function BehanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M9.1 5.5c1.2 0 2.1.3 2.8.9.6.5 1 1.3 1 2.3 0 1.2-.5 2-1.6 2.5 1.4.4 2.1 1.4 2.1 3 0 1.2-.4 2.1-1.2 2.8-.8.7-1.9 1-3.3 1H2V5.5h7.1Zm-.5 4.7c1 0 1.5-.4 1.5-1.3S9.6 7.7 8.6 7.7H4.9v2.5h3.7Zm.2 5.4c1.2 0 1.8-.5 1.8-1.5s-.6-1.5-1.8-1.5H4.9v3h3.9ZM20.5 7.6h-5.6V6.2h5.6v1.4Zm1.5 6.7h-6.1c.1 1.4.8 2.1 2.1 2.1.8 0 1.4-.3 1.8-1h2c-.6 1.9-2 2.9-3.9 2.9-1.3 0-2.4-.4-3.2-1.3-.8-.8-1.2-2-1.2-3.4 0-1.4.4-2.5 1.2-3.4.8-.9 1.9-1.3 3.2-1.3 1.3 0 2.4.5 3.1 1.4.8 1 1.1 2.2 1 3.6v.4Zm-6.1-1.5h3.9c-.1-1.2-.8-1.9-1.9-1.9-1.1 0-1.8.7-2 1.9Z" />
    </svg>
  )
}

function MorePortfolios() {
  return (
    <>
      <span className="text-xl font-bold">
        More of my past work here<span className="text-highlight">.</span>
      </span>
      <div className="mt-4 flex gap-2">
        <a
          href="https://www.behance.net/alphazed1"
          target="_blank"
          rel="noreferrer"
          aria-label="Behance profile"
          className="flex w-fit rounded-lg bg-neutral-400 p-2 text-background shadow-[transparent_0px_0px_5px_4px] transition-all duration-500 hover:bg-transparent hover:text-[#053eff] hover:shadow-[#053eff_0px_0px_5px_4px]"
        >
          <BehanceIcon />
        </a>
      </div>
    </>
  )
}

export default function MotionGraphicsPortfolio() {
  return (
    <main className="flex w-full gap-8 p-6 max-md:flex-col">
      <aside className="relative flex w-1/4 flex-col items-center max-md:hidden">
        <div className="sticky top-[50vh] w-fit -translate-y-1/2 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
          <MorePortfolios />
          <nav aria-label="Categories" className="mt-6 flex flex-col gap-1">
            {motionGraphicsPortfolio.map((category) => (
              <a
                key={category.name}
                href={`#${toId(category.name)}`}
                className="font-barlow-condensed text-sm uppercase tracking-widest text-foreground-2nd transition-colors duration-300 hover:text-highlight"
              >
                {category.name}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <div className="mt-20 flex min-w-0 flex-1 flex-col gap-20" id="motion-graphics">

        {motionGraphicsPortfolio.map((category) => {
          // A looping marquee needs enough slides to fill the track twice over.
          const slides =
            category.videos.length < 5
              ? [...category.videos, ...category.videos]
              : category.videos

          return (
            <section
              key={category.name}
              id={toId(category.name)}
              className="flex w-full scroll-mt-24 flex-col items-center gap-4"
            >
              <h2 className="text-2xl font-bold text-highlight">{category.name}</h2>
              <p className="max-w-2xl text-center text-sm text-foreground-2nd">
                {category.description}
              </p>
              <VideoCarousel videos={slides} label={category.name} />
            </section>
          )
        })}

        <div className="mb-20" />
      </div>

      <div className="relative hidden flex-col items-center max-md:flex">
        <div className="w-fit rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
          <MorePortfolios />
        </div>
      </div>
    </main>
  )
}
