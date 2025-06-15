import { useQuery } from '@tanstack/react-query';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  content: string;
  source: string;
  url: string;
}

// CryptoPanic API structure
interface CryptoPanicItem {
  id: number;
  title: string;
  url: string;
  published_at: string;
  source: {
    title: string;
  };
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

const estimateReadTime = (text: string): string => {
  const wordsPerMinute = 200;
  const wordCount = text.split(' ').length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
};

// --- Mapping from source to homepage URL ---
const sourceHomepageMap: Record<string, string> = {
  "CoinDesk": "https://www.coindesk.com/",
  "CoinTelegraph": "https://cointelegraph.com/",
  "Decrypt": "https://decrypt.co/",
  "The Block": "https://www.theblock.co/",
  "CryptoPanic": "https://cryptopanic.com/",
  "CoinGecko": "https://www.coingecko.com/",
  "Blockworks": "https://blockworks.co/",
  "CryptoSlate": "https://cryptoslate.com/",
  "BeInCrypto": "https://beincrypto.com/",
  "CryptoNews": "https://cryptonews.com/",
};

// Helper to get homepage for a given source name
const getHomepageForSource = (source: string): string => {
  // Try exact match first
  if (sourceHomepageMap[source]) {
    return sourceHomepageMap[source];
  }
  // Try to find by lowercased normalized key
  const sourceKey = Object.keys(sourceHomepageMap).find(
    (name) => name.toLowerCase() === source.toLowerCase()
  );
  if (sourceKey) {
    return sourceHomepageMap[sourceKey];
  }
  // Default fallback
  return "https://www.coindesk.com/";
};

// --- Utility function to sanitize URLs ---
const sanitizeUrl = (url: string | undefined | null): string => {
  if (
    typeof url !== "string" ||
    url.trim() === "" ||
    url === "#" ||
    url === null ||
    url.toLowerCase() === "undefined" ||
    url.toLowerCase() === "null" ||
    url.toLowerCase().includes("about:blank") ||
    !/^https?:\/\//.test(url.trim())
  ) {
    return "https://www.coindesk.com/";
  }
  return url.trim();
};

const generateUniqueNews = (): NewsItem[] => {
  const uniqueStories = [
    {
      title: 'Bitcoin Reaches New All-Time High Amid Institutional Adoption',
      summary: 'Major financial institutions continue to embrace Bitcoin as digital gold, driving unprecedented price discovery.',
      category: 'Bitcoin',
      url: 'https://www.coindesk.com/business/2024/01/15/bitcoin-reaches-new-highs/'
    },
    {
      title: 'Ethereum 2.0 Upgrade Shows Promising Scalability Results',
      summary: 'The latest Ethereum upgrade demonstrates significant improvements in transaction throughput and energy efficiency.',
      category: 'Ethereum',
      url: 'https://cointelegraph.com/news/ethereum-upgrade-scalability-results'
    },
    {
      title: 'DeFi Market Experiences Record-Breaking Growth This Quarter',
      summary: 'Decentralized finance protocols report massive increases in total value locked and user adoption.',
      category: 'DeFi',
      url: 'https://decrypt.co/defi-market-growth-quarter'
    },
    {
      title: 'Major Bank Announces Comprehensive Cryptocurrency Trading Services',
      summary: 'Traditional banking sector embraces digital assets with full custody and trading solutions.',
      category: 'Regulation',
      url: 'https://www.theblock.co/bank-cryptocurrency-trading-services'
    },
    {
      title: 'NFT Market Shows Strong Recovery Signs After Recent Downturn',
      summary: 'Non-fungible token collections see renewed interest from collectors and institutional buyers.',
      category: 'NFTs',
      url: 'https://cryptoslate.com/nft-market-recovery-signs'
    },
    {
      title: 'European Union Finalizes Progressive Cryptocurrency Regulatory Framework',
      summary: 'MiCA regulation provides clear guidelines for crypto operations across EU member states.',
      category: 'Regulation',
      url: 'https://beincrypto.com/eu-cryptocurrency-regulatory-framework'
    },
    {
      title: 'Layer 2 Solutions Successfully Drive Down Ethereum Transaction Costs',
      summary: 'Polygon, Arbitrum, and Optimism demonstrate 90% reduction in gas fees for users.',
      category: 'Technology',
      url: 'https://blockworks.co/layer-2-ethereum-transaction-costs'
    },
    {
      title: 'Central Bank Digital Currencies Gain Momentum Across Global Markets',
      summary: 'Multiple countries accelerate CBDC development programs with pilot testing phases.',
      category: 'Regulation',
      url: 'https://cryptonews.com/cbdc-global-momentum'
    },
    {
      title: 'Crypto Mining Industry Accelerates Shift Toward Renewable Energy Sources',
      summary: 'Bitcoin miners invest heavily in solar and wind power to achieve carbon neutrality.',
      category: 'Mining',
      url: 'https://www.coindesk.com/business/crypto-mining-renewable-energy'
    },
    {
      title: 'Stablecoin Market Cap Surpasses Historic $150 Billion Milestone',
      summary: 'USDC, USDT, and other stablecoins reach new adoption levels in global payments.',
      category: 'Trading',
      url: 'https://cointelegraph.com/news/stablecoin-market-cap-milestone'
    }
  ];

  const sources = ['CoinDesk', 'CoinTelegraph', 'Decrypt', 'The Block', 'CryptoPanic', 'CoinGecko', 'Blockworks', 'CryptoSlate', 'BeInCrypto', 'CryptoNews'];

  return uniqueStories.map((story, index) => {
    const mappedSource = sources[index % sources.length];
    return {
      id: `unique-${index + 1}`,
      title: story.title,
      summary: story.summary,
      category: story.category,
      date: formatDate(
        new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      ),
      readTime: `${Math.floor(Math.random() * 5) + 2} min read`,
      imageUrl: `https://picsum.photos/400/300?random=${index + 50}`,
      content: `This comprehensive analysis explores ${story.title.toLowerCase()}. ${story.summary} Industry experts are closely monitoring these developments as they represent significant shifts in the cryptocurrency landscape. Market analysts believe this trend will have lasting impacts on digital asset adoption and blockchain technology implementation. The implications for both retail and institutional investors continue to unfold as the market matures.`,
      source: mappedSource,
      url: getHomepageForSource(mappedSource), // <-- Always use the homepage!
    };
  });
};

const fetchCryptoNews = async (): Promise<NewsItem[]> => {
  const newsItems: NewsItem[] = [];
  const seenTitles = new Set<string>();

  try {
    console.log('Fetching cryptocurrency news...');
    
    // Try to fetch from CryptoPanic API
    const cryptoPanicResponse = await fetch(
      'https://cryptopanic.com/api/v1/posts/?auth_token=free&kind=news&currencies=BTC,ETH&filter=hot'
    );
    
    if (cryptoPanicResponse.ok) {
      const cryptoPanicData = await cryptoPanicResponse.json();
      console.log('CryptoPanic data:', cryptoPanicData);
      
      if (cryptoPanicData.results && cryptoPanicData.results.length > 0) {
        const panicItems = cryptoPanicData.results
          .filter((item: CryptoPanicItem) => {
            const normalizedTitle = item.title
              .replace(/^(Updated:|Update:|\[Update\]|\[Updated\])/i, '')
              .replace(/\s*-\s*(Updated|Update)$/i, '')
              .trim();
            
            if (seenTitles.has(normalizedTitle.toLowerCase())) {
              console.log(`Filtering out duplicate: ${item.title}`);
              return false;
            }
            
            seenTitles.add(normalizedTitle.toLowerCase());
            return true;
          })
          .slice(0, 15)
          .map((item: CryptoPanicItem, index: number) => {
            // Always use the homepage for the source
            const source = item.source?.title || "CryptoPanic";
            return {
              id: `panic-${item.id}`,
              title: item.title,
              summary:
                item.title.length > 150
                  ? item.title.substring(0, 150) + "..."
                  : item.title,
              category: "Cryptocurrency",
              date: formatDate(item.published_at),
              readTime: estimateReadTime(item.title),
              imageUrl: `https://picsum.photos/400/300?random=${index + 100}`,
              content: `Read the full article at the source for complete details about: ${item.title}`,
              source,
              url: getHomepageForSource(source), // Homepage always!
            };
          });

        newsItems.push(...panicItems);
        console.log(`Added ${panicItems.length} unique items from CryptoPanic`);
      }
    }
  } catch (error) {
    console.error('Error fetching CryptoPanic news:', error);
  }

  // Add unique generated content to reach 30 total items
  const generatedNews = generateUniqueNews();
  const remainingSlots = 30 - newsItems.length;

  if (remainingSlots > 0) {
    // Filter for unique titles, as before
    const filteredGeneratedNews = generatedNews.filter(news => {
      const normalizedTitle = news.title.toLowerCase();
      if (seenTitles.has(normalizedTitle)) {
        return false;
      }
      seenTitles.add(normalizedTitle);
      return true;
    });

    newsItems.push(...filteredGeneratedNews.slice(0, remainingSlots));
  }

  // FINAL fail-safe step: guarantee every news item has a valid, real url
  const cleanedNewsItems = newsItems.slice(0, 30).map((item) => {
    const fixedUrl = sanitizeUrl(item.url);
    if (
      !fixedUrl ||
      fixedUrl === "#" ||
      fixedUrl.trim() === "" ||
      fixedUrl === "undefined" ||
      fixedUrl === "null" ||
      fixedUrl === null ||
      fixedUrl.toLowerCase().includes("about:blank")
    ) {
      // fallback (should never happen, but just in case)
      console.warn("Fixing invalid NewsItem url before final return (last fail-safe):", item.title, item.url);
      return { ...item, url: "https://www.coindesk.com/" };
    }
    return { ...item, url: fixedUrl };
  });

  // Log and check for leftovers
  cleanedNewsItems.forEach((item) => {
    if (
      !item.url ||
      item.url === "#" ||
      item.url.trim() === "" ||
      item.url === "undefined" ||
      item.url === "null" ||
      item.url === null ||
      item.url.toLowerCase().includes("about:blank")
    ) {
      console.error("AFTER FIX: NewsItem STILL has invalid URL:", item.title, item.url);
    }
  });

  // Log result for debugging
  console.log(
    "Final news items (for UI):",
    cleanedNewsItems.map((item) => ({
      title: item.title,
      url: item.url,
    }))
  );

  console.log(`Total unique news items: ${cleanedNewsItems.length}`);
  
  return cleanedNewsItems;
};

export const useNewsData = () => {
  return useQuery({
    queryKey: ['crypto-news'],
    queryFn: fetchCryptoNews,
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
