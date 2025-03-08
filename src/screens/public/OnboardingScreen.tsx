import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Image,
  useColorScheme,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {COLORS, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import GoogleSignIn from '@assets/icons/google-logo.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {signInWithGoogle} from '@utils/googleSignin';

import {storage} from '@configs/mmkvStorage';
import {useAuthStore} from '@configs/useAppStore';
import CustomText from '@components/global/CustomText';

const AuthScreen = () => {
  const isDarkMode = useColorScheme();
  const [isLoading, setLoading] = useState(false);

  const handleGoogleSignup = async () => {
    const {setAuthenticated} = useAuthStore.getState();

    try {
      setLoading(true);
      const signUpRes = await signInWithGoogle();

      if ('error' in signUpRes) {
        Alert.alert('Unable to recognize the user');
        return;
      }

      const {userInfo, idToken} = signUpRes;

      if (!userInfo || !idToken) {
        Alert.alert('Sign-in failed', 'Missing user data');
        return;
      }

      // Store user information
      storage.set('userInfo', userInfo.data?.user);
      setAuthenticated(idToken);
    } catch (error) {
      console.error('Google Signup Error:', error);
      Alert.alert('Signup Error', 'There was a problem signing up');
    } finally {
      setLoading(false);
    }
  };

  console.log(storage.get('userInfo'), 'userInfo');

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator color={COLORS.PRIMARY_SOFT} />
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
        <CustomText weight="BOLD" style={styles.title}>
          Coffee so good, your taste buds will love it.
        </CustomText>

        <CustomText style={styles.subtitle}>
          The best grain, the finest roast, the powerful flavor.
        </CustomText>
      </View>

      {/* Google Button at Bottom */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.googleButton} onPress={handleGoogleSignup}>
          <GoogleSignIn />
          <CustomText weight="MEDIUM" style={styles.googleButtonText}>
            Continue with Google
          </CustomText>
        </Pressable>
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
  },

  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  imageContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.6,
    position: 'relative',
    paddingTop: 16,
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
    paddingHorizontal: 34,
  },
  title: {
    color: 'white',
    fontSize: 38,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    color: COLORS.LIGHT_GRAY,
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },

  buttonContainer: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    gap: 10,
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#00000054',
    fontSize: 20,
  },
});

export default AuthScreen;
