
export const WalletTypes = {
  default: 0,
  metamask: 1,
  walletConnect: 2,
  coinbase: 3,
  phantom: 4,
  core: 5,
  glow: 6,
}

export const holds_status_const = [
  "Car has a Lien to be Paid",
  "Car had a Registered Owner",
  "Car has a Title at Purchase",
  "Documents & Signed and In-state",
  "Correct Documents Signed by Dealer",
  "Bank sent the correct Title",
  "No balance is Due",
  "Correct Lienholer DMV Document",
];

export const configNetwork = "mainnet";

export const Config = {
  ropsten: {
    etherscanLink: "https://ropsten.etherscan.io",
    defaultGasPrice: "15",
    transactionText: "Transaction Pending",
    coinGeckoApi: "https://api.coingecko.com/api/v3/coins",
    infuraId: "287b5d14c20f4b7d9411d165fac6a688",
  },
  mainnet: {
    etherscanLink: "https://etherscan.io",
    defaultGasPrice: "15",
    transactionText: "Transaction Pending",
    coinGeckoApi: "https://api.coingecko.com/api/v3/coins",
    infuraId: "c7a95b91ffae44e3b7fb80d9fbb98939",
  },
  kovan: {
    etherscanLink: "https://kovan.etherscan.io",
    defaultGasPrice: "15",
    transactionText: "Transaction Pending",
    coinGeckoApi: "https://api.coingecko.com/api/v3/coins",
    infuraId: "e632a702eec64a4d867d65d8923d4309",
  },
  rinkeby: {
    etherscanLink: "https://rinkey.etherscan.io",
    defaultGasPrice: "15",
    transactionText: "Transaction Pending",
    coinGeckoApi: "https://api.coingecko.com/api/v3/coins",
    infuraId: "c7a95b91ffae44e3b7fb80d9fbb98939",
  },
};

export const getConfig = () => {
  return Config[configNetwork];
};

export const walletList = [
  {
    id:'metamask',
    name:'Metamask',
  },
  {
    id:'walletconnect',
    name:'WalletConnect',
  },
  {
    id:'coinbase',
    name:'CoinBase wallet',
  },
  {
    id:'phantom',
    name:'Phantom',
  },
  {
    id:'core',
    name:'Core',
  },
  {
    id:'glow',
    name:'Glow Wallet',
  },
]