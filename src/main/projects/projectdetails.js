module.exports = {
  biot: {
    name: "Stock Tracker",
    front: "React",
    back: "Node/Express",
    db: "MongoDB",
    tested: "Chrome, Firefox",
    link: "https://atcsportal.com/stocks.html",
    repo: "GitHub",
    repoLink: "https://github.com/atcsrepo/Stock-sample",
    desc: "A web application that 1) allows users to compare stock trends within defined periods and 2) review upcoming and past biotech events and their impact on share prices. Changes to the trends section are broadcasted to all browsers connected to the server, enabling real time synching.",
    images: [require("../../assets/stock1.png"), 
      require("../../assets/stock2.png"), 
      require("../../assets/stock3.png")],
    frontOverview: [
      "D3 used to generate all graphs on the page",
      "Users can view price trends within a pre-defined or self-defined period",
      "Events charts are generated on demand as user browses pages",
      "Contents dynamically resize to accommodate varying window sizes"
    ],
    backOverview: [
      "Successful modification (addition/deletion) of tickers in the trends section are broadcasted to all connected clients in real time",
      "Websocket connections are reverse proxied through an Nginx server instance",
      "Every 24 hours (12AM UTC), stock prices for trends comparison are updated",
      "Events charts are updated monthly",
      "Server tracks price updates that fail and queues failed entries for re-try up to the limit set by admin"
    ]
  },
  crypto: {
    name: "Crypto Tracker",
    front: "React",
    back: "Node/Express",
    db: "MongoDB",
    tested: "Chrome, Firefox",
    link: "https://atcsportal.com/login.html",
    repo: "GitHub",
    repoLink: "https://github.com/atcsrepo/Crypto-sample",
    desc: "A web application that allows users to create an account, store crypto portfolio data, view portfolio value, and view real-time price charts.",
    images: [require("../../assets/coin1.png"),
      require("../../assets/coin2.png"),
      require("../../assets/coin3.png"),
      require("../../assets/coin4.png")],
    frontOverview: [
      "D3 generated pie chart showing portfolio holdings, along with a portfolio value table",
      "Canvas heatmap showing percent changes in price (1hr, 24hr or 7d) for all CoinPaprika listed assets",
      "Ability to view up to six different 24-hr (if supported) price charts for all assets found on supported exchanges",
      "Price charts are updated via websocket (if endpoint available), enabling real time price readings",
      "Price charts are drawn using canvas to reduce re-drawing load",
      "Ability to add custom or known coins to portfolio, either manually or automatically (currently only supports ETH/ERC-20 tokens)",
      "AJAX search allows users to quickly get names of cryptocurrencies as written on CoinPaprika",
      "Users can view and edit holding information",
      "Users can select which of the supported exchange to get coin prices from",
      "In-line styles and JavaScript are used to dynamically re-size content"
    ],
    backOverview: [
      "Login system uses passport, passport-local and bcrypt to create, authenticate, encrypt and store user profiles",
      "Every 24 hours, CoinPaprika data is updated",
      "CoinPaprika data used to standardize/resolve cryptocurrency name discrepancies between different exchanges. Exceptions raise flags for further attention",
      "CoinPaprika data used to create a name trie for use in AJAX searches",
      "Every 24hrs, the price sources (detailing which exchange supports a given coin) and exchange listings (detailing what trading pairs are available at a supported exchange) collections in the database are updated",
      "Every 5 mins, USD(T), ETH, and BTC trading prices are pulled from supported exchanges and averaged to create a USD price list for traded assets",
      "All application routes require authentication or else users will be re-directed to the login page",
      "Proxy route used to get around CORS restrictions on some exchanges",
      "Nginx reverse proxy is used to provide SSL support"
    ]
  }
}