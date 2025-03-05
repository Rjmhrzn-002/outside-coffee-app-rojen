import React, {useState} from 'react';
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
import {
  BORDER_RADIUS,
  COLORS,
  FONTS,
  SCREEN_HEIGHT,
  SPACING,
} from '../../Constants';
import {storage} from '@configs/mmkvStorage';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
];

const HomeScreen = () => {
  const userInfo: UserInfo | null = storage.get<UserInfo>('userInfo');
  const photo = userInfo?.photo || 'https://via.placeholder.com/40';
  const [activeTab, setActiveTab] = useState(coffeeItems[0].name);

  const coffeeTypes = ['Cappuccino', 'Macchiato', 'Latte', 'Americano'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.DARK_GRAY} />

      <View style={styles.headerContainer}>
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
      </View>

      <View
        style={{
          position: 'relative',
          marginTop: -SCREEN_HEIGHT * 0.085,
          flex: 1,
        }}>
        <View style={styles.promoContainer}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Buy one get one free</Text>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Claim Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={coffeeTypes}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.categoryItem,
                activeTab === item && {backgroundColor: COLORS.PRIMARY},
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
        <FlatList
          data={coffeeItems}
          contentContainerStyle={styles.coffeeListContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.coffeeItemContainer}>
              <Image source={item.image} style={styles.coffeeImage} />
              <View style={styles.coffeeDetailsContainer}>
                <View>
                  <Text style={styles.coffeeName}>{item.name}</Text>
                  <Text style={styles.coffeeDescription}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.coffeeRatingPriceContainer}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <Text style={styles.priceText}>${item.price}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    backgroundColor: COLORS.DARK_GRAY,
    height: SCREEN_HEIGHT * 0.3,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: SPACING.XL,
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
    marginHorizontal: SPACING.XL,
    marginTop: 15,
    backgroundColor: 'red',
    borderRadius: BORDER_RADIUS.MD,
    overflow: 'hidden',
    height: SCREEN_HEIGHT * 0.175,
    position: 'relative',
  },
  promoContent: {
    backgroundColor: '#D17842',
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  promoButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  promoButtonText: {
    color: '#D17842',
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginTop: 15,
    paddingHorizontal: SPACING.XL,
  },
  categoryItem: {
    marginRight: 10,
    backgroundColor: COLORS.OFF_WHITE,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    borderRadius: BORDER_RADIUS.MD,
    maxHeight: 45,
  },
  categoryText: {
    color: COLORS.GREEN,
    fontSize: 16,
  },
  coffeeListContainer: {
    marginHorizontal: SPACING.XL,
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'red',
  },
  coffeeItemContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  coffeeImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 15,
  },
  coffeeDetailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
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
  },
  ratingText: {
    marginLeft: 5,
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
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
