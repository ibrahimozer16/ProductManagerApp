import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Sahte ürün verisi
const products = [
  {
    id: '1',
    name: 'Akıllı Telefon',
    description: 'Son çıkan güçlü bir akıllı telefon.',
    price: '$799.99',
    image: 'https://dummyimage.com/200x200/000/fff&text=Smartphone',
    stock: 5,
  },
  {
    id: '2',
    name: 'Laptop',
    description: 'Yüksek performans sağlayan iş bilgisayarı.',
    price: '$1299.99',
    image: 'https://dummyimage.com/200x200/000/fff&text=Laptop',
    stock: 3,
  },
  {
    id: '3',
    name: 'Kulaklık',
    description: 'Gürültü engelleyen son model kulaklık.',
    price: '$199.99',
    image: 'https://dummyimage.com/200x200/000/fff&text=Headphones',
    stock: 10,
  },
  {
    id: '4',
    name: 'Akıllı Saat',
    description: 'Her telefon ile uyumlu olan akıllı saat.',
    price: '$249.99',
    image: 'https://dummyimage.com/200x200/000/fff&text=Smartwatch',
    stock: 8,
  },
];

const ProductCatalogScreen = ({navigation}:{navigation:any}) => {
  // Her bir ürünü render eden fonksiyon
  const renderItem = ({ item }: { item: typeof products[0] }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate('ProductDetail', {task: item})} >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productStock}>
          {item.stock > 0 ? `Stokta ${item.stock} adet var` : 'Stokta Yok'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.tabbarContainer}>
        <View style={styles.tabbar}>
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                <Text>Favoriler</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProductCatalog')}>
                <Text>Katalog</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Text>Sepet</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 10,
    padding: 10,
  },
  tabbarContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
  },
  productStock: {
    fontSize: 14,
    color: 'green',
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
});

export default ProductCatalogScreen;
