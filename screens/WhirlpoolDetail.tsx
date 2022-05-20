import { Text, Box, Avatar, HStack, Heading, VStack, Divider, Center, Spinner } from 'native-base';
import useWhirlpools, { EnrichedWhirlpool } from '../hooks/useWhirlpools';

const WhirlpoolDetail = ({ route }) => {
  const { poolAddress } = route.params;
  // TODO: See if there is a /get/{address} route. If not, use map instead of arr.
  const { isLoading, whirlpools, error } = useWhirlpools();

  if (isLoading) {
    return(
      <Center flexGrow={1}>
        <HStack space={2}>
          <Spinner accessibilityLabel="Loading pools" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Center>
    )
  }

  if (error || !whirlpools) {
    return(<Text>Error</Text>)
  }

  const whirlpool: EnrichedWhirlpool = whirlpools.find(({ address }) => address === poolAddress);
  
  if (!whirlpool) {
    return(<Text>Error</Text>);
  }

  const { tokenMintA, tokenMintB, totalApr, volume, lpsFeeRate, tvl } = whirlpool;
  return(
    <Box p={4}>
      <HStack mt={2} justifyContent="space-between" alignItems="center">
        <Heading>
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

      <VStack py={4}>
        <HStack py={1} justifyContent="space-between">
          <Text fontSize="md" bold>
            24h Volume
          </Text>
          <Text fontSize="md">
            ${new Intl.NumberFormat().format(Number(volume?.day.toFixed(2)))}
          </Text>
        </HStack>

        <HStack py={1} justifyContent="space-between">
          <Text fontSize="md" bold>
            24h fees
          </Text>
          <Text fontSize="md">
            ${new Intl.NumberFormat().format(Number((volume?.day * lpsFeeRate).toFixed(2)))}
          </Text>
        </HStack>

        <HStack py={1} justifyContent="space-between">
          <Text fontSize="md" bold>
            Fee Rate
          </Text>
          <Text fontSize="md">
            {lpsFeeRate * 100}%
          </Text>
        </HStack>

        <HStack py={1} justifyContent="space-between">
          <Text fontSize="md" bold>
            Liquidity
          </Text>
          <Text fontSize="md">
            ${new Intl.NumberFormat().format(Number(tvl?.toFixed(2)))}
          </Text>
        </HStack>
        <HStack py={1} justifyContent="space-between">
          <Text fontSize="md" bold>
            Other
          </Text>
          <Text fontSize="md">
            Data
          </Text>
        </HStack>

        <HStack py={4} justifyContent="center">
          <Text bold fontSize="2xl">
            {totalApr?.day.toFixed(2) * 100}% APY
          </Text>
        </HStack>

        <Divider my={2} />

        <VStack py={4}>
          <Heading size="md">About</Heading>

          <Text pt={2}>
            This is very informative and helpful copy. It could include information about 
            protocols, tokens, words of wisdom, legal stuff, and more!
          </Text>
        </VStack>

        <VStack py={4}>
          <Heading size="md">Carousel of other pools</Heading>

          <Text pt={2}>
            A horizontal ScrollView of other pools could go here.
          </Text>
        </VStack>
      </VStack>
    </Box>
  )
}

export default WhirlpoolDetail;