import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  useColorScheme,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  COLORS,
  FONT_SIZES,
  responsiveWidth,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SPACING,
} from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import GoogleSignIn from '@assets/icons/google-logo.svg';
import {signInWithGoogle} from '@utils/googleSignin';

import {storage} from '@configs/mmkvStorage';
import {useAuthStore} from '@configs/useAppStore';
import CustomText from '@components/global/CustomText';
import notifee from '@configs/notifee';

const AuthScreen = () => {
  const isDarkMode = useColorScheme();
  const [isLoading, setLoading] = useState(false);

  const handleGoogleSignup = async () => {
    const {setAuthenticated} = useAuthStore.getState();

    try {
      setLoading(true);
      const signUpRes = await signInWithGoogle();

      if ('error' in signUpRes) {
        if (
          signUpRes.error === 'popup_closed_by_user' ||
          signUpRes.error === 'user_cancelled'
        ) {
          console.log('User dismissed the Google Sign-In popup.');
          return;
        }
        return;
      }

      const {userInfo, idToken} = signUpRes;

      if (!userInfo || !idToken) {
        Alert.alert('Sign-in failed', 'Missing user data');
        return;
      }

      console.log();
      // Store user information
      storage.set('userInfo', userInfo.data?.user);
      setAuthenticated(idToken);
      console.log('userInfo and auth handled before notification');
      if (userInfo.data?.user.givenName) {
        console.log('notification invoked');
        notifee.sendWelcomeNotification({name: userInfo.data.user.givenName});
      }
    } catch (error) {
      console.error('Google Signup Error:', error);
      Alert.alert('Signup Error', 'There was a problem signing up');
    } finally {
      setLoading(false);
    }
  };

  console.log(storage.get('userInfo'), 'userInfo');

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      )}
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={COLORS.TRANSPARENT}
      />
      <View style={styles.imageContainer}>
        <Image
          source={require('@assets/images/coffeeSplash.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        {/* Top Gradient */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.9)', 'transparent']}
          locations={[0, 0.3]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={[styles.gradient, styles.topGradient]}
        />
        {/* Bottom Gradient */}
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
          locations={[0.3, 1]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={[styles.gradient, styles.bottomGradient]}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <CustomText weight="BOLD" style={styles.title}>
            Coffee so good,
          </CustomText>
          <CustomText weight="BOLD" style={styles.title}>
            your taste buds
          </CustomText>
          <CustomText weight="BOLD" style={styles.title}>
            will love it.
          </CustomText>
        </View>

        <CustomText style={styles.subtitle}>
          The best grain, the finest roast, the powerful flavor.
        </CustomText>
      </View>

      {/* Google Button at Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignup}>
          <GoogleSignIn
            width={responsiveWidth(6)}
            height={responsiveWidth(6)}
          />
          <CustomText weight="MEDIUM" style={styles.googleButtonText}>
            Continue with Google
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  imageContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * (SCREEN_HEIGHT < 700 ? 0.5 : 0.6),
    position: 'relative',
    paddingTop: SCREEN_HEIGHT * 0.02,
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
  },

  gradient: {
    position: 'absolute',
    width: '100%',
    height: '30%',
  },

  topGradient: {
    top: 0,
  },

  bottomGradient: {
    bottom: 0,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveWidth(4),
  },

  titleContainer: {
    alignItems: 'center',
    marginBottom: responsiveWidth(4),
  },

  title: {
    color: 'white',
    fontSize: SCREEN_WIDTH * 0.09,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: SCREEN_WIDTH * 0.11,
    marginBottom: 0,
  },

  subtitle: {
    color: COLORS.LIGHT_GRAY,
    fontSize: FONT_SIZES.MD,
    marginHorizontal: SPACING.XL,
    textAlign: 'center',
    marginTop: responsiveWidth(2), // Add some space between title and subtitle
  },

  buttonContainer: {
    paddingBottom: SCREEN_HEIGHT * 0.04,
    paddingTop: SCREEN_HEIGHT * 0.02,
    alignItems: 'center',
  },

  googleButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveWidth(3.5),
    borderRadius: responsiveWidth(2.5),
    alignItems: 'center',
    width: SCREEN_WIDTH < 350 ? '90%' : '80%',
    gap: responsiveWidth(2.5),
    justifyContent: 'center',
  },

  googleButtonText: {
    color: '#00000054',
    fontSize: FONT_SIZES.BASE,
  },
});

export default AuthScreen;
