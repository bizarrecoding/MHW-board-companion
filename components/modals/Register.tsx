import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { useColorScheme, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import { useFireAuth } from "../../hooks/useFireAuth";
import { View, Text, Button, TextInput } from "../Themed";
import { Back } from "../screens/Back";

export const Register = () => {
  const colorScheme = useColorScheme() ?? `light`;
  const { background } = Colors[colorScheme];
  const { registerUser } = useFireAuth();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [password2, setPassword2] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const register = async () => {
    try {
      if (password !== password2) {
        setError(`Passwords do not match.`);
        return;
      }
      if (!username || !password) {
        setError(`Please enter a valid username or password.`);
        return;
      }
      setLoading(true);
      await registerUser(username, password);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const goBack = () => router.back();
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Stack.Screen
        options={{
          title: `Register`,
          headerLeft: () => <Back onPress={goBack} />,
          presentation: `modal`,
        }}
      />
      <Text variant="title">Create your account</Text>
      <Text variant="caption" style={styles.error}>
        {error}
      </Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.login_input, { minHeight: 36 }]}
        placeholderTextColor="gray"
        onChangeText={(u) => setUsername(u)}
      />
      <TextInput
        variant="password"
        onChangeText={(p) => setPassword(p)}
        style={styles.login_input}
        placeholder="Password"
        placeholderTextColor="gray"
        textContentType="password"
      />
      <TextInput
        variant="password"
        onChangeText={(p) => setPassword2(p)}
        style={styles.login_input}
        placeholder="Password"
        placeholderTextColor="gray"
        textContentType="password"
      />
      <Button
        title="Sign up"
        style={styles.login_button}
        textStyle={{ fontSize: 18 }}
        onPress={register}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
  },
  error: {
    color: `red`,
    marginVertical: 10,
    textAlign: `center`,
  },
  login_input: {
    width: 300,
  },
  login_button: {
    width: 300,
    marginVertical: 20,
  },
});
