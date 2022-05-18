import { useState, useEffect } from 'react';

const ORCA_TOKENS_ENDPOINT = 'https://mainnet-zp2-v2.orca.so/tokens';
const ORCA_WHIRLPOOLS_ENDPOINT = 'https://mainnet-zp2-v2.orca.so/pools';

const useWhirlpools = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [whirlpools, setWhirlpools] = useState<null | EnrichedWhirlpool[]>(
    null
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWhirlpoolData = async () => {
      const tokensResponse = await fetch(ORCA_TOKENS_ENDPOINT);
      const tokenData: TokenAPI[] = await tokensResponse.json();

      const whirlpoolsResponse = await fetch(ORCA_WHIRLPOOLS_ENDPOINT);
      const whirlpoolsData: WhirlpoolAPI[] = await whirlpoolsResponse.json();

      const enrichedWhirlpoolsData: EnrichedWhirlpool[] = whirlpoolsData.map(
        (data) => ({
          ...data,
          tokenMintA: tokenData.find(
            ({ mint }: { mint: string }) => mint === data.tokenMintA
          ),
          tokenMintB: tokenData.find(
            ({ mint }: { mint: string }) => mint === data.tokenMintB
          )
        })
      );

      setWhirlpools(enrichedWhirlpoolsData);
    };

    fetchWhirlpoolData()
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return { isLoading, whirlpools, error };
};

// TODO: Revisit types
interface TimeIntervals {
  day: number;
  week: number;
  month: number;
}

interface MinMax {
  min: number;
  max: number;
}

interface WhirlpoolAPI {
  address: string;
  whitelisted: boolean;
  tokenMintA: string;
  tokenMintB: string;
  tickSpacing: number;
  price: number;
  lpsFeeRate: number;
  protocolFeeRate: number;
  priceHistory: {
    day: MinMax;
    week: MinMax;
    month: MinMax;
  };
  tokenAPriceUSD: {
    price: number;
    dex: number;
    coingecko: number;
  };
  tokenBPriceUSD: {
    price: number;
    dex: number;
    coingecko: number;
  };
  tvl: number;
  volume: TimeIntervals;
  feeApr: TimeIntervals;
  reward0Apr: TimeIntervals;
  reward1Apr: TimeIntervals;
  reward2Apr: TimeIntervals;
  totalApr: TimeIntervals;
}

interface TokenAPI {
  mint: string;
  coingeckoId: string;
  ftxId?: string;
  logoURI: string;
  name: string;
  symbol: string;
  whitelisted: boolean;
}

export interface EnrichedWhirlpool
  extends Omit<WhirlpoolAPI, 'tokenMintA' | 'tokenMintB'> {
  tokenMintA?: TokenAPI;
  tokenMintB?: TokenAPI;
}

export default useWhirlpools;
