import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider config={NATIVE_BASE_CONFIG}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}

const NATIVE_BASE_CONFIG = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};
