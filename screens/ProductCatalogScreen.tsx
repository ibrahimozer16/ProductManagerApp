import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView } from 'react-native';
import { ProductContext } from '../context/ProductContext';


const ProductCatalogScreen = ({navigation}:{navigation:any}) => {

  const productContext = useContext(ProductContext);
  const [searchText, setSearchText] = useState(''); // Arama için state
  const [modalVisible, setModalVisible] = useState(false); // Modal kontrolü
  const [minPrice, setMinPrice] = useState(''); // Minimum fiyat aralığı
  const [maxPrice, setMaxPrice] = useState(''); // Maksimum fiyat aralığı
  const [minStock, setMinStock] = useState(''); // Minimum fiyat aralığı
  const [maxStock, setMaxStock] = useState(''); // Maksimum fiyat aralığı

  // Context'in undefined olup olmadığını kontrol et
  if (!productContext) {
    return (
      <View>
        <Text>ProductContext yüklenemedi!</Text>
      </View>
    );
  }

  const { products } = productContext; // Ürünleri çekiyoruz

  const filteredProducts = products.filter(item => {
    const matchesSearchText = item.name.toLowerCase().includes(searchText.toLowerCase()) || 
      item.description.toLowerCase().includes(searchText.toLowerCase())
    
    const price = parseFloat(item.price.replace(/[^\d.-]/g, ''));
    const matchesPriceRange = (!minPrice || price >= parseFloat(minPrice)) && (!maxPrice || price <= parseFloat(maxPrice));
  
    const stock = item.stock
    const matchesStock = (!minStock || stock >= parseInt(minStock)) && (!maxStock || stock <= parseInt(maxStock))

    return matchesSearchText && matchesPriceRange && matchesStock;  
  })

  // Filtreleme Modalını açma fonksiyonu
  const handleFilter = () => {
    setModalVisible(true); // Modalı aç
  };

  // Filtreyi uygula ve Modal'ı kapat
  const applyFilter = () => {
    setModalVisible(false); // Modalı kapat
  };

  

  // Her bir ürünü render eden fonksiyon
  const renderItem = ({ item }: { item: typeof products[0] }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate('ProductDetail', {task: item})} >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={[styles.productStock, {color: item.stock > 0 ? 'green' : 'red'}]}>
          {item.stock > 0 ? `Stokta ${item.stock} adet var` : 'Stokta Yok'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Ürün Ara'
          value={searchText}
          onChangeText={setSearchText}
          keyboardType='default'
        />
        <TouchableOpacity style={styles.button} onPress={handleFilter}>
          <Text style={styles.text}>Filtrele</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
      </View>
      {/* Filtreleme için Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Fiyat Aralığı Belirleyin</Text>
            <TextInput
              style={styles.input}
              placeholder="Minimum Fiyat"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
            />
            <TextInput
              style={styles.input}
              placeholder="Maksimum Fiyat"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />
            <Text style={styles.modalTitle}>Stok Aralığı Belirleyin</Text>
            <TextInput
              style={styles.input}
              placeholder="Minimum Stok"
              keyboardType="numeric"
              value={minStock}
              onChangeText={setMinStock}
            />
            <TextInput
              style={styles.input}
              placeholder="Maksimum Stok"
              keyboardType="numeric"
              value={maxStock}
              onChangeText={setMaxStock}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={applyFilter}>
                <Text>Uygula</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    margin: 10,
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
  input: {
    borderWidth: 1,
    borderRadius: 15,
    width: '80%',
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
  },
});

export default ProductCatalogScreen;
