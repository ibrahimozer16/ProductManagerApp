import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import React, {useContext, useState} from 'react';
import { ProductContext } from '../context/ProductContext';

export default function PaymentScreen({ navigation }: { navigation: any }) {
  const productContext = useContext(ProductContext);
  if (!productContext) {
      return (
          <View>
              <Text>ProductContext yüklenmedi!</Text>
          </View>
      );
  }
  const { cart, clearCart, updateStock } = productContext;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      const priceString = product.price.replace(/[^\d.-]/g, '');
      const price = parseFloat(priceString);
      const quantity = product.quantity || 1;
      
      if (isNaN(price)) {
        return total;
      }
      
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  const handlePayment = () => {
    setModalVisible(true);
  }

  const verifyCode = () => {
    if(verificationCode === '123456'){
      Alert.alert("Başarılı", "Ödeme Başarıyla Tamamlandı!");
      setModalVisible(false);
      updateStock();
      clearCart();
      navigation.navigate('ProductCatalog');
    }else{
      Alert.alert("Hata", "Geçersiz Doğrulama Kodu");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.paymentInfo}>
        <Text style={styles.title}>Kart Bilgilerinizi Girin</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Kart Numarası" 
          keyboardType="number-pad"
          maxLength={16}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Son Kullanma Tarihi (MM/YY)" 
          keyboardType="number-pad" 
        />
        <TextInput
         style={styles.input} 
         placeholder="CVC" 
         keyboardType="number-pad" 
         maxLength={3}
        />
      </View>

      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>Toplam: {calculateTotalPrice()} TL</Text>
      </View>

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Öde</Text>
      </TouchableOpacity>

      {/* Doğrulama kodu modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>6 Haneli Doğrulama Kodu Girin</Text>
            <TextInput
              style={styles.input}
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
              maxLength={6}
              placeholder="Doğrulama Kodu"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={verifyCode}>
                <Text style={styles.modalButtonText}>Onayla</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  paymentInfo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  totalPriceText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#53D293',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
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
    marginTop: 20,
    width: '100%',
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#53D293',
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})