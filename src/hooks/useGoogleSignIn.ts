import { useState, useEffect } from "react";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { GOOGLE_API } from "@env";

type AuthSuccess = {
  // @ts-ignore
  user: auth.UserCredential | null;
};

const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const [userInfo, setUserInfo] = useState<AuthSuccess | false>(false);

  useEffect(() => {

    GoogleSignin.configure({
      webClientId: GOOGLE_API
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

      const userCredential = await auth().signInWithCredential(googleCredential);

      setUserInfo({
        user: {
          id: userCredential.user.uid,
          email: userCredential.user.email
        }
      });

    } catch (error: any) {

      console.error(error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError("Google Sign-In Cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {

        setError("Google Sign-In In Progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError("Play Services Not Available");
      }

    } finally {
      setLoading(false);
    }
  };

  return { signInWithGoogle, loading, error, userInfo };
};

export default useGoogleSignIn;
