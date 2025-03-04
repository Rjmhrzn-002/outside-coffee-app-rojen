import React, {useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Image,
  useColorScheme,
  Platform,
} from 'react-native';
import {COLORS, SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import GoogleSignIn from '@assets/icons/google-logo.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import {GOOGLE_WEB_CLIENT_ID} from '@env';
const AuthScreen = () => {
  const isDarkMode = useColorScheme();

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

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
        <Text style={styles.title}>Coffee so good,</Text>
        <Text style={styles.title}>your taste buds will love it.</Text>

        <Text style={styles.subtitle}>
          The best grain, the finest roast, the powerful flavor.
        </Text>
      </View>

      {/* Google Button at Bottom */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.googleButton}>
          <GoogleSignIn />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
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
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default AuthScreen;
