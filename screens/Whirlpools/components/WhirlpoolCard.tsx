import { useEffect, useState } from 'react';
import {
  Skeleton,
  VStack,
  HStack,
  Heading,
  Box,
  Divider,
  Text,
  Avatar,
  Pressable,
} from 'native-base';

import { EnrichedWhirlpool } from '../../../hooks/useWhirlpools';
import orcaClient from './orcaClient';

const WhirlpoolCard = ({
  whirlpool,
  isViewable,
  handleNavigation,
}: {
  whirlpool: EnrichedWhirlpool;
  isViewable: boolean;
  handleNavigation: () => void;
}) => {
  const { tokenMintA, tokenMintB, volume, totalApr } = whirlpool;
  const [tickCurrentIndex, setTickCurrentIndex] = useState<null | number>(null);

  useEffect(() => {
    const fetchPoolData = async () => {
      let poolData = { tickCurrentIndex: 123 }
      
      try {
        poolData = (await orcaClient.getPool(whirlpool.address)).getData();
      } catch(error) {
        console.log(error)
      }

      setTickCurrentIndex(poolData.tickCurrentIndex);
    };

    if (isViewable && !tickCurrentIndex) {
      fetchPoolData();
    }
  }, [isViewable]);

  return (
    <Box
      mx={4}
      my={2}
      bg={{
        linearGradient: {
          colors: ['lightBlue.500', 'violet.800'],
          start: [0, 0],
          end: [0, 1]
        }
      }}
      rounded="xl"
    >
      <Pressable onPress={handleNavigation}>  
        <HStack justifyContent="space-between" alignItems="center" p={4}>
          <Heading color="light.50">
            {tokenMintA?.symbol ?? 'Not found'} /{' '}
            {tokenMintB?.symbol ?? 'Not found'}
          </Heading>
          <Avatar.Group>
            <Avatar
              bg="blue.500"
              source={{
                uri: tokenMintA?.logoURI
              }}
            >
              Token A
            </Avatar>
            <Avatar
              bg="blue.500"
              source={{
                uri: tokenMintB?.logoURI
              }}
            >
              Token B
            </Avatar>
          </Avatar.Group>
        </HStack>

        <Divider />

        <VStack px={4} py={2}>
          <HStack py={1} justifyContent="space-between">
            <Text color="light.50" fontSize="md" bold>
              24h Volume
            </Text>
            <Text color="light.50" fontSize="md">
              ${new Intl.NumberFormat().format(Number(volume?.day.toFixed(2)))}
            </Text>
          </HStack>

          <HStack py={1} justifyContent="space-between">
            <Text color="light.50" fontSize="md" bold>
              APY
            </Text>
            <Text color="light.50" fontSize="md">
              {totalApr?.day.toFixed(2) * 100}%
            </Text>
          </HStack>

          {!tickCurrentIndex ? (
            <Skeleton h={5} />
          ) : (
            <HStack py={1} justifyContent="space-between">
              <Text color="light.50" fontSize="md" bold>
                Tick Current Index (from client)
              </Text>
              <Text color="light.50" fontSize="md">
                {tickCurrentIndex}
              </Text>
            </HStack>
          )}
        </VStack>
      </Pressable>
    </Box>
  );
};

export default WhirlpoolCard;