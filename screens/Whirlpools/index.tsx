import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { Center, HStack, Spinner, Heading } from 'native-base';

import WhirlpoolCard from './components/WhirlpoolCard';
import useWhirlpools from '../../hooks/useWhirlpools';

const Whirlpools = ({ navigation }) => {
  const { isLoading, whirlpools, error } = useWhirlpools();
  const [viewableWhirlpoolAddresses, setViewableWhirlpoolAddresses] = useState<
    string[]
  >([]);

  const sortedWhirlpools = whirlpools?.sort(
    (a, b) => b.volume.day - a.volume.day
  );

  const handleOnViewableItemsChanged = useCallback(({ changed }) => {
    const newlyViewableAddresses = changed
      .filter(({ isViewable }: { isViewable: boolean }) => isViewable)
      .map(({ key }: { key: string }) => key);

    setViewableWhirlpoolAddresses([
      ...viewableWhirlpoolAddresses,
      ...newlyViewableAddresses
    ]);
  }, []);

  if (isLoading) {
    return (
      <Center flexGrow={1}>
        <HStack space={2}>
          <Spinner accessibilityLabel="Loading pools" />
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Center>
    );
  }

  if (error || !whirlpools) {
    return (
      <Center flexGrow={1}>
        <Heading color="primary.500" fontSize="md">
          Something went wrong {error}
        </Heading>
      </Center>
    );
  }

  return (
    <FlatList
      data={sortedWhirlpools}
      keyExtractor={({ address }) => address}
      renderItem={({ item }) => (
        <WhirlpoolCard
          whirlpool={item}
          isViewable={viewableWhirlpoolAddresses.includes(item.address)}
          handleNavigation={() => navigation.navigate("WhirlpoolDetail", {
            poolAddress: item.address,
            name: `${item.tokenMintA?.symbol}/${item.tokenMintB?.symbol}`,
          })}
        />
      )}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 0
      }}
      onViewableItemsChanged={handleOnViewableItemsChanged}
    />
  );
};

export default Whirlpools;
