import { ORCA_WHIRLPOOLS_CONFIG } from '@orca-so/whirlpools-sdk';

import orcaClient from '.';

const ORCA_USDC_ADDRESS = '5Z66YYYaTmmx1R4mATAGLSc8aV4Vfy5tNdJQzk1GP9RF';

describe('orcaClient', () => {
  it('fetches pool', async () => {
    const pool = await orcaClient.getPool(ORCA_USDC_ADDRESS);

    expect(pool.getData().whirlpoolsConfig).toEqual(ORCA_WHIRLPOOLS_CONFIG);
  });
});
