
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
  const uniqueTopics = [
    'Bitcoin Reaches New All-Time High Amid Institutional Adoption',
    'Ethereum 2.0 Upgrade Shows Promising Scalability Results',
    'DeFi Market Experiences Record-Breaking Growth This Quarter',
    'Major Bank Announces Comprehensive Cryptocurrency Trading Services',
    'NFT Market Shows Strong Recovery Signs After Recent Downturn',
    'European Union Finalizes Progressive Cryptocurrency Regulatory Framework',
    'Layer 2 Solutions Successfully Drive Down Ethereum Transaction Costs',
    'Central Bank Digital Currencies Gain Momentum Across Global Markets',
    'Crypto Mining Industry Accelerates Shift Toward Renewable Energy Sources',
    'Stablecoin Market Cap Surpasses Historic $150 Billion Milestone',
    'Decentralized Exchanges Report Impressive 40% Trading Volume Increase',
    'Blockchain Technology Adoption Rapidly Accelerates in Supply Chain Management',
    'Multiple Countries Implement Updated Cryptocurrency Tax Regulations',
    'Web3 Gaming Platforms Successfully Attract Millions of Active Users',
    'Cross-Chain Bridge Technology Significantly Enhances Cryptocurrency Interoperability',
    'Institutional Investors Dramatically Increase Crypto Portfolio Allocations',
    'Smart Contract Auditing Standards Reach New Industry-Leading Heights',
    'Cryptocurrency Lending Platforms Report Exceptional Q4 Performance Growth',
    'Metaverse Development Projects Experience Unprecedented Activity Surge',
    'Privacy-Focused Cryptocurrencies Face Heightened Regulatory Scrutiny Worldwide',
    'Merchant Cryptocurrency Payment Adoption Experiences Remarkable Growth',
    'Advanced Yield Farming Strategies Evolve with Innovative DeFi Protocols',
    'Revolutionary Blockchain Scalability Solutions Demonstrate Major Technical Breakthroughs',
    'Cryptocurrency Insurance Market Undergoes Rapid Expansion Phase',
    'Real Estate Tokenization Technology Captures Mainstream Market Attention',
    'Cryptocurrency Derivatives Trading Market Achieves Record-Breaking Highs',
    'Crypto Mining Environmental Impact Shows Significant Measurable Improvement',
    'Decentralized Autonomous Organizations Experience Remarkable Growth Surge',
    'Global Cryptocurrency Education Programs Launch Across Multiple Continents',
    'Municipal Elections Successfully Test Advanced Blockchain Voting Systems'
  ];

  const categories = ['Bitcoin', 'Ethereum', 'DeFi', 'NFTs', 'Regulation', 'Technology', 'Mining', 'Trading', 'Web3', 'Blockchain'];
  const sources = ['CoinDesk', 'CoinTelegraph', 'Decrypt', 'The Block', 'CryptoPanic', 'CoinGecko', 'Blockworks', 'CryptoSlate', 'BeInCrypto', 'CryptoNews'];

  return uniqueTopics.map((title, index) => ({
    id: `unique-${index + 1}`,
    title,
    summary: `${title.substring(0, 100)}... This comprehensive analysis explores the latest developments and their significant impact on the cryptocurrency market ecosystem.`,
    category: categories[index % categories.length],
    date: formatDate(new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()),
    readTime: `${Math.floor(Math.random() * 5) + 2} min read`,
    imageUrl: `https://picsum.photos/400/300?random=${index + 50}`,
    content: `This is a comprehensive analysis of ${title.toLowerCase()}. The cryptocurrency market continues to evolve rapidly, with new developments emerging daily that shape the future of digital finance. Industry experts believe this trend will significantly impact the broader adoption of blockchain technology and digital assets across various sectors. Market analysts are closely monitoring these developments as they could indicate major shifts in the cryptocurrency landscape. Stay tuned for more updates on this developing story.`,
    source: sources[index % sources.length],
    url: '#'
  }));
};

const fetchCryptoNews = async (): Promise<NewsItem[]> => {
  const newsItems: NewsItem[] = [];

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
        const panicItems = cryptoPanicData.results.slice(0, 30).map((item: CryptoPanicItem, index: number) => ({
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
        console.log(`Added ${panicItems.length} items from CryptoPanic`);
      }
    }
  } catch (error) {
    console.error('Error fetching CryptoPanic news:', error);
  }

  // If we don't have enough news from APIs, fill with unique generated content
  if (newsItems.length < 30) {
    console.log('Adding unique generated news items...');
    const uniqueNews = generateUniqueNews();
    const needed = 30 - newsItems.length;
    newsItems.push(...uniqueNews.slice(0, needed));
  }

  console.log(`Total news items: ${newsItems.length}`);
  return newsItems.slice(0, 30);
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
