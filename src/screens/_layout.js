import 'intl';
import 'intl/locale-data/jsonp/vi';
import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';
import useCachedResources from 'src/hooks/useCachedResources';
import useCachedDataApi from 'src/hooks/useCachedDataApi';
import useTheme from 'src/hooks/useTheme';
import useNavConfigs from 'src/hooks/useNavConfigs';
import * as SplashScreen from 'expo-splash-screen';
import ReduxProvider from 'src/redux';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
  auth: {
    initialRouteName: 'login',
  },
};

const propTypes = {};

const defaultProps = {};

const RootLayoutNav = ({ colorScheme, loggedIn }) => {
  const configs = useNavConfigs();

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          ...configs,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
};

const App = (props) => {
  const [IsReady, SetIsReady] = useState(false);
  const { loading, error } = useCachedResources();
  const { loading: loadingApi, error: e, value: { loggedIn } = {} } = useCachedDataApi();

  const theme = useTheme();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.fill_body);
  }, [theme.fill_body]);

  const LoadFonts = async () => {
    await useCachedResources();
  };

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
      .then(() => {
        LoadFonts()
          .then(() => {
            SetIsReady(true);
            SplashScreen.hideAsync();
          })
          .catch((error) => {
            console.error('Error loading fonts:', error);
            SplashScreen.hideAsync();
          });
      })
      .catch((error) => {
        console.error('Error preventing auto-hide:', error);
      });
  }, []);

  if (!IsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <RootLayoutNav colorScheme={theme.name} loggedIn={loggedIn} />
    </SafeAreaProvider>
  );
};

const RootLayout = (props) => {
  return (
    <ReduxProvider>
      <App />
    </ReduxProvider>
  );
};

RootLayout.propTypes = propTypes;

RootLayout.defaultProps = defaultProps;

export default React.memo(RootLayout);

global.ErrorUtils?.setGlobalHandler((e, isFatal) => {
  if (isFatal) {
    alert(`${e.name}: ${e.message}`)
  }
})
