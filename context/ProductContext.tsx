import React, {createContext, useState, ReactNode, useEffect} from "react";

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    stock: number;
    quantity: number;
    description: string;
}

interface ProductContextProps {
    products: Product[];
    cart: Product[];
    favorites: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    updateStock: () => void;
}

export const ProductContext = createContext<ProductContextProps|undefined>(undefined);

export const ProductProvider = ({children}:{children:ReactNode}) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    // Sahte ürün verileri
    useEffect(() => {
        const initialProducts: Product[] = [
        {
            id: '1',
            name: 'AKILLI TELEFON',
            price: '799.99',
            image: 'https://dummyimage.com/200x200/000/fff&text=Smartphone',
            stock: 5,
            quantity: 0,
            description: 'Son çıkan güçlü bir akıllı telefon.',
        },
        {
            id: '2',
            name: 'LAPTOP',
            price: '1299.99',
            image: 'https://dummyimage.com/200x200/000/fff&text=Laptop',
            stock: 3,
            quantity: 0,
            description: 'Yüksek performans sağlayan iş bilgisayarı.',
        },
        {
            id: '3',
            name: 'KULAKLIK',
            price: '199.99',
            image: 'https://dummyimage.com/200x200/000/fff&text=Headphones',
            stock: 10,
            quantity: 0,
            description: 'Gürültü engelleyen son model kulaklık.',
        },
        {
            id: '4',
            name: 'AKILLI SAAT',
            price: '249.99',
            image: 'https://dummyimage.com/200x200/000/fff&text=Smartwatch',
            stock: 8,
            quantity: 0,
            description: 'Her telefon ile uyumlu olan akıllı saat.',
        },
        ];
        setProducts(initialProducts);
    }, []);

    // Sepete ekleme fonksiyonu
    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Sepetten çıkarma fonksiyonu
    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };


    // Sepeti temizleme fonksiyonu
    const clearCart = () => {
        setCart([]);
    }

    // Favorilere ekleme fonksiyonu
    const addToFavorites = (product: Product) => {
        setFavorites((prevFavorites) => [...prevFavorites, product]);
    };

    // Favorilerden çıkarma fonksiyonu
    const removeFromFavorites = (productId: string) => {
        setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== productId));
    };

    // Ürün miktarını güncelleme fonksiyonu
    const updateCartQuantity = (productId: string, quantity: number) => {
        setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } : item
        ));
    };

    // Stok güncelleme fonksiyonu
    const updateStock = () => {
        console.log('Güncellenen sepet:', cart);
        console.log('Güncellenen ürünler:', products);
        setProducts((prevProducts) => 
            prevProducts.map((product) => {
                const cartItem = cart.find((item) => item.id === product.id);
                if(cartItem){
                    console.log(`Stok güncelleniyor: ${product.name}, eski stok: ${product.stock}, yeni stok: ${product.stock - cartItem.quantity}`)
                    return {...product, stock: product.stock-cartItem.quantity};
                }
                return product;
            })
        )
    }

    return (
        <ProductContext.Provider value= {{products, cart, favorites, addToCart, removeFromCart, clearCart, addToFavorites, removeFromFavorites, updateCartQuantity, updateStock}}>
            {children}
        </ProductContext.Provider>
    )
}