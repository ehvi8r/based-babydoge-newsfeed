
import React from "react";

const CoinTelegraphFeed = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            CoinTelegraph Feed
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            View the latest updates and news directly from <a href="https://cointelegraph.com/" className="underline" target="_blank" rel="noopener noreferrer">CoinTelegraph</a>.
          </p>
        </header>
        <div className="w-full aspect-[16/9] bg-muted rounded-lg overflow-hidden shadow relative">
          <iframe
            title="CoinTelegraph"
            src="https://cointelegraph.com/"
            className="w-full h-full absolute inset-0 border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <span className="font-semibold text-red-500">Note:</span> Some browsers or the CoinTelegraph website may prevent this page from displaying in a frame. If you do not see the site above, <a href="https://cointelegraph.com/" className="underline" target="_blank" rel="noopener noreferrer">click here to open CoinTelegraph</a> in a new tab.
        </div>
      </div>
    </div>
  );
};

export default CoinTelegraphFeed;
