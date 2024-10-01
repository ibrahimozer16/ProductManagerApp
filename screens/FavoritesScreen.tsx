import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ProductContext } from '../context/ProductContext';

const FavoritesScreen = ({navigation}:{navigation:any}) => {
  const productContext = useContext(ProductContext);

  // Context'in undefined olup olmadığını kontrol et
  if (!productContext) {
      return (
          <View>
              <Text>ProductContext yüklenmedi!</Text>
          </View>
      );
  }

  const { favorites, removeFromFavorites } = productContext;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Favorilerim</Text>
      </View>
      <View style={styles.listContainer}>
        {favorites.length === 0 ? (
          <Text>Favorilere eklenmiş ürün bulunmuyor.</Text>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.list} onPress={() => navigation.navigate('ProductDetail', {task: item})}>
                <Image source={{uri : item.image}} style={styles.image}/>
                <View>
                  <Text>{item.name}</Text>
                  <Text>Fiyat: {item.price}</Text>
                  <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
                    <Text style={{ color: 'red' }}>Favorilerden Çıkar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
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
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  listContainer: {
    flex: 9,
    padding: 10,
  },
  tabbarContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  list: { 
    padding: 10, 
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})

export default FavoritesScreen;
