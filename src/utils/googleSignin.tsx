import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';

const WEB_CLIENT_ID =
  '467606413819-s1b0e6qk9pdal64nh8c1tnrnh36gncg8.apps.googleusercontent.com';

const IOS_CLIENT_ID =
  '467606413819-f6h58s38hqojb3tbpvebo260oav19ehq.apps.googleusercontent.com';

let isConfigured = false;

const checkIsGoogleConfigured = () => {
  if (!isConfigured) {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      scopes: ['profile', 'email'],
      offlineAccess: true,
    });
    isConfigured = true;
  }
  return;
};

export const signInWithGoogle = async () => {
  try {
    checkIsGoogleConfigured();

    if (Platform.OS === 'android') {
      const hasServices = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
    }

    const userInfo = await GoogleSignin.signIn();

    const {idToken} = await GoogleSignin.getTokens();

    return {success: true, userInfo, idToken};
  } catch (error: any) {
    console.error('❌ Google Sign-In Error', {
      platform: Platform.OS,
      errorCode: error.code,
      timestamp: new Date().toISOString(),
      errorMessage: error.message,
    });

    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        return {error: 'Sign-in cancelled by user'};
      case statusCodes.IN_PROGRESS:
        return {error: 'Sign-in already in progress'};
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        return {error: 'Google Play Services unavailable'};
      default:
        return {error: 'Google Sign-In failed'};
    }
  }
};

export const signOut = async () => {
  try {
    checkIsGoogleConfigured();
    await GoogleSignin.signOut();
    return {success: true};
  } catch (error: any) {
    console.error('❌ Google Sign-Out Error:', error.message);
    return {error: 'Google Sign-Out failed'};
  }
};
