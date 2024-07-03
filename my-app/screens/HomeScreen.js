import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const products = [
  { id: '1', name: 'Office Wear', price: 120, image: require('./dress1.png') },
  { id: '2', name: 'Black', price: 120, image: require('./dress2.png') },
  { id: '3', name: 'Church Wear', price: 120, image: require('./dress3.png') },
  { id: '4', name: 'Lamerei', price: 120, image: require('./dress4.png') },
  { id: '5', name: '21WN', price: 120, image: require('./dress5.png') },
  { id: '6', name: 'Lopo', price: 120, image: require('./dress6.png') },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const addToCart = async (product) => {
    let cartItems = [];
    const savedCart = await AsyncStorage.getItem('cart');
    if (savedCart) {
      cartItems = JSON.parse(savedCart);
    }
    const newCartItems = [...cartItems, product];
    await AsyncStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Open Fashion</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartButton}>Cart</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartButton: {
    fontSize: 16,
    color: '#000',
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  productName: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'tomato',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default HomeScreen;
