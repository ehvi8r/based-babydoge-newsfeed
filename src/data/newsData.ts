
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  content: string;
}

export const mockNewsData: NewsItem[] = [
  {
    id: "1",
    title: "Bitcoin Reaches New All-Time High as Institutional Adoption Continues",
    summary: "Bitcoin has surged to unprecedented levels, driven by increasing institutional investment and growing mainstream acceptance of cryptocurrency.",
    category: "Bitcoin",
    date: "Dec 14, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=200&fit=crop",
    content: `Bitcoin has reached another milestone today, breaking through previous resistance levels to establish a new all-time high. This latest surge comes amid a wave of institutional adoption and regulatory clarity in major markets.

The cryptocurrency's rise has been attributed to several key factors:

1. **Institutional Investment**: Major corporations and investment funds have continued to allocate portions of their portfolios to Bitcoin, viewing it as a hedge against inflation and traditional market volatility.

2. **Regulatory Clarity**: Recent developments in cryptocurrency regulation have provided more certainty for institutional investors, encouraging larger allocations to digital assets.

3. **Technical Improvements**: Ongoing developments in the Bitcoin network, including improvements to scalability and energy efficiency, have strengthened investor confidence.

Market analysts suggest that this bull run differs from previous cycles due to the maturity of the cryptocurrency ecosystem and the involvement of traditional financial institutions. The increased participation from institutional investors has brought more stability and legitimacy to the market.

However, experts caution that cryptocurrency markets remain volatile, and investors should conduct thorough research before making investment decisions.`
  },
  {
    id: "2",
    title: "Based BabyDoge Community Celebrates Major Milestone Achievement",
    summary: "The Based BabyDoge community has reached a significant milestone, demonstrating strong growth and engagement across all platforms.",
    category: "Based BabyDoge",
    date: "Dec 14, 2024",
    readTime: "2 min read",
    imageUrl: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=200&fit=crop",
    content: `The Based BabyDoge community has achieved a remarkable milestone, showcasing the power of decentralized community-driven projects in the cryptocurrency space.

**Key Achievements:**

- **Community Growth**: The project has seen exponential growth in community members across social media platforms
- **Trading Volume**: Daily trading volumes have consistently increased over the past month
- **Holder Distribution**: The token has achieved a healthy distribution among holders, indicating strong community participation

**Community Initiatives:**

The Based BabyDoge community has been actively involved in various initiatives, including charity drives and educational content creation. These efforts have helped build a strong foundation for the project's long-term success.

**Technical Developments:**

Recent technical improvements to the token's ecosystem have enhanced user experience and security. The development team continues to work on innovative features that will benefit the entire community.

The milestone celebration reflects the dedication and commitment of the Based BabyDoge community to building a sustainable and impactful project in the cryptocurrency space.`
  },
  {
    id: "3",
    title: "Ethereum 2.0 Staking Rewards Show Promising Returns for Validators",
    summary: "New data reveals that Ethereum 2.0 validators are earning attractive returns, encouraging more participants to join the network.",
    category: "Ethereum",
    date: "Dec 13, 2024",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=200&fit=crop",
    content: `Recent analysis of Ethereum 2.0 staking data shows that validators are earning attractive returns, making the transition to proof-of-stake increasingly appealing for network participants.

**Staking Performance Metrics:**

The current staking rewards are showing positive trends:
- Average annual percentage yield (APY) remains competitive
- Network security has improved with increased validator participation
- Transaction processing efficiency has seen notable improvements

**Validator Growth:**

The number of active validators on the Ethereum network has grown steadily, indicating strong confidence in the network's future. This growth contributes to:
- Enhanced network security
- Improved decentralization
- Better resistance to attacks

**Economic Impact:**

The staking mechanism has created a new economic model for Ethereum holders, allowing them to earn passive income while securing the network. This has led to:
- Reduced selling pressure on ETH
- Increased long-term holding incentives
- Greater network stability

**Looking Forward:**

As more features are implemented and the network continues to mature, analysts expect staking participation to continue growing, further strengthening the Ethereum ecosystem.`
  },
  {
    id: "4",
    title: "DeFi Protocols Report Record-Breaking Total Value Locked",
    summary: "Decentralized Finance protocols have reached new heights in total value locked, signaling growing confidence in DeFi applications.",
    category: "DeFi",
    date: "Dec 13, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
    content: `The DeFi ecosystem has achieved a new milestone with total value locked (TVL) reaching unprecedented levels across various protocols and blockchain networks.

**Growth Drivers:**

Several factors have contributed to this growth:
- Improved user interfaces making DeFi more accessible
- Enhanced security measures and audit practices
- Integration with traditional financial services
- Innovative yield farming opportunities

**Leading Protocols:**

The top DeFi protocols by TVL include:
- Lending and borrowing platforms
- Decentralized exchanges (DEXs)
- Yield farming protocols
- Synthetic asset platforms

**Cross-Chain Expansion:**

Multi-chain DeFi has become increasingly popular, with protocols expanding beyond Ethereum to other blockchain networks. This expansion has:
- Reduced transaction costs for users
- Improved transaction speeds
- Increased overall accessibility

**Risk Considerations:**

While the growth is encouraging, users are reminded to:
- Conduct thorough research before participating
- Understand smart contract risks
- Diversify across different protocols
- Stay informed about regulatory developments

The continued growth of DeFi demonstrates the increasing maturity and adoption of decentralized financial services.`
  },
  {
    id: "5",
    title: "NFT Market Shows Signs of Recovery with Increased Trading Volume",
    summary: "The NFT marketplace is experiencing renewed interest with trading volumes climbing and new innovative projects launching.",
    category: "NFTs",
    date: "Dec 12, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=200&fit=crop",
    content: `The NFT market is showing signs of recovery after a period of consolidation, with increased trading volumes and innovative new projects capturing the attention of collectors and investors.

**Market Recovery Indicators:**

Recent data points to a potential market recovery:
- Trading volumes have increased significantly
- Floor prices for established collections are stabilizing
- New collector participation is growing

**Innovation in the Space:**

The NFT ecosystem continues to evolve with new use cases:
- Utility-focused NFTs with real-world applications
- Gaming integration and play-to-earn mechanics
- Music and entertainment industry adoption
- Virtual real estate and metaverse development

**Established Collections:**

Many established NFT collections are experiencing renewed interest:
- Blue-chip collections maintaining strong floor prices
- Community-driven projects showing resilience
- Artistic collaborations gaining mainstream attention

**Future Outlook:**

Industry experts believe the current recovery is built on stronger fundamentals than previous cycles:
- Focus on utility over speculation
- Improved technology and user experience
- Integration with traditional industries
- Clearer regulatory frameworks

The NFT space appears to be maturing, with a greater emphasis on long-term value creation rather than short-term speculation.`
  }
];
