import React, {useEffect, useReducer, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  FONTS,
  SPACING,
} from '../../Constants';
import Modal from 'react-native-modal';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@navigations/AppStackNavigation';
import {RouteProp} from '@react-navigation/native';

import ScreenHeader from '@components/global/ScreenHeader';
import CustomText from '@components/global/CustomText';
import ChevronLeft from '@assets/icons/detail/arrowLeft.svg';
import HeartIcon from '@assets/icons/detail/heart.svg';
import CoffeeBean from '@assets/icons/detail/coffeeBean.svg';
import CoffeBag from '@assets/icons/detail/coffeBag.svg';
import StarIcon from '@assets/icons/home/star.svg';
import apiClient from '@configs/api';
import {storage} from '@configs/mmkvStorage';

type ProductDetailProps = {
  navigation: StackNavigationProp<
    RootStackParamList,
    'BottomTabs',
    'ProductDetail'
  >;
  route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

const ProductDetail: React.FC<ProductDetailProps> = ({navigation, route}) => {
  const {item} = route.params;
  console.log(item, 'product item');
  const isDarkMode = useColorScheme() === 'dark';
  const [expanded, toggleRead] = useReducer(prev => !prev, false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('S');
  const [isFavourite, toggleFav] = useReducer(prev => !prev, false);
  const [isModalVisible, setModalVisible] = useState(false);
  // customize available item
  const sizes = [
    {id: 'S', label: 'Small', price: item.price, weight: `${item.weight}g`},
    {
      id: 'M',
      label: 'Medium',
      price: item.price * 1.38,
      weight: `${parseInt(item.weight) * 1.5}g`,
    },
    {
      id: 'L',
      label: 'Large',
      price: item.price * 1.53,
      weight: `${parseInt(item.weight) * 2}g`,
    },
  ];

  const sizeBasePrice =
    sizes.find(size => size.id === selectedSize)?.price.toFixed(2) || 'N/A';

  const sizeBaseWeight = item.weight
    ? sizes.find(size => size.id === selectedSize)?.weight
    : 'N/A';

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const toggleModal = () => setModalVisible(!isModalVisible);
  const handleContinue = () => {
    toggleModal();
    ToastAndroid.showWithGravity(
      'Purchase Successful!',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    navigation.navigate('BottomTabs');
  };

  useEffect(() => {
    if (item) {
      // fetchProductDetail(itemId); // ! Blocker: GET/:id Endpoint returns empty array
      return;
    }
    Alert.alert('Something went wrong');
  }, [item]);

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && {backgroundColor: COLORS.GRAY}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true}
      />

      <ScreenHeader>
        <View style={[styles.headerContainer]}>
          <TouchableOpacity onPress={handleGoBack} style={styles.headerButton}>
            {isDarkMode ? (
              <ChevronLeft />
            ) : (
              <ChevronLeft color="white" fill="white" />
            )}
          </TouchableOpacity>
          <CustomText
            weight="BOLD"
            style={[
              styles.headerText,
              isDarkMode && {color: COLORS.OFF_WHITE},
            ]}>
            Detail
          </CustomText>
          <TouchableOpacity onPress={toggleFav} style={styles.headerButton}>
            {isFavourite ? (
              <HeartIcon fill="red" />
            ) : isDarkMode ? (
              <HeartIcon fill={COLORS.PRIMARY_SOFT} />
            ) : (
              <HeartIcon />
            )}
          </TouchableOpacity>
        </View>
      </ScreenHeader>

      {/* Main content in ScrollView to handle overflow */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.image_url}} style={styles.image} />
        </View>

        <View style={styles.productInfoContainer}>
          <View style={styles.titleContainer}>
            <CustomText
              weight="BOLD"
              style={[styles.title, isDarkMode && {color: COLORS.OFF_WHITE}]}>
              {item.name}
            </CustomText>
            <CustomText style={styles.subtitle}>{item.region}</CustomText>
            <View style={styles.ratingContainer}>
              <StarIcon />
              <CustomText weight="BOLD" style={styles.ratingText}>
                4.8
              </CustomText>
              <CustomText style={styles.reviewsText}>(230)</CustomText>
            </View>
          </View>

          <View style={styles.attributesContainer}>
            <View style={styles.attributeIconContainer}>
              <CoffeeBean />
            </View>

            <View style={styles.attributeIconContainer}>
              <CoffeBag />
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.descriptionContainer}>
          <CustomText
            weight="BOLD"
            style={[
              styles.sectionTitle,
              isDarkMode && {color: COLORS.OFF_WHITE},
            ]}>
            Description
          </CustomText>
          <View>
            <CustomText
              style={styles.descriptionText}
              numberOfLines={expanded ? undefined : 3}
              ellipsizeMode="tail">
              A cappacino is an approximately 150 ml (5 oz) beverage, with 26 ml
              of espress coffee and 85ml of fresh milk the following of the
              latest trends are extremely scary at this point.
            </CustomText>
            {expanded || (
              <TouchableOpacity
                onPress={toggleRead}
                style={styles.readMoreButton}>
                <CustomText weight="SEMI_BOLD" style={styles.readMoreText}>
                  Read more
                </CustomText>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.sizeContainer}>
          <CustomText
            weight="BOLD"
            style={[
              styles.sectionTitle,
              isDarkMode && {color: COLORS.OFF_WHITE},
            ]}>
            Size
          </CustomText>
          <View style={styles.sizeOptionsContainer}>
            {sizes.map(size => (
              <TouchableOpacity
                key={size.id}
                style={[
                  styles.sizeOption,
                  isDarkMode && {
                    backgroundColor: COLORS.DARK_GRAY,
                    borderColor: COLORS.PRIMARY_SOFT,
                  },
                  selectedSize === size.id && styles.selectedSizeOption,
                ]}
                onPress={() => setSelectedSize(size.id)}>
                <CustomText
                  style={[
                    styles.sizeOptionText,
                    isDarkMode && {
                      color: COLORS.PRIMARY_SOFT,
                    },
                    selectedSize === size.id && styles.selectedSizeText,
                  ]}>
                  {size.id}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.descriptionContainer}>
            <CustomText
              weight="BOLD"
              style={[
                styles.sectionTitle,
                isDarkMode && {color: COLORS.OFF_WHITE},
              ]}>
              Roast Level
            </CustomText>
            <View>
              <CustomText style={styles.descriptionText}>
                {item.roast_level ? item.roast_level : 'N/A'}
              </CustomText>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <CustomText
              weight="BOLD"
              style={[
                styles.sectionTitle,
                isDarkMode && {color: COLORS.OFF_WHITE},
              ]}>
              Weight
            </CustomText>
            <View>
              <CustomText
                style={[styles.descriptionText, {textAlign: 'right'}]}>
                {sizeBaseWeight}
              </CustomText>
            </View>
          </View>
        </View>

        {/* Ensures the Buy Now Container doesn't overlap over the Size */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
      {/* Always fix position of Buy Now to bottom */}
      <View
        style={[
          styles.buyNowContainer,
          isDarkMode && {
            backgroundColor: COLORS.DARK_GRAY,
            borderColor: COLORS.GRAY,
          },
        ]}>
        <View style={[styles.priceContainer]}>
          <CustomText weight="MEDIUM" style={styles.priceLabel}>
            Price
          </CustomText>
          <CustomText weight="SEMI_BOLD" style={styles.price}>
            $ {sizeBasePrice}
          </CustomText>
        </View>
        <TouchableOpacity onPress={toggleModal} style={styles.buyButton}>
          <CustomText weight="BOLD" style={styles.buyButtonText}>
            Buy Now
          </CustomText>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal */}
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={toggleModal} // Close on swipe down
        swipeDirection="down"
        onBackdropPress={toggleModal} // Close on tapping outside
        style={styles.bottomModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}>
        <View
          style={[
            styles.modalContent,
            isDarkMode && {backgroundColor: '#1E1E1E'},
          ]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.handleBar} />
            <CustomText
              weight="SEMI_BOLD"
              style={[styles.modalTitle, isDarkMode && {color: 'white'}]}>
              Purchase Summary
            </CustomText>
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            <Image source={{uri: item.image_url}} style={styles.productImage} />
            <View>
              <CustomText
                weight="BOLD"
                style={[styles.productName, isDarkMode && {color: 'white'}]}>
                {item.name}
              </CustomText>
              <CustomText style={styles.productRegion}>
                {item.region}
              </CustomText>
            </View>
          </View>

          {/* Quantity Selection */}
          <View style={styles.quantityContainer}>
            <CustomText
              style={[styles.sectionTitle, isDarkMode && {color: 'white'}]}>
              Quantity:
            </CustomText>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                onPress={handleDecrease}
                style={styles.quantityButton}>
                <CustomText style={styles.quantityButtonText}>-</CustomText>
              </TouchableOpacity>
              <CustomText
                style={[styles.quantityValue, isDarkMode && {color: 'white'}]}>
                {quantity}
              </CustomText>
              <TouchableOpacity
                onPress={handleIncrease}
                style={styles.quantityButton}>
                <CustomText style={styles.quantityButtonText}>+</CustomText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Price Details */}
          <View style={styles.priceContainer}>
            <CustomText style={styles.priceLabel}>Total Price</CustomText>
            <CustomText style={styles.price}>
              ${(item.price * quantity).toFixed(2)}
            </CustomText>
          </View>

          {/* Confirm Purchase */}
          <TouchableOpacity
            onPress={handleContinue}
            style={styles.confirmButton}>
            <CustomText weight="SEMI_BOLD" style={styles.confirmButtonText}>
              Confirm Purchase
            </CustomText>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.XXL,
    marginHorizontal: SPACING.LG,
  },
  headerButton: {
    paddingVertical: SPACING.XS,
  },
  headerIcon: {
    fontSize: FONT_SIZES.LG,
  },
  headerText: {
    fontSize: FONT_SIZES.LG,
    color: COLORS.DARK_GRAY,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SPACING.MD,
    padding: SPACING.LG,
    paddingBottom: SPACING.LG * 2,
  },
  imageContainer: {
    width: '100%',
    borderRadius: SPACING.MD,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 225,
    resizeMode: 'cover',
  },
  productInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: SPACING.LG,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.XL,
    color: COLORS.DARK_GRAY,
  },
  subtitle: {
    fontSize: FONT_SIZES.MD,
    marginTop: SPACING.XS,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.SM,
  },
  ratingText: {
    fontSize: FONT_SIZES.BASE,
    marginLeft: 5,
    color: COLORS.PRIMARY || '#000',
  },
  reviewsText: {
    fontSize: FONT_SIZES.SM,
    marginLeft: SPACING.XS,
  },
  attributesContainer: {
    flexDirection: 'row',
    gap: SPACING.LG,
  },

  attributeIconContainer: {
    aspectRatio: 1,
    width: 44,
    borderRadius: BORDER_RADIUS.XS,
    backgroundColor: '#FFF0F0',
    padding: SPACING.SM,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },
  attributeIcon: {
    fontSize: FONT_SIZES.MD,
  },
  attributeText: {
    fontSize: FONT_SIZES.SM,
    color: COLORS.DARK_GRAY,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginVertical: SPACING.LG,
  },
  descriptionContainer: {
    marginBottom: SPACING.LG,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.LG,
    color: COLORS.DARK_GRAY,
    marginBottom: SPACING.MD,
  },
  descriptionText: {
    fontSize: FONT_SIZES.MD,
    lineHeight: FONT_SIZES.MD * 1.5,
    textAlign: 'justify',
  },
  readMoreButton: {
    marginTop: 4,
  },
  readMoreText: {
    color: COLORS.PRIMARY,
  },
  sizeContainer: {
    marginBottom: SPACING.LG,
  },
  sizeOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.MD,
  },
  sizeOption: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderRadius: SPACING.SM,
    borderColor: '#DEDEDE',
    padding: SPACING.MD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSizeOption: {
    backgroundColor: COLORS.PRIMARY_SOFT,
    borderColor: COLORS.PRIMARY,
  },
  sizeOptionText: {
    fontFamily: 'Sora-Bold',
    fontSize: FONT_SIZES.MD,
    // fontWeight: 'bold',
    color: COLORS.TEXT || '#333',
  },
  selectedSizeText: {
    color: COLORS.PRIMARY,
  },
  bottomSpacer: {
    height: 80,
  },
  buyNowContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.BACKGROUND,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopRightRadius: BORDER_RADIUS.XL,
    borderTopLeftRadius: BORDER_RADIUS.XL,
    borderColor: '#F1F1F1',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: FONT_SIZES.SM,
  },
  price: {
    fontSize: FONT_SIZES.LG,
    // fontWeight: 'bold',
    color: COLORS.PRIMARY || '#000',
  },
  buyButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG * 2,
    borderRadius: SPACING.MD,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: FONT_SIZES.MD,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  handleBar: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: COLORS.GRAY,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  productName: {
    color: COLORS.GRAY,
    fontSize: FONT_SIZES.XL,
  },
  productRegion: {
    fontSize: FONT_SIZES.MD,
  },
  quantityContainer: {
    marginBottom: 15,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    width: 120,
    alignSelf: 'center',
  },
  quantityButton: {
    padding: SPACING.SM,

    backgroundColor: COLORS.PRIMARY_SOFT,
    borderRadius: 5,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: COLORS.PRIMARY,
  },
  quantityButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 18,
    paddingHorizontal: 10,
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  confirmButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
});

export default ProductDetail;
