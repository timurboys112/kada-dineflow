import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.name === product.name);

      if (exist) {
        return prev.map((i) =>
          i.name === product.name
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (name) => {
    setItems((prev) =>
      prev.map((i) =>
        i.name === name ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };

  const decreaseQty = (name) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.name === name ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const clearOrder = () => setItems([]);

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        increaseQty,
        decreaseQty,
        clearOrder,
        subtotal,
        tax,
        total,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);