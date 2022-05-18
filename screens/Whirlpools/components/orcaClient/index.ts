import {
  Connection,
  Transaction,
  ConnectionConfig,
  Keypair
} from '@solana/web3.js';
import {
  buildWhirlpoolClient,
  WhirlpoolContext,
  AccountFetcher,
  ORCA_WHIRLPOOL_PROGRAM_ID
} from '@orca-so/whirlpools-sdk';

const CONNECTION_ENDPOINT = 'https://api.mainnet-beta.solana.com';
const CONNECTION_CONFIG: ConnectionConfig = {
  commitment: 'confirmed'
};

const DUMMY_WALLET = {
  async signTransaction(tx: Transaction) {
    return tx;
  },
  async signAllTransactions(txs: Transaction[]) {
    return txs;
  },
  publicKey: Keypair.generate().publicKey
};

const connection = new Connection(CONNECTION_ENDPOINT, CONNECTION_CONFIG);
const context = WhirlpoolContext.from(
  connection,
  DUMMY_WALLET,
  ORCA_WHIRLPOOL_PROGRAM_ID
);
const fetcher = new AccountFetcher(context.provider.connection);
const orcaClient = buildWhirlpoolClient(context, fetcher);

export default orcaClient;
