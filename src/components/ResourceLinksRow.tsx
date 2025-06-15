
import React from "react";

const links = [
  {
    href: "https://coinmarketcap.com//",
    alt: "CMC",
    src: "/images/cmc.png",
  },
  {
    href: "https://dexscreener.com/",
    alt: "DEXScreener",
    src: "/images/DEXScreener.png",
  },
  {
    href: "https://coingecko.com/",
    alt: "Coingecko",
    src: "/images/coingecko.png",
  },
  {
    href: "https://coinscan.com/",
    alt: "Coinscan",
    src: "/images/coinscan.png",
  },
  {
    href: "https://t.me/ttfbotbot",
    alt: "TTFBot",
    src: "/images/ttfbot.png",
  },
  {
    href: "https://rugcheck.xyz/",
    alt: "RugCheck",
    src: "/images/rugcheck.png",
  },
  {
    href: "https://robusnipe.io/",
    alt: "RobuSnipe",
    src: "/images/robusnipe.png",
  },
  {
    href: "https://app.tweetscout.io/",
    alt: "TweetScout",
    src: "/images/tweetscout.png",
  },
  {
    href: "https://birdeye.so/",
    alt: "Birdeye",
    src: "/images/birdeye.png",
  },
  {
    href: "https://app.bubblemaps.io/",
    alt: "BubbleMaps",
    src: "/images/bubblemaps.png",
  },
];

const ResourceLinksRow = () => (
  <div className="flex flex-wrap justify-center gap-4 py-6">
    {links.map((link) => (
      <a
        key={link.alt}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:scale-105 transform transition"
      >
        <img
          src={link.src}
          alt={link.alt}
          className="h-14 w-auto drop-shadow rounded bg-white p-1"
          style={{ maxWidth: "130px", maxHeight: "56px", objectFit: "contain" }}
        />
      </a>
    ))}
  </div>
);

export default ResourceLinksRow;
