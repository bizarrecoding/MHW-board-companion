import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Text } from "../components/Themed";
import Colors from "../constants/Colors";
import { DarkTheme, DefaultTheme } from "../constants/theme";
import { UserContext, UserContextProvider } from "../context/UserContext";
import { auth } from "../service/firebase";
import { RootState, persistor, store } from "../util/redux/store";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <UserContextProvider>
            <RootLayoutNav />
          </UserContextProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const systemColorScheme = useColorScheme() ?? `light`;
  const themePreference = useSelector((state: RootState) => state.settings.theme);
  const theme = themePreference === "system" ? systemColorScheme : themePreference;

  const statusBarStyle = theme === `dark` ? `light` : `dark`;
  const { background, text } = Colors[theme];
  const { user, setUser, isGuest, setIsGuest } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    // Fast login
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //console.log(`🚀 ~ onAuthStateChanged:`, user?.uid);
      if (user) {
        setUser(user);
        setIsGuest(false);
        router.replace(`/(drawer)/inventory`);
      } else if (!isGuest) {
        setUser(null);
        router.replace(`/`);
      }
    });
    return unsubscribe;
  }, [setUser, isGuest]);
  return (
    <ThemeProvider value={theme === `dark` ? DarkTheme : DefaultTheme}>
      <StatusBar style={statusBarStyle} />
      <Stack initialRouteName={user || isGuest ? `/(drawer)` : `index`}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Protected guard={!!user || isGuest}>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{
              // ios modal statusBar are always light text/black background
              statusBarStyle: Platform.select({ ios: `light`, default: statusBarStyle }),
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
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}
