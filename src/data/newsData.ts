
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

Market analysts suggest that this bull run differs from previous cycles due to the maturity of the cryptocurrency ecosystem and the involvement of traditional financial institutions.`
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
- Community Growth: The project has seen exponential growth in community members across social media platforms
- Trading Volume: Daily trading volumes have consistently increased over the past month
- Holder Distribution: The token has achieved a healthy distribution among holders

The milestone celebration reflects the dedication and commitment of the Based BabyDoge community to building a sustainable and impactful project.`
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

The current staking rewards are showing positive trends with average annual percentage yield remaining competitive. Network security has improved with increased validator participation, and transaction processing efficiency has seen notable improvements.`
  },
  {
    id: "4",
    title: "DeFi Protocols Report Record-Breaking Total Value Locked",
    summary: "Decentralized Finance protocols have reached new heights in total value locked, signaling growing confidence in DeFi applications.",
    category: "DeFi",
    date: "Dec 13, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
    content: `The DeFi ecosystem has achieved a new milestone with total value locked reaching unprecedented levels across various protocols and blockchain networks.

Growth drivers include improved user interfaces making DeFi more accessible, enhanced security measures and audit practices, and integration with traditional financial services.`
  },
  {
    id: "5",
    title: "NFT Market Shows Signs of Recovery with Increased Trading Volume",
    summary: "The NFT marketplace is experiencing renewed interest with trading volumes climbing and new innovative projects launching.",
    category: "NFTs",
    date: "Dec 12, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=200&fit=crop",
    content: `The NFT market is showing signs of recovery after a period of consolidation, with increased trading volumes and innovative new projects capturing attention.

Market recovery indicators include significantly increased trading volumes, stabilizing floor prices for established collections, and growing new collector participation.`
  },
  {
    id: "6",
    title: "Central Bank Digital Currencies Gain Momentum Worldwide",
    summary: "Multiple countries are accelerating their CBDC development programs, with several pilot projects showing promising results.",
    category: "CBDC",
    date: "Dec 12, 2024",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
    content: `Central Bank Digital Currencies are gaining significant traction globally, with over 100 countries exploring or implementing CBDC initiatives.

Recent developments include successful pilot programs in major economies, improved cross-border payment solutions, and enhanced financial inclusion capabilities. The technology promises to revolutionize traditional banking systems.`
  },
  {
    id: "7",
    title: "Solana Network Experiences Surge in Developer Activity",
    summary: "The Solana blockchain has seen a dramatic increase in developer engagement and new project launches this quarter.",
    category: "Solana",
    date: "Dec 11, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=200&fit=crop",
    content: `Solana has experienced unprecedented growth in developer activity, with new project deployments reaching record highs this quarter.

