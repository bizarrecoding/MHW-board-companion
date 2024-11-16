import { router, Stack } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";

import { EMAIL_REGEXP } from "../../constants/text";
import { auth } from "../../service/firebase";
import { View, Text, TextInput, Button } from "../Themed";
import { Back } from "../screens/Back";

export const RecoverPassword = () => {
  const [username, setUsername] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const goBack = () => router.back();
  const recover = async () => {
    try {
      if (!username || EMAIL_REGEXP.test(username) === false) {
        setError(`Please enter a valid email.`);
        return;
      }
      setLoading(true);
      await sendPasswordResetEmail(auth, username);
      Alert.alert(`Password reset email sent`, `Please check your email for the reset code.`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Recover Password`,
          headerLeft: () => <Back onPress={goBack} />,
          presentation: `modal`,
        }}
      />

      <Text>Forgot your password?</Text>
      <Text>We will send you a reset code to your registered email.</Text>

      <Text variant="caption" style={styles.error}>
        {error}
      </Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.login_input, { minHeight: 36 }]}
        placeholderTextColor="gray"
        onChangeText={(u) => {
          setUsername(u);
          setError(undefined);
        }}
      />

      <Button
        title="Send reset email"
        style={styles.login_button}
        textStyle={{ fontSize: 18 }}
        onPress={recover}
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
