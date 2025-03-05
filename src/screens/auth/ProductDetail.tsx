import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const ProductDetail = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://via.placeholder.com/150'}}
        style={styles.image}
      />
      <Text style={styles.title}>Product Title</Text>
      <Text style={styles.description}>
        This is a detailed description of the product. It provides all the
        necessary information about the product.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProductDetail;
