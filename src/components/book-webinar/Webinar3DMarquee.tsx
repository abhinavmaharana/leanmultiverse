"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const WEBINAR_PICS = [
  "/webinar-pics/WhatsApp%20Image%202026-02-27%20at%2008.57.38%20(1).jpeg",
  "/webinar-pics/WhatsApp%20Image%202026-02-27%20at%2008.57.39%20(2).jpeg",
  "/webinar-pics/WhatsApp%20Image%202026-02-27%20at%2008.57.38%20(3).jpeg",
  "/webinar-pics/WhatsApp%20Image%202026-02-27%20at%2008.57.39%20(3).jpeg",
  "/webinar-pics/WhatsApp%20Image%202026-02-27%20at%2008.57.37.jpeg",
  "/webinar-pics/WhatsApp%20Image%202026-02-27%20at%2008.57.38.jpeg",
  "/webinar-pics/WhatsApp%20Image%202026-02-27%20at%2008.57.39.jpeg",
  "/webinar-pics/WhatsApp%20Image%202026-02-27%20at%2008.57.38%20(2).jpeg",
  "/webinar-pics/WhatsApp%20Image%202026-02-27%20at%2008.57.39%20(1).jpeg",
];

// Duplicate for better marquee fill (4 columns)
const IMAGES = [...WEBINAR_PICS, ...WEBINAR_PICS];

type Webinar3DMarqueeProps = {
  onReserveSpot: () => void;
};

export function Webinar3DMarquee({ onReserveSpot }: Webinar3DMarqueeProps) {
  return (
    <div className="relative mx-auto my-10 flex min-h-[480px] w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-5xl">
        Join professionals who are{" "}
        <span className="relative z-20 inline-block rounded-xl bg-amber-500/40 px-4 py-1 text-white underline decoration-amber-400 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
          levelling up
        </span>{" "}
        their careers.
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-6 text-center text-sm text-neutral-300 md:text-base">
        From AI skills to product management, our live webinars help you stand
        out. Limited spots per session.
      </p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          type="button"
          onClick={onReserveSpot}
          className="rounded-xl bg-amber-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none shadow-lg shadow-amber-500/20"
        >
          Reserve my spot
        </button>
      </div>

      <div className="absolute inset-0 z-10 h-full w-full bg-black/80" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={IMAGES}
      />
    </div>
  );
}
