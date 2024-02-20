import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform, StatusBar, useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Text } from "../components/Themed";
import Colors from "../constants/Colors";
import { DarkTheme, DefaultTheme } from "../constants/theme";
import { persistor, store } from "../util/redux/store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: `(tabs)`,
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require(`../assets/fonts/SpaceMono-Regular.ttf`),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const statusBarStyle = colorScheme === `dark` ? `light-content` : `dark-content`;
  const { background, text } = Colors[colorScheme ?? `light`];
  return (
    <ThemeProvider value={colorScheme === `dark` ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <StatusBar barStyle={statusBarStyle} />
          <Stack
            screenOptions={{
              statusBarColor: background,
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{
                // ios modal statusBar are always light text
                statusBarColor: Platform.select({ ios: `#000`, default: background }),
                presentation: `modal`,
                headerTintColor: text,
                headerStyle: {
                  backgroundColor: background,
                },
                headerTitleStyle: {
                  color: text,
                },
              }}
            />
          </Stack>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
