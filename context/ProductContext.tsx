import React, {createContext, useState, ReactNode} from "react";

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    stock: number;
    quantity: number;
}

interface ProductContextProps {
    cart: Product[];
    favorites: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
}

export const ProductContext = createContext<ProductContextProps|undefined>(undefined);

export const ProductProvider = ({children}:{children:ReactNode}) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [favorites, setFavorites] = useState<Product[]>([]);

    // Sepete ekleme fonksiyonu
    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Sepetten çıkarma fonksiyonu
    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

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

    return (
        <ProductContext.Provider value= {{cart, favorites, addToCart, removeFromCart, addToFavorites, removeFromFavorites, updateCartQuantity}}>
            {children}
        </ProductContext.Provider>
    )
}