import React, { createContext, useContext } from "react";
import useBasket from "../hooks/useBasket";
import { CartItem } from "../libs/types/search";

interface BasketContextType {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
const basket = useBasket();

return (
    <BasketContext.Provider value={basket}>
        {children}
    </BasketContext.Provider>
    );
};

export const useBasketContext = (): BasketContextType => {
const context = useContext(BasketContext);
if (!context) {
    throw new Error("useBasketContext must be used within a BasketProvider");
    }
   return context;
};