The surge is attributed to Solana's high-speed transactions, low fees, and robust developer tools. Major DeFi and NFT projects have migrated to the platform, contributing to its expanding ecosystem.`
  },
  {
    id: "8",
    title: "Cryptocurrency Regulations Take Shape in Major European Markets",
    summary: "The European Union finalizes comprehensive crypto regulations, providing clarity for businesses and investors.",
    category: "Regulation",
    date: "Dec 11, 2024",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop",
    content: `The European Union has finalized its Markets in Crypto-Assets (MiCA) regulation, providing comprehensive guidelines for cryptocurrency operations.

The new framework addresses licensing requirements for crypto service providers, stablecoin regulations, and consumer protection measures. This regulatory clarity is expected to boost institutional adoption across European markets.`
  },
  {
    id: "9",
    title: "Layer 2 Solutions Drive Ethereum Scalability Forward",
    summary: "Ethereum's Layer 2 networks are processing millions of transactions daily, significantly reducing costs and improving speed.",
    category: "Ethereum",
    date: "Dec 10, 2024",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=200&fit=crop",
    content: `Ethereum's Layer 2 scaling solutions have achieved remarkable success, processing millions of transactions daily while maintaining security and decentralization.

Popular L2 networks like Arbitrum and Optimism have seen explosive growth, with transaction costs reduced by over 90% compared to mainnet Ethereum. This scalability improvement is driving broader DeFi adoption.`
  },
  {
    id: "10",
    title: "Cardano Smart Contracts Platform Reaches New Development Milestone",
    summary: "The Cardano blockchain announces significant updates to its smart contract capabilities and developer ecosystem.",
    category: "Cardano",
    date: "Dec 10, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=400&h=200&fit=crop",
    content: `Cardano has reached a significant milestone in its smart contract development, with major improvements to the Plutus platform and developer tools.

The updates include enhanced transaction throughput, improved developer documentation, and new programming language support, making it easier for developers to build on Cardano.`
  },
  {
    id: "11",
    title: "Polkadot Parachain Auctions Drive Ecosystem Expansion",
    summary: "The latest round of Polkadot parachain auctions has concluded successfully, bringing innovative projects to the network.",
    category: "Polkadot",
    date: "Dec 9, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
    content: `Polkadot's parachain auction system continues to drive ecosystem growth, with the latest round featuring innovative DeFi, gaming, and infrastructure projects.

The successful auctions demonstrate strong confidence in Polkadot's interoperability vision, with projects raising significant funds to secure parachain slots and build on the network.`
  },
  {
    id: "12",
    title: "Chainlink Oracles Expand Into Traditional Finance Sector",
    summary: "Chainlink announces partnerships with major financial institutions to bring real-world data to blockchain applications.",
    category: "Chainlink",
    date: "Dec 9, 2024",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
    content: `Chainlink has announced groundbreaking partnerships with traditional financial institutions to integrate real-world data into blockchain applications.

These partnerships will enable traditional finance data feeds, cross-chain interoperability, and hybrid smart contracts that bridge traditional and decentralized finance systems.`
  },
  {
    id: "13",
    title: "Avalanche Subnet Technology Attracts Enterprise Adoption",
    summary: "Major corporations are leveraging Avalanche's subnet technology to build custom blockchain solutions for their businesses.",
    category: "Avalanche",
    date: "Dec 8, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=200&fit=crop",
    content: `Avalanche's subnet technology is gaining traction among enterprise users, offering customizable blockchain solutions for specific business needs.

The technology allows companies to create dedicated blockchain networks while maintaining interoperability with the broader Avalanche ecosystem, providing scalability and compliance benefits.`
  },
  {
    id: "14",
    title: "Polygon zkEVM Mainnet Launch Marks Ethereum Scaling Milestone",
    summary: "Polygon's zero-knowledge Ethereum Virtual Machine goes live, offering enhanced scalability with full Ethereum compatibility.",
    category: "Polygon",
    date: "Dec 8, 2024",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=200&fit=crop",
    content: `Polygon zkEVM has officially launched on mainnet, representing a major advancement in Ethereum scaling technology using zero-knowledge proofs.

The launch provides developers with full Ethereum compatibility while achieving significantly higher throughput and lower costs, marking a new era in blockchain scalability.`
  },
  {
    id: "15",
    title: "Cosmos Inter-Blockchain Communication Protocol Enables Cross-Chain DeFi",
    summary: "The Cosmos IBC protocol facilitates seamless asset transfers between different blockchain networks, boosting DeFi innovation.",
    category: "Cosmos",
    date: "Dec 7, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=200&fit=crop",
    content: `Cosmos's Inter-Blockchain Communication protocol is revolutionizing cross-chain DeFi by enabling seamless asset transfers between different blockchain networks.

The protocol has facilitated billions in cross-chain transactions, connecting dozens of independent blockchains and creating a truly interconnected blockchain ecosystem.`
  },
  {
    id: "16",
    title: "Algorand Carbon-Negative Blockchain Attracts Sustainability-Focused Projects",
    summary: "Algorand's commitment to carbon negativity is drawing environmentally conscious developers and institutions to the platform.",
    category: "Algorand",
    date: "Dec 7, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=200&fit=crop",
    content: `Algorand continues to lead in sustainable blockchain technology, maintaining its carbon-negative status while attracting eco-conscious projects and developers.

The platform's Pure Proof-of-Stake consensus mechanism and carbon offset initiatives make it an attractive choice for organizations prioritizing environmental responsibility.`
  },
  {
    id: "17",
    title: "Tezos Governance Model Demonstrates Successful On-Chain Evolution",
    summary: "Tezos showcases the effectiveness of its self-amending protocol with successful governance proposals and network upgrades.",
    category: "Tezos",
    date: "Dec 6, 2024",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=400&h=200&fit=crop",
    content: `Tezos continues to demonstrate the power of on-chain governance with successful protocol upgrades approved through its democratic voting mechanism.

The latest upgrades include performance improvements, new smart contract features, and enhanced security measures, all implemented through community consensus without network forks.`
  },
  {
    id: "18",
    title: "VeChain Supply Chain Solutions Gain Adoption in Automotive Industry",
    summary: "Major automotive manufacturers are implementing VeChain's blockchain technology for supply chain transparency and verification.",
    category: "VeChain",
    date: "Dec 6, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop",
    content: `VeChain's blockchain-based supply chain solutions are gaining significant traction in the automotive industry, with major manufacturers implementing the technology.

The solutions provide end-to-end traceability, authenticity verification, and sustainability tracking throughout the automotive supply chain, enhancing transparency and consumer trust.`
  },
  {
    id: "19",
    title: "Filecoin Decentralized Storage Network Reaches Exabyte Milestone",
    summary: "The Filecoin network has achieved a major milestone by storing over one exabyte of data across its decentralized storage system.",
    category: "Filecoin",
    date: "Dec 5, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop",
    content: `Filecoin has reached a significant milestone with over one exabyte of data stored on its decentralized network, demonstrating the viability of blockchain-based storage solutions.

The achievement highlights growing demand for decentralized storage alternatives to traditional cloud services, offering improved security, redundancy, and cost-effectiveness.`
  },
  {
    id: "20",
    title: "Theta Network Video Streaming Platform Powers Next-Gen Content Delivery",
    summary: "Theta's decentralized video streaming infrastructure is revolutionizing content delivery with peer-to-peer technology.",
    category: "Theta",
    date: "Dec 5, 2024",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=200&fit=crop",
    content: `Theta Network is transforming video streaming through its decentralized infrastructure, enabling peer-to-peer content delivery with improved quality and reduced costs.

The platform has partnered with major content creators and streaming services, demonstrating the practical applications of blockchain technology in media distribution.`
  },
  {
    id: "21",
    title: "Helium Network IoT Infrastructure Expands to Smart City Applications",
    summary: "The Helium blockchain network is expanding its Internet of Things coverage to support smart city initiatives worldwide.",
    category: "Helium",
    date: "Dec 4, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=200&fit=crop",
    content: `Helium's decentralized wireless network is expanding into smart city applications, providing IoT connectivity for urban infrastructure projects.

The network's incentivized coverage model has created a global wireless infrastructure that supports various IoT devices and applications at a fraction of traditional costs.`
  },
  {
    id: "22",
    title: "NEAR Protocol Sharding Technology Achieves Infinite Scalability Goal",
    summary: "NEAR Protocol's Nightshade sharding implementation demonstrates the potential for theoretically infinite blockchain scalability.",
    category: "NEAR",
    date: "Dec 4, 2024",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop",
    content: `NEAR Protocol's innovative sharding technology continues to push the boundaries of blockchain scalability, with recent implementations showing remarkable performance improvements.

The Nightshade sharding design allows the network to dynamically adjust to demand, potentially supporting millions of transactions per second while maintaining security and decentralization.`
  },
  {
    id: "23",
    title: "Flow Blockchain Powers Major Sports and Entertainment NFT Platforms",
    summary: "Flow blockchain technology is becoming the backbone for major sports leagues and entertainment companies entering the NFT space.",
    category: "Flow",
    date: "Dec 3, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=200&fit=crop",
    content: `Flow blockchain has established itself as the preferred platform for major sports and entertainment NFT initiatives, including partnerships with leading sports leagues.

The blockchain's consumer-friendly design and developer tools make it ideal for mainstream NFT applications, supporting millions of users and transactions.`
  },
  {
    id: "24",
    title: "Internet Computer Protocol Enables Full-Stack Decentralized Applications",
    summary: "The Internet Computer blockchain demonstrates the potential for fully decentralized web applications without traditional cloud services.",
    category: "Internet Computer",
    date: "Dec 3, 2024",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=200&fit=crop",
    content: `The Internet Computer Protocol is revolutionizing web development by enabling fully decentralized applications that run entirely on blockchain infrastructure.

Developers can now build complete web services, including frontend, backend, and database functionality, without relying on traditional cloud providers or centralized infrastructure.`
  },
  {
    id: "25",
    title: "Fantom Opera Network Demonstrates High-Speed DeFi Capabilities",
    summary: "Fantom's high-performance blockchain network is attracting DeFi projects with its fast finality and low transaction costs.",
    category: "Fantom",
    date: "Dec 2, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=200&fit=crop",
    content: `Fantom Opera's high-speed consensus mechanism is enabling new possibilities in DeFi with sub-second transaction finality and minimal fees.

The network's performance advantages are attracting major DeFi protocols and yielding innovative financial products that weren't previously feasible on slower blockchains.`
  },
  {
    id: "26",
    title: "Elrond MultiversX Rebranding Signals Web3 Metaverse Focus",
    summary: "The rebranding of Elrond to MultiversX reflects the project's expanded vision for metaverse and Web3 applications.",
    category: "MultiversX",
    date: "Dec 2, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=200&fit=crop",
    content: `MultiversX (formerly Elrond) has unveiled its expanded vision for the metaverse, positioning itself as a comprehensive Web3 infrastructure platform.

The rebranding reflects the project's evolution beyond simple cryptocurrency transactions to supporting complex metaverse applications, virtual worlds, and digital identity solutions.`
  },
  {
    id: "27",
    title: "Harmony Protocol Cross-Chain Bridge Technology Connects Multiple Networks",
    summary: "Harmony's innovative bridging technology is facilitating seamless asset transfers across different blockchain ecosystems.",
    category: "Harmony",
    date: "Dec 1, 2024",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=200&fit=crop",
    content: `Harmony's cross-chain bridge technology is addressing one of blockchain's biggest challenges by enabling secure and efficient asset transfers between different networks.

The protocol's innovative approach to cross-chain communication is setting new standards for interoperability and user experience in the multi-chain ecosystem.`
  },
  {
    id: "28",
    title: "Zilliqa Sharding Innovation Paves Way for Enterprise Blockchain Adoption",
    summary: "Zilliqa's sharding technology is attracting enterprise clients looking for scalable blockchain solutions for business applications.",
    category: "Zilliqa",
    date: "Dec 1, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=400&h=200&fit=crop",
    content: `Zilliqa's pioneering sharding technology continues to demonstrate its value for enterprise applications, offering the scalability and performance needed for business use cases.

The platform's practical sharding implementation has achieved consistent high throughput while maintaining security, making it suitable for large-scale enterprise deployments.`
  },
  {
    id: "29",
    title: "Enjin Platform Enables Gaming Industry NFT Integration",
    summary: "Enjin's blockchain platform is facilitating the integration of NFTs and cryptocurrency rewards into mainstream gaming applications.",
    category: "Enjin",
    date: "Nov 30, 2024",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&h=200&fit=crop",
    content: `Enjin Platform is revolutionizing the gaming industry by providing developers with tools to easily integrate NFTs and blockchain rewards into their games.

The platform's user-friendly APIs and development tools are lowering the barrier for game developers to implement blockchain features, driving mainstream adoption of play-to-earn mechanics.`
  },
  {
    id: "30",
    title: "Crypto Market Analysis: Institutional Investment Trends Shape Future Direction",
    summary: "Recent analysis of institutional investment patterns reveals key trends that are likely to influence cryptocurrency market direction in 2025.",
    category: "Market Analysis",
    date: "Nov 30, 2024",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
    content: `Comprehensive analysis of institutional investment patterns reveals significant trends that are shaping the cryptocurrency market's future direction.

Key findings include increased allocation to digital assets by pension funds, growing interest in DeFi protocols from traditional financial institutions, and expanded corporate treasury adoption of cryptocurrency holdings.

The data suggests that institutional involvement will continue to drive market maturation and stability, with implications for retail investors and the broader cryptocurrency ecosystem throughout 2025.`
  }
];
