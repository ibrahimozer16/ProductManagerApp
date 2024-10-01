import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductCatalogScreen from './screens/ProductCatalogScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import { ProductProvider } from './context/ProductContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ProductCatalog" component={ProductCatalogScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}



