
import { useQuery } from '@tanstack/react-query';
import { fetchWithCache } from '@/utils/apiUtils';

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

// CoinGecko News API structure
interface CoinGeckoNewsItem {
  id: string;
  title: string;
  description: string;
  thumb_2x: string;
  updated_at: string;
  url: string;
}

// CryptoNews API structure  
interface CryptoNewsItem {
  title: string;
  text: string;
  url: string;
  image_url: string;
  date: string;
  source_name: string;
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
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

const fetchCryptoNews = async (): Promise<NewsItem[]> => {
  const newsItems: NewsItem[] = [];

  try {
    // Fetch from CoinGecko News API (free tier)
    const coinGeckoNews = await fetchWithCache<{ data: CoinGeckoNewsItem[] }>(
      'https://api.coingecko.com/api/v3/news',
      'coingecko-news',
      30 // 30 minutes cache
    );

    const geckoItems = coinGeckoNews.data.slice(0, 15).map((item, index) => ({
      id: `gecko-${item.id || index}`,
      title: item.title,
      summary: item.description.substring(0, 200) + '...',
      category: 'Cryptocurrency',
      date: formatDate(item.updated_at),
      readTime: estimateReadTime(item.description),
      imageUrl: item.thumb_2x,
      content: item.description,
      source: 'CoinGecko',
      url: item.url
    }));

    newsItems.push(...geckoItems);
  } catch (error) {
    console.error('Error fetching CoinGecko news:', error);
  }

  try {
    // Fetch from CryptoNews API (backup source)
    const cryptoNews = await fetchWithCache<CryptoNewsItem[]>(
      'https://cryptonews-api.com/api/v1/category?section=general&items=15&token=demo', // Using demo token
      'crypto-news-api',
      30 // 30 minutes cache
    );

    const cryptoItems = cryptoNews.slice(0, 15).map((item, index) => ({
      id: `crypto-${index}`,
      title: item.title,
      summary: item.text.substring(0, 200) + '...',
      category: 'Cryptocurrency',
      date: formatDate(item.date),
      readTime: estimateReadTime(item.text),
      imageUrl: item.image_url,
      content: item.text,
      source: item.source_name,
      url: item.url
    }));

    newsItems.push(...cryptoItems);
  } catch (error) {
    console.error('Error fetching CryptoNews API:', error);
  }

  // Remove duplicates and ensure we have 30 items
  const uniqueNews = newsItems.filter((item, index, self) => 
    index === self.findIndex(t => t.title === item.title)
  );

  return uniqueNews.slice(0, 30);
};

export const useNewsData = () => {
  return useQuery({
    queryKey: ['crypto-news'],
    queryFn: fetchCryptoNews,
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
    retry: 3,
  });
};
