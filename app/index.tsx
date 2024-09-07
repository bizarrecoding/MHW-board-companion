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
      router.replace(`/inventory`);
    } catch (error) {
      setError(`Please enter a valid username or password.`);
      console.error(error);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      // purposely set an empty string to clear the error message and still keep the space
      if (error) setError(` `);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
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
        secureTextEntry
        onChangeText={(p) => setPassword(p)}
        style={styles.login_input}
        placeholder="Password"
        placeholderTextColor="gray"
        keyboardType="visible-password"
        passwordRules="minlength: 8;"
      />
      <Button
        title="Login"
        style={styles.login_button}
        textStyle={{ fontSize: 18 }}
        onPress={login}
      />
      <View style={{ flexDirection: `row`, marginVertical: 10 }}>
        <Text>Don't have an account?</Text>
        <Button
          title=" Sign up"
          variant="clear"
          style={styles.register_button}
          textStyle={{ fontSize: 14, color: accent }}
          onPress={register}
        />
      </View>
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
    width: 200,
    height: 200,
    marginBottom: 40,
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
  register_button: {
    minWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});
