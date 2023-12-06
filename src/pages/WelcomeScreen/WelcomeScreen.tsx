import React, { useEffect, useState } from "react";
import { Text, View, KeyboardAvoidingView, Platform, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@store/reducers/userSlice";

import useGoogleSignIn from "../../hooks/useGoogleSignIn";
import styles from "./welcomeScreen.styles";
import Input from "@components/Input/Input";
import { appLogo } from "@constants/icons";
import Button from "@components/Button/Button";
import auth from "@react-native-firebase/auth";
import { COLORS } from "@constants/theme";


const WelcomeScreen = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [error, setError] = useState<string | false>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { signInWithGoogle, loading: googleSignInLoading, error: googleSignInError, userInfo } = useGoogleSignIn();

  const dispatch = useDispatch();
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateFields = (): boolean => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };


  useEffect(() => {
    if (userInfo) {
      dispatch(setUserInfo(userInfo.user));
    }
  }, [userInfo]);

  useEffect(() => {
    setError(googleSignInError);
  }, [googleSignInError]);

  const handleSignIn = async () => {
    try {
      if (!validateFields()) return;

      setLoading(true);
      const response = await auth().signInWithEmailAndPassword(email, password);

      console.log("User logged in:", response.user.uid);
      const userData = {
        id: response.user.uid,
        email: String(response.user.email)
      };

      dispatch(setUserInfo(userData));

    } catch (e: any) {
      console.error("Login failed:", e.message);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      if (!validateFields()) return;

      setLoading(true);
      const response = await auth().createUserWithEmailAndPassword(email, password);
      console.log("User registered:", response.user);
      dispatch(setUserInfo({ email: response.user.email as string, id: response.user.uid }));
    } catch (e: any) {
      console.error("Registration failed:", e.message);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={appLogo}
      />
      <Text style={styles.title}>Welcome</Text>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={70}>
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        <Input label="Email"
               keyboardType="email-address"
               value={email}
               onChangeText={(text) => {
                 setEmail(text);
                 setEmailError(null);
               }} />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <Input label="Password"
               secureTextEntry={true}
               value={password}
               onChangeText={(text) => {
                 setPassword(text);
                 setPasswordError(null);
               }} />
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.authStatus}>{isSignUp ? "Already have an account? Sign In" : "Create an Account"}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={isSignUp ? handleSignUp : handleSignIn}
          containerStyle={styles.logBtn}>
          {loading ? <ActivityIndicator size="small" color={COLORS.primaryViolent} /> :

            <Text style={styles.logBtnText}>{isSignUp ? "Sign Up" : "Log In"}</Text>}
        </Button>

        <Text style={styles.socialTitle}>Or Sign in Using</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => signInWithGoogle()}
          disabled={googleSignInLoading}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;
