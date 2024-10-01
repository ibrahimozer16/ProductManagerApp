import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { ProductContext } from '../context/ProductContext';

export default function ProductDetailScreen({navigation, route}: {navigation: any, route: any}) {
  const {task} = route.params;
  // Context'i güvenli şekilde kullanıyoruz
  const productContext = useContext(ProductContext);

  // Context'in undefined olup olmadığını kontrol et
  if (!productContext) {
      return (
          <View>
              <Text>ProductContext yüklenmedi!</Text>
          </View>
      );
  }

  const { addToCart, addToFavorites, cart, favorites, removeFromCart, removeFromFavorites } = productContext;

  const [quantity, setQuantity] = useState<string>('1');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleQuantityChange = (text: string) => {
    setQuantity(text);
  };

  const addProductToCart = () => {
    const qty = parseInt(quantity);

    if (isNaN(qty) || qty <= 0) {
      Alert.alert("Hata", "Lütfen geçerli bir miktar girin.");
      return;
    }

    if (qty > task.stock) {
      Alert.alert("Hata", `Maksimum stok miktarı: ${task.stock}`);
      return;
    }

    const existingProduct = cart.find((item) => item.id === task.id);

    // Eğer ürün zaten sepette varsa uyarı mesajı göster
    if (existingProduct) {
      Alert.alert(
        "Ürün zaten sepette",
        `${task.name} zaten sepette ${qty} tane mevcut. Yine de eklemek ister misiniz?`,
        [
          { text: "İptal", style: "cancel" },
          {
            text: "Yine de ekle",
            onPress: () => {
              removeFromCart(task.id);
              addToCart({ ...task, quantity: qty });
              Alert.alert("Başarılı", `${qty} adet ${task.name} sepete yeniden eklendi.`);
              setModalVisible(false);
            }
          }
        ]
      );
    } else {
      addToCart({ ...task, quantity: qty });
      Alert.alert("Başarılı", `${qty} adet ${task.name} sepete eklendi.`);
      setModalVisible(false);
    }
  };

  const handleAddToFavorites = () => {
    const existingFavorite = favorites.find((item) => item.id === task.id);

    if (existingFavorite) {
      Alert.alert(
        "Ürün zaten favorilerde",
        `${task.name} zaten favorilerde mevcut. Yine de eklemek ister misiniz?`,
        [
          { text: "İptal", style: "cancel" },
          {
            text: "Yine de ekle",
            onPress: () => {
              removeFromFavorites(task.id);
              addToFavorites(task);
              Alert.alert("Başarılı", `${task.name} favorilere yeniden eklendi.`);
            }
          }
        ]
      );
    } else {
      addToFavorites(task);
      Alert.alert("Başarılı", `${task.name} favorilere eklendi.`);
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.productContainer}>
            <Image source={{ uri: task.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{task.name}</Text>
                <Text style={styles.productDescription}>{task.description}</Text>
                <Text style={styles.productPrice}>{task.price}</Text>
                <Text style={[styles.productStock, {color: task.stock > 0 ? 'green' : 'red'}]}>
                {task.stock > 0 ? `Stokta ${task.stock} adet var` : 'Stokta Yok'}
                </Text>
            </View>
            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.favoritesButton} onPress={handleAddToFavorites}>
                    <Text style={styles.buttonText}>Favorilere Ekle</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)} >
                    <Text style={styles.buttonText}>Sepete Ekle</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Modal
            visible={modalVisible}
            animationType='slide'
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Miktar Girin</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={handleQuantityChange}
                keyboardType="numeric"
                placeholder="Miktar"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={addProductToCart}>
                  <Text style={styles.modalButtonText}>Onayla</Text>
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
    </View>
    
  )
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
      },
      productContainer: {
        flex: 10,
        marginHorizontal: 30,
        marginVertical: 10,
        justifyContent: 'center',
      },
      tabbarContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
      },
      productImage: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        marginVertical: 10,
        flex: 2
      },
      productDetails: {
        justifyContent: 'center',
        flex: 2,
      },
      buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
      },
      productName: {
        fontSize: 22,
        fontWeight: 'bold',
      },
      productDescription: {
        fontSize: 16,
        fontWeight: '700',
        color: '#555',
        marginVertical: 5,
      },
      productPrice: {
        fontSize: 22,
        color: '#000',
      },
      productStock: {
        fontSize: 14,
      },
      input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        width: 200,
        height: 40,
        textAlign: 'center',
        marginBottom: 10,
      },
      button: {
        backgroundColor: 'red',
        width: 200,
        height: 40,
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      },
      buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      favoritesButton: {
        backgroundColor: 'blue',
        width: 200,
        height: 40,
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
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
        marginBottom: 10,
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
      },
      modalButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
      },
      modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      tabbar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        
      }
})