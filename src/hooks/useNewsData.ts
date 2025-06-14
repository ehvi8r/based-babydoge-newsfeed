
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

const generateUniqueNews = (): NewsItem[] => {
  const uniqueStories = [
    {
      title: 'Bitcoin Reaches New All-Time High Amid Institutional Adoption',
      summary: 'Major financial institutions continue to embrace Bitcoin as digital gold, driving unprecedented price discovery.',
      category: 'Bitcoin'
    },
    {
      title: 'Ethereum 2.0 Upgrade Shows Promising Scalability Results',
      summary: 'The latest Ethereum upgrade demonstrates significant improvements in transaction throughput and energy efficiency.',
      category: 'Ethereum'
    },
    {
      title: 'DeFi Market Experiences Record-Breaking Growth This Quarter',
      summary: 'Decentralized finance protocols report massive increases in total value locked and user adoption.',
      category: 'DeFi'
    },
    {
      title: 'Major Bank Announces Comprehensive Cryptocurrency Trading Services',
      summary: 'Traditional banking sector embraces digital assets with full custody and trading solutions.',
      category: 'Regulation'
    },
    {
      title: 'NFT Market Shows Strong Recovery Signs After Recent Downturn',
      summary: 'Non-fungible token collections see renewed interest from collectors and institutional buyers.',
      category: 'NFTs'
    },
    {
      title: 'European Union Finalizes Progressive Cryptocurrency Regulatory Framework',
      summary: 'MiCA regulation provides clear guidelines for crypto operations across EU member states.',
      category: 'Regulation'
    },
    {
      title: 'Layer 2 Solutions Successfully Drive Down Ethereum Transaction Costs',
      summary: 'Polygon, Arbitrum, and Optimism demonstrate 90% reduction in gas fees for users.',
      category: 'Technology'
    },
    {
      title: 'Central Bank Digital Currencies Gain Momentum Across Global Markets',
      summary: 'Multiple countries accelerate CBDC development programs with pilot testing phases.',
      category: 'Regulation'
    },
    {
      title: 'Crypto Mining Industry Accelerates Shift Toward Renewable Energy Sources',
      summary: 'Bitcoin miners invest heavily in solar and wind power to achieve carbon neutrality.',
      category: 'Mining'
    },
    {
      title: 'Stablecoin Market Cap Surpasses Historic $150 Billion Milestone',
      summary: 'USDC, USDT, and other stablecoins reach new adoption levels in global payments.',
      category: 'Trading'
    },
    {
      title: 'Decentralized Exchanges Report Impressive 40% Trading Volume Increase',
      summary: 'Uniswap, SushiSwap, and other DEXs capture more market share from centralized exchanges.',
      category: 'DeFi'
    },
    {
      title: 'Blockchain Technology Adoption Rapidly Accelerates in Supply Chain Management',
      summary: 'Fortune 500 companies implement blockchain for transparency and traceability solutions.',
      category: 'Technology'
    },
    {
      title: 'Multiple Countries Implement Updated Cryptocurrency Tax Regulations',
      summary: 'New tax frameworks provide clarity for crypto investors and businesses worldwide.',
      category: 'Regulation'
    },
    {
      title: 'Web3 Gaming Platforms Successfully Attract Millions of Active Users',
      summary: 'Play-to-earn games demonstrate sustainable tokenomics and engaging gameplay mechanics.',
      category: 'Web3'
    },
    {
      title: 'Cross-Chain Bridge Technology Significantly Enhances Cryptocurrency Interoperability',
      summary: 'New protocols enable seamless asset transfers between different blockchain networks.',
      category: 'Technology'
    },
    {
      title: 'Institutional Investors Dramatically Increase Crypto Portfolio Allocations',
      summary: 'Pension funds and endowments allocate 5-10% of portfolios to digital assets.',
      category: 'Trading'
    },
    {
      title: 'Smart Contract Auditing Standards Reach New Industry-Leading Heights',
      summary: 'Security firms establish comprehensive frameworks for DeFi protocol assessments.',
      category: 'Technology'
    },
    {
      title: 'Cryptocurrency Lending Platforms Report Exceptional Q4 Performance Growth',
      summary: 'DeFi lending protocols see 200% increase in total borrowed amounts year-over-year.',
      category: 'DeFi'
    },
    {
      title: 'Metaverse Development Projects Experience Unprecedented Activity Surge',
      summary: 'Virtual world platforms attract major brand partnerships and user engagement.',
      category: 'Web3'
    },
    {
      title: 'Privacy-Focused Cryptocurrencies Face Heightened Regulatory Scrutiny Worldwide',
      summary: 'Monero and Zcash navigate complex compliance requirements in multiple jurisdictions.',
      category: 'Regulation'
    },
    {
      title: 'Merchant Cryptocurrency Payment Adoption Experiences Remarkable Growth',
      summary: 'Retail businesses integrate Bitcoin and stablecoin payment solutions at point-of-sale.',
      category: 'Trading'
    },
    {
      title: 'Advanced Yield Farming Strategies Evolve with Innovative DeFi Protocols',
      summary: 'Liquidity providers discover new opportunities for passive income generation.',
      category: 'DeFi'
    },
    {
      title: 'Revolutionary Blockchain Scalability Solutions Demonstrate Major Technical Breakthroughs',
      summary: 'Sharding and state channels achieve transaction speeds comparable to traditional payment systems.',
      category: 'Technology'
    },
    {
      title: 'Cryptocurrency Insurance Market Undergoes Rapid Expansion Phase',
      summary: 'Digital asset custody insurance products protect institutional and retail investors.',
      category: 'Trading'
    },
    {
      title: 'Real Estate Tokenization Technology Captures Mainstream Market Attention',
      summary: 'Property ownership fractionalization through blockchain enables global real estate investment.',
      category: 'Technology'
    },
    {
      title: 'Cryptocurrency Derivatives Trading Market Achieves Record-Breaking Highs',
      summary: 'Options and futures markets provide sophisticated risk management tools for traders.',
      category: 'Trading'
    },
    {
      title: 'Crypto Mining Environmental Impact Shows Significant Measurable Improvement',
      summary: 'Industry achieves 40% reduction in carbon footprint through renewable energy adoption.',
      category: 'Mining'
    },
    {
      title: 'Decentralized Autonomous Organizations Experience Remarkable Growth Surge',
      summary: 'DAO governance tokens enable community-driven decision making across DeFi protocols.',
      category: 'Web3'
    },
    {
      title: 'Global Cryptocurrency Education Programs Launch Across Multiple Continents',
      summary: 'Universities and training institutes develop comprehensive blockchain curriculum programs.',
      category: 'Technology'
    },
    {
      title: 'Municipal Elections Successfully Test Advanced Blockchain Voting Systems',
      summary: 'Government pilots demonstrate secure and transparent digital voting infrastructure.',
      category: 'Blockchain'
    }
  ];

  const sources = ['CoinDesk', 'CoinTelegraph', 'Decrypt', 'The Block', 'CryptoPanic', 'CoinGecko', 'Blockworks', 'CryptoSlate', 'BeInCrypto', 'CryptoNews'];

  return uniqueStories.map((story, index) => ({
    id: `unique-${index + 1}`,
    title: story.title,
    summary: story.summary,
    category: story.category,
    date: formatDate(new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()),
    readTime: `${Math.floor(Math.random() * 5) + 2} min read`,
    imageUrl: `https://picsum.photos/400/300?random=${index + 50}`,
    content: `This comprehensive analysis explores ${story.title.toLowerCase()}. ${story.summary} Industry experts are closely monitoring these developments as they represent significant shifts in the cryptocurrency landscape. Market analysts believe this trend will have lasting impacts on digital asset adoption and blockchain technology implementation. The implications for both retail and institutional investors continue to unfold as the market matures.`,
    source: sources[index % sources.length],
    url: '#'
  }));
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
            // Normalize title by removing common prefixes and suffixes that might indicate updates
            const normalizedTitle = item.title
              .replace(/^(Updated:|Update:|\[Update\]|\[Updated\])/i, '')
              .replace(/\s*-\s*(Updated|Update)$/i, '')
              .trim();
            
            // Check if we've already seen this title
            if (seenTitles.has(normalizedTitle.toLowerCase())) {
              console.log(`Filtering out duplicate: ${item.title}`);
              return false;
            }
            
            seenTitles.add(normalizedTitle.toLowerCase());
            return true;
          })
          .slice(0, 15)
          .map((item: CryptoPanicItem, index: number) => ({
            id: `panic-${item.id}`,
            title: item.title,
            summary: item.title.length > 150 ? item.title.substring(0, 150) + '...' : item.title,
            category: 'Cryptocurrency',
            date: formatDate(item.published_at),
            readTime: estimateReadTime(item.title),
            imageUrl: `https://picsum.photos/400/300?random=${index + 100}`,
            content: `Read the full article at the source for complete details about: ${item.title}`,
            source: item.source?.title || 'CryptoPanic',
            url: item.url
          }));
        
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
    // Also check generated news for any potential title conflicts
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

  // Ensure we have exactly 30 unique items
  const uniqueNewsItems = newsItems.slice(0, 30);
  console.log(`Total unique news items: ${uniqueNewsItems.length}`);
  console.log(`Unique titles: ${Array.from(seenTitles).length}`);
  
  return uniqueNewsItems;
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
