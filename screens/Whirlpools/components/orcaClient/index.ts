import {
  Connection,
  Transaction,
  // ConnectionConfig,
  Keypair
} from './web3.esm.js'; // debugging @solana/web3.js
import {
  buildWhirlpoolClient,
  WhirlpoolContext,
  AccountFetcher,
  ORCA_WHIRLPOOL_PROGRAM_ID
} from '@orca-so/whirlpools-sdk';

const CONNECTION_ENDPOINT = 'https://api.mainnet-beta.solana.com';
const CONNECTION_CONFIG = {
  commitment: 'confirmed'
};

const DUMMY_WALLET = {
  async signTransaction(tx: Transaction) {
    return tx;
  },
  async signAllTransactions(txs: Transaction[]) {
    return txs;
  },
  // publicKey: Keypair.generate().publicKey
  publicKey: "BesjRKHMdPkTDWJQV4GpyA82EunoozKrEbz21WHZzHQp" // random hardcoded key
};

console.log(new Connection(CONNECTION_ENDPOINT, CONNECTION_CONFIG))
// const connection = new Connection(CONNECTION_ENDPOINT, CONNECTION_CONFIG);
// const context = WhirlpoolContext.from(
//   connection,
//   DUMMY_WALLET,
//   ORCA_WHIRLPOOL_PROGRAM_ID
// );
// const fetcher = new AccountFetcher(context.provider.connection);
// const orcaClient = buildWhirlpoolClient(context, fetcher);
const orcaClient = {
  getPool: (address) => ({ getData: () => ({ tickCurrentIndex: 12354 })})
}

export default orcaClient;
