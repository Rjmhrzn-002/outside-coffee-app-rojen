import React, {useEffect, useReducer, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Alert,
  RefreshControl,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useAuthStore} from '@configs/useAppStore';
import LinearGradient from 'react-native-linear-gradient';
import {StackNavigationProp} from '@react-navigation/stack';
import {signOut} from '@utils/googleSignin';

// Components and configs
import CustomText from '@components/global/CustomText';
import {getRequest} from '@configs/api';
import {storage} from '@configs/mmkvStorage';
import {
  BORDER_RADIUS,
  COLORS,
  CUSTOM_FONT,
  FONT_SIZES,
  responsiveHeight,
  responsiveWidth,
  SCREEN_HEIGHT,
  SPACING,
} from '../../Constants';

// Icons
import StarIcon from '@assets/icons/home/star.svg';
import BogoIcon from '@assets/icons/home/bogo.svg';
import ChevronDown from '@assets/icons/home/chevron-down.svg';
import SearchBar from '@components/global/SearchBar';
import {ICoffee} from '@type/app.type';
import {RootStackParamList} from '@navigations/AppStackNavigation';

// Types
type UserInfo = {
  photo: string;
  givenName: string;
  familyName: string;
  email: string;
  name: string;
  id: string;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductDetail'>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  // State and Hooks
  const {logout} = useAuthStore();
  const isDarkMode = useColorScheme() === 'dark' ? true : false;
  const userInfo: UserInfo | null = storage.get<UserInfo>('userInfo');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, toggleMenu] = useReducer(prev => !prev, false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fetchedCoffeeList, setFetchedCoffeList] = useState<ICoffee[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [regionalTabs, setRegionalTabs] = useState<string[]>([]);

  // User data
  const photo = userInfo?.photo || 'https://via.placeholder.com/40';
  // Animation values
  const fadeAnim = useSharedValue(0);
  const translateX = useSharedValue(50);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{translateX: translateX.value}],
  }));

  const signOutOpacity = useSharedValue(0);
  const translateSignOutX = useSharedValue(50);
  const animatedSignOutStyle = useAnimatedStyle(() => ({
    opacity: signOutOpacity.value,
    transform: [{translateX: translateSignOutX.value}],
  }));

  // Navigation handler
  const handleCardPress = (item: ICoffee) => {
    navigation.navigate('ProductDetail', {item});
  };

  const onRefresh = async () => {
    fetchCoffeList();
  };

  // API call
  const fetchCoffeList = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));

      const fetchedCoffeeList = await getRequest('/api');
      if (Array.isArray(fetchedCoffeeList) && fetchedCoffeeList.length > 0) {
        const uniqueRegions = Array.from(
          new Set(fetchedCoffeeList.map(p => p.region)),
        );
        setRegionalTabs(['All', ...uniqueRegions]);
        setFetchedCoffeList(fetchedCoffeeList);
      } else {
        Alert.alert('Something went wrong !!', 'Unable to get coffee lists');
        setFetchedCoffeList([]);
        setRegionalTabs(['All']);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    signOut();
    logout();
    storage.remove('userInfo');
  };

  const filteredCoffeeList =
    activeTab === 'All'
      ? fetchedCoffeeList
      : fetchedCoffeeList.filter(item => item.region === activeTab);

  // Animate when menu toggles
  useEffect(() => {
    if (isMenuOpen) {
      signOutOpacity.value = withTiming(1, {duration: 300});
      translateSignOutX.value = withTiming(0, {duration: 300});
    } else {
      signOutOpacity.value = withTiming(0, {duration: 300});
      translateSignOutX.value = withTiming(50, {duration: 300});
    }
  }, [isMenuOpen]);

  // Effects
  useEffect(() => {
    fetchCoffeList();
  }, []);

  useEffect(() => {
    if (isLoading) {
      fadeAnim.value = 0;
      translateX.value = 50;
      fadeAnim.value = withTiming(1, {duration: 600});
      translateX.value = withSpring(0, {damping: 60, stiffness: 100});
    } else {
      fadeAnim.value = 0;
      translateX.value = 50;
      fadeAnim.value = withTiming(1, {duration: 600});
      translateX.value = withSpring(0, {damping: 60, stiffness: 100});
    }
  }, [isLoading]);

  const renderCoffeeItem = ({item}: {item: ICoffee}) => (
    <TouchableOpacity
      style={[
        styles.coffeeItemContainer,
        isDarkMode && {backgroundColor: COLORS.LIGHT_GRAY},
      ]}
      onPress={() => handleCardPress(item)}>
      <View style={styles.ratingContainer}>
        <StarIcon />
        <CustomText weight="MEDIUM" style={styles.ratingText}>
          4.8
        </CustomText>
      </View>
      <Image source={{uri: item.image_url}} style={styles.coffeeImage} />
      <View style={styles.coffeeDetailsContainer}>
        <CustomText
          weight="BOLD"
          style={[styles.coffeeName, isDarkMode && {color: COLORS.WHITE}]}>
          {item.name}
        </CustomText>
        <CustomText
          weight="MEDIUM"
          style={[
            styles.coffeeDescription,
            isDarkMode && {color: COLORS.OFF_WHITE},
          ]}>
          {item.description}
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <View style={styles.coffeeRatingPriceContainer}>
            <CustomText weight="SEMI_BOLD" style={styles.priceText}>
              ${item.price}
            </CustomText>
          </View>
          <TouchableOpacity
            onPress={() => handleCardPress(item)}
            style={styles.addButton}>
            <CustomText style={styles.addButtonText}>+</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const CoffeeItemSkeleton = () => {
    return (
      <View
        style={[
          styles.coffeeItemContainer,
          isDarkMode && {backgroundColor: COLORS.LIGHT_GRAY},
        ]}>
        {/* Rating skeleton */}
        <View style={styles.ratingContainer}>
          <View style={styles.skeletonRating} />
        </View>

        {/* Image skeleton */}
        <View style={[styles.coffeeImage, styles.skeletonImage]} />

        {/* Details skeleton */}
        <View style={styles.coffeeDetailsContainer}>
          {/* Name skeleton */}
          <View style={[styles.skeletonText, styles.skeletonName]} />

          {/* Description skeleton */}
          <View style={styles.skeletonDescriptionContainer}>
            <View style={styles.skeletonDescription} />
            <View style={[styles.skeletonDescription, {width: '60%'}]} />
          </View>

          {/* Price and button skeleton */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View style={styles.coffeeRatingPriceContainer}>
              <View style={styles.skeletonPrice} />
            </View>
            <View style={[styles.addButton, styles.skeletonButton]} />
          </View>
        </View>
      </View>
    );
  };

  const HeaderComponent = () => (
    <View style={{gap: 24, marginBottom: 24}}>
      <View style={styles.promoContainer}>
        <Image
          style={styles.promoImage}
          source={require('@assets/images/hero_card_bg.jpg')}
          resizeMode="cover"
        />

        <View style={styles.promoContent}>
          <TouchableOpacity style={styles.promoButton}>
            <CustomText weight="SEMI_BOLD" style={styles.promoButtonText}>
              Promo
            </CustomText>
          </TouchableOpacity>
          <BogoIcon />
        </View>
      </View>
      {fetchedCoffeeList.length > 0 && (
        <Animated.View style={animatedStyle}>
          <FlatList
            data={regionalTabs}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContainer}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  activeTab === item && {
                    backgroundColor: COLORS.PRIMARY,
                  },
                ]}
                onPress={() => setActiveTab(item)}>
                <CustomText
                  style={[
                    styles.categoryText,
                    activeTab === item && {
                      color: COLORS.WHITE,
                      fontFamily: CUSTOM_FONT.FAMILY.MEDIUM,
                    },
                  ]}>
                  {item}
                </CustomText>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Animated.View>
      )}
    </View>
  );

  const renderCoffeeListContent = () => {
    // Check if data is loading
    if (isLoading) {
      // Create an array of dummy items for the skeleton
      const dummyItems = Array(6).fill({id: 'skeleton'});

      return (
        <FlatList
          data={dummyItems}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          ListHeaderComponent={<HeaderComponent />}
          keyExtractor={(_, index) => `skeleton-${index}`}
          renderItem={() => <CoffeeItemSkeleton />}
        />
      );
    }

    return (
      <FlatList
        data={filteredCoffeeList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        ListHeaderComponent={<HeaderComponent />}
        ListFooterComponent={<View style={{paddingBottom: 220}} />}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderCoffeeItem}
      />
    );
  };

  return (
    <View
      style={[styles.container, isDarkMode && {backgroundColor: COLORS.GRAY}]}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={COLORS.TRANSPARENT}
      />

      <LinearGradient
        colors={[COLORS.GRAY, '#222222', COLORS.DARK_GRAY]}
        locations={[0, 0.5, 1]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.headerContainer}
      />

      <View style={styles.floatingWrapper}>
        <View style={styles.locationContainer}>
          <View>
            <CustomText style={styles.locationTitle}>Location</CustomText>
            <CustomText weight="SEMI_BOLD" style={styles.locationText}>
              Bilzen, Tanjungbalai
              <ChevronDown />
            </CustomText>
          </View>
          <View style={styles.headerRightContainer}>
            <Animated.View style={[animatedSignOutStyle, styles.signOutBtn]}>
              <TouchableOpacity onPress={handleLogout}>
                <CustomText style={styles.signOutText}>Sign out</CustomText>
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity onPress={toggleMenu}>
              <Image source={{uri: photo}} style={styles.profileImage} />
            </TouchableOpacity>
          </View>
        </View>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          coffeeList={fetchedCoffeeList}
          onClick={handleCardPress}
        />
        <View
          style={{
            marginHorizontal: SPACING.LG,
            marginBottom: responsiveHeight(5),
          }}>
          {renderCoffeeListContent()}
        </View>
        <View style={styles.coffeeListContainer}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    position: 'relative',
  },
  headerContainer: {
    height: responsiveHeight(33),
  },

  floatingWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    marginTop: responsiveHeight(7),
    gap: responsiveHeight(3),
    height: SCREEN_HEIGHT,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: responsiveWidth(5), // 5% of screen width for horizontal margins
    paddingVertical: SPACING.SM,
  },
  locationTitle: {
    color: 'white',
    fontSize: FONT_SIZES.MD,
    marginBottom: SPACING.XS,
  },
  locationText: {
    color: 'white',
    fontSize: FONT_SIZES.LG,
    marginRight: 5,
  },
  headerRightContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(1.5),
  },
  profileImage: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: BORDER_RADIUS.MD,
  },
  signOutBtn: {
    borderWidth: 1,
    borderColor: COLORS.TEXT,
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: COLORS.DARK_GRAY,
    height: responsiveWidth(12),
    paddingHorizontal: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutText: {
    fontSize: FONT_SIZES.SM,
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY,
    borderRadius: BORDER_RADIUS.MD,
    padding: 4,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    marginLeft: 10,
    fontFamily: CUSTOM_FONT.FAMILY.REGULAR,
  },
  filterButton: {
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: 45,
    height: 45,
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.MD,
  },
  promoContainer: {
    borderRadius: BORDER_RADIUS.MD,
    overflow: 'hidden',
    height: 140,
    position: 'relative',
  },
  promoImage: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS.MD,
  },
  promoContent: {
    ...StyleSheet.absoluteFillObject,
    padding: 15,
    zIndex: 10,
  },
  promoButton: {
    backgroundColor: COLORS.ACCENT,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: BORDER_RADIUS.MD,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: 'white',
    fontSize: 14,
  },
  promoTitle: {
    color: 'white',
    fontSize: 32,
    textShadowColor: 'black',
    width: '60%',
    textShadowOffset: {width: 20, height: -10},
  },

  categoryContainer: {
    maxHeight: 40, // to ensure category container does inherit the flex 1 height
  },
  categoryItem: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.OFF_WHITE,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
  },
  categoryText: {
    color: COLORS.GREEN,
    fontFamily: CUSTOM_FONT.FAMILY.REGULAR,
    fontSize: 16,
  },
  coffeeListContainer: {
    flex: 1,
    paddingHorizontal: SPACING.LG,
  },
  flatListContent: {
    paddingBottom: SPACING.XXL,
  },
  columnWrapper: {
    gap: SPACING.SM,
    justifyContent: 'space-between',
  },
  coffeeItemContainer: {
    minWidth: '49%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    padding: SPACING.XS,
    marginBottom: SPACING.SM,
  },
  coffeeImage: {
    width: '100%',
    height: 140, // Keeps aspect ratio
    borderRadius: 15,
  },
  coffeeDetailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: SPACING.XS,
  },
  coffeeName: {
    fontSize: 16,
    color: COLORS.DARK_GRAY,
  },
  coffeeDescription: {
    color: '#888',
    fontSize: 12,
    marginBottom: 5,
  },
  coffeeRatingPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 20,
    top: 10,
    left: 20,
  },
  ratingText: {
    marginLeft: 5,
    color: 'white',
  },
  priceText: {
    fontSize: 18,
    color: COLORS.GREEN,
  },
  addButton: {
    backgroundColor: '#D17842',
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
  },
  // Add these to your styles object
  skeletonImage: {
    backgroundColor: '#E0E0E0',
  },
  skeletonText: {
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  skeletonName: {
    height: 16,
    width: '80%',
    marginBottom: 8,
  },
  skeletonDescriptionContainer: {
    marginBottom: 5,
  },
  skeletonDescription: {
    height: 10,
    width: '100%',
    marginBottom: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  skeletonPrice: {
    height: 18,
    width: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  skeletonButton: {
    backgroundColor: '#E0E0E0',
  },
  skeletonRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    width: 45,
    height: 20,
    borderRadius: 10,
  },
});

export default HomeScreen;
