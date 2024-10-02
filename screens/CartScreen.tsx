import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext';

export default function CartScreen({navigation}:{navigation:any}) {
  const productContext = useContext(ProductContext);

  // Context'in undefined olup olmadığını kontrol et
  if (!productContext) {
      return (
          <View>
              <Text>ProductContext yüklenmedi!</Text>
          </View>
      );
  }

  const { cart, removeFromCart, updateCartQuantity } = productContext;

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      const priceString = product.price.replace(/[^\d.-]/g, '');
      const price = parseFloat(priceString);
      const quantity = product.quantity || 1;
      
      if(isNaN(price)){
        return total;
      }
      
      return total + (price * quantity);
    }, 0).toFixed(2);
  }

  const increaseQuantity = (itemId: string) => {
    const item = cart.find(product => product.id === itemId);
    if(item){
      updateCartQuantity(itemId, item.quantity + 1);
    }
  }

  const decreaseQuantity = (itemId: string) => {
    const item = cart.find(product => product.id === itemId);
    if(item && item.quantity > 1){
      updateCartQuantity(itemId, item.quantity - 1);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Sepetim</Text>
      </View>
      <View style={styles.products}>
        {cart.length === 0 ? (
          <Text>Sepete eklenmiş ürün bulunmuyor.</Text>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <View style={styles.list}>
                <TouchableOpacity style={styles.productInfo} onPress={() => {navigation.navigate('ProductDetail', {task:item})}}>
                  <Image source={{uri: item.image}} style={styles.image}/>
                  <View>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>Fiyat: {item.price}</Text>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                      <Text style={[styles.text,{ color: 'red'}]}>Sepetten Çıkar</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                <View style={styles.incdec}>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                    <Text style={styles.text}>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                    <Text style={styles.text}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
      <View style={styles.totalPriceShow}>
        <Text style={styles.totalCart}>Sepet Toplam:</Text>
        <Text style={styles.totalCart}>{calculateTotalPrice()}</Text>
      </View>
      <View style={styles.payment}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Payment')}>
          <Text>Ödemeye Geç</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    flex: 0.5,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  products: {
    flex: 6,
  },
  list: { 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productInfo: {
    flexDirection: 'row',
    width: '90%',
  },
  incdec: {
    flexDirection: 'column',
    borderWidth: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 30,
    borderRadius: 10,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 2,
  },
  totalPriceShow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  payment: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalCart: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#53D293'
  },
})