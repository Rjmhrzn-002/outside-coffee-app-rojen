import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  BORDER_RADIUS,
  COLORS,
  FONTS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SPACING,
} from '../../Constants';
import {storage} from '@configs/mmkvStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type UserInfo = {
  photo: string;
  givenName: string;
  familyName: string;
  email: string;
  name: string;
  id: string;
};

const coffeeItems = [
  {
    name: 'Cappuccino',
    description: 'with Chocolate',
    price: 4.53,
    rating: 4.8,
    image: require('@assets/images/coffeeSplash.jpg'), // Replace with actual image path
  },
  {
    name: 'Cappuccino',
    description: 'with Chocolate',
    price: 4.53,
    rating: 4.8,
    image: require('@assets/images/coffeeSplash.jpg'), // Replace with actual image path
  },
  {
    name: 'Cappuccino',
    description: 'with Chocolate',
    price: 4.53,
    rating: 4.8,
    image: require('@assets/images/coffeeSplash.jpg'), // Replace with actual image path
  },
  {
    name: 'Cappuccino',
    description: 'with Chocolate',
    price: 4.53,
    rating: 4.8,
    image: require('@assets/images/coffeeSplash.jpg'), // Replace with actual image path
  },
  {
    name: 'Cappuccino',
    description: 'with Chocolate',
    price: 4.53,
    rating: 4.8,
    image: require('@assets/images/coffeeSplash.jpg'), // Replace with actual image path
  },
  {
    name: 'Cappuccino',
    description: 'with Chocolate',
    price: 4.53,
    rating: 4.8,
    image: require('@assets/images/coffeeSplash.jpg'), // Replace with actual image path
  },
];

type RootStackParamList = {
  Home: undefined;
  ProductDetail: {itemId: number};
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home', 'ProductDetail'>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const userInfo: UserInfo | null = storage.get<UserInfo>('userInfo');
  const photo = userInfo?.photo || 'https://via.placeholder.com/40';
  const [activeTab, setActiveTab] = useState(coffeeItems[0].name);
  const coffeeTypes = ['Cappuccino', 'Macchiato', 'Latte', 'Americano'];
  const fadeAnim = useSharedValue(0);
  const translateX = useSharedValue(50);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{translateX: translateX.value}],
  }));

  const handleCardPress = (id: number) => {
    navigation.navigate('ProductDetail', {itemId: Number(id)});
  };

  useEffect(() => {
    fadeAnim.value = withTiming(1, {duration: 400});
    translateX.value = withSpring(0, {damping: 60, stiffness: 100});
  }, []);

  return (
    <View style={styles.container}>
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

      <View
        style={{
          position: 'absolute',
          marginTop: 60,
          gap: 24,
          height: SCREEN_HEIGHT,
        }}>
        <View style={styles.locationContainer}>
          <View>
            <Text style={styles.locationTitle}>Location</Text>
            <Text style={styles.locationText}>Bilzen, Tanjungbalai</Text>
          </View>
          <Image source={{uri: photo}} style={styles.profileImage} />
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#888" />
            <TextInput
              style={styles.searchInput}
              keyboardType="default"
              placeholder="Search coffee"
              placeholderTextColor={COLORS.TEXT}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.coffeeListContainer}>
          <FlatList
            data={coffeeItems}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <View style={{gap: 24, marginBottom: 24}}>
                <View style={styles.promoContainer}>
                  <Image
                    style={styles.promoImage}
                    source={require('@assets/images/coffeeSplash.jpg')}
                    resizeMode="cover"
                  />

                  <View style={styles.promoContent}>
                    <TouchableOpacity style={styles.promoButton}>
                      <Text style={styles.promoButtonText}>Promo</Text>
                    </TouchableOpacity>
                    <Text style={styles.promoTitle}>Buy one get one free</Text>
                  </View>
                </View>
                <Animated.View style={animatedStyle}>
                  <FlatList
                    data={coffeeTypes}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryContainer}
                    // ListFooterComponent={() => (
                    //   <View style={{marginRight: SPACING.LG}} />
                    // )}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={[
                          styles.categoryItem,
                          activeTab === item && {
                            backgroundColor: COLORS.PRIMARY,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.categoryText,
                            activeTab === item && {
                              color: COLORS.WHITE,
                              fontWeight: '500',
                            },
                          ]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </Animated.View>
              </View>
            }
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{paddingBottom: 100}}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.flatListContent}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[styles.coffeeItemContainer]}
                onPress={() => handleCardPress(1)}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <Image source={item.image} style={styles.coffeeImage} />
                <View style={styles.coffeeDetailsContainer}>
                  <Text style={styles.coffeeName}>{item.name}</Text>
                  <Text style={styles.coffeeDescription}>
                    {item.description}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={styles.coffeeRatingPriceContainer}>
                      <Text style={styles.priceText}>${item.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.addButton}>
                      <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  headerContainer: {
    height: SCREEN_HEIGHT * 0.325,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: SPACING.XL,
  },
  locationTitle: {
    color: 'white',
  },
  locationText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.MD,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SPACING.XL,
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
  },
  filterButton: {
    backgroundColor: '#D17842',
    padding: 10,
    width: 50,
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
    backgroundColor: '#D17842',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: BORDER_RADIUS.MD,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  promoTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'black',
    width: '60%',
    textShadowOffset: {width: 20, height: -10},
  },

  categoryContainer: {
    maxHeight: 35, // to ensure category container does inherit the flex 1 height
  },
  categoryItem: {
    marginRight: 10,
    backgroundColor: COLORS.OFF_WHITE,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.MD,
  },
  categoryText: {
    color: COLORS.GREEN,
    fontSize: 16,
  },
  coffeeListContainer: {
    flex: 1,
    paddingHorizontal: SPACING.XL,
  },
  flatListContent: {
    paddingBottom: SPACING.XL,
  },
  columnWrapper: {
    gap: SPACING.SM,
    justifyContent: 'space-between',
  },
  coffeeItemContainer: {
    minWidth: '49%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: SPACING.SM,
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
    marginTop: 10,
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  coffeeDescription: {
    color: '#888',
    marginTop: 5,
  },
  coffeeRatingPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 20,
    top: 15,
    left: 20,
  },
  ratingText: {
    marginLeft: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D17842',
  },
  addButton: {
    backgroundColor: '#D17842',
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
