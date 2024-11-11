import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, useColorScheme, Image } from "react-native";

import { Button, Text, TextInput } from "../components/Themed";
import Colors from "../constants/Colors";
import { useFireAuth } from "../hooks/useFireAuth";

const Login: React.FC = () => {
  const colorScheme = useColorScheme();
  const { background, accent } = Colors[colorScheme ?? `light`];
  const { loginUser, registerUser } = useFireAuth();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const register = async () => {
    try {
      if (!username || !password) {
        setError(`Please enter a valid username or password.`);
        return;
      }
      await registerUser(username, password);
    } catch (error) {
      console.error(error);
    }
  };
  const login = async () => {
    try {
      if (!username || !password) {
        setError(`Please enter a valid username or password.`);
        return;
      }
      await loginUser(username, password);
      router.replace(`/story`);
    } catch (error) {
      setError(`Please enter a valid username or password.`);
      console.error(error);
    }
  };
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        // purposely set an empty string to clear the error message and still keep the space
        setError(` `);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error]);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Image source={require(`../assets/images/icon.png`)} style={styles.app_icon} />
      <Text variant="caption" style={styles.error}>
        {error}
      </Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.login_input}
        placeholderTextColor="gray"
        onChangeText={(u) => setUsername(u)}
      />
      <TextInput
        variant="password"
        onChangeText={(p) => setPassword(p)}
        style={styles.login_input}
        placeholder="Password"
        placeholderTextColor="gray"
      />
      <Button
        title="Login"
        style={styles.login_button}
        textStyle={{ fontSize: 18 }}
        onPress={login}
      />
      <Text style={{ textAlign: `center`, marginVertical: 10 }}>
        Don't have an account?{` `}
        <Text style={{ color: accent }} onPress={register}>
          Sign up.
        </Text>
      </Text>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
  },
  app_icon: {
    width: 320,
    height: 320,
  },
  error: {
    color: `red`,
    marginVertical: 10,
    textAlign: `center`,
  },
  login_input: {
    width: 240,
  },
  login_button: {
    width: 240,
    marginVertical: 20,
  },
});
