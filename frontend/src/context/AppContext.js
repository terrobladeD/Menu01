import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [dishTypes, setDishTypes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/dish');
        const data = await response.json();

        const formattedDishes = data.map((dish) => ({
          id: dish.id,
          name: dish.name,
          description: dish.description,
          price_ori: parseFloat(dish.price_ori),
          price_cur: parseFloat(dish.price_cur),
          is_sold_out: dish.is_sold_out,
          image: dish.pict_url,
          quantity: 0,
          type:dish.type
        }));

        formattedDishes.sort((a, b) => {
          if (a.type < b.type) {
            return -1;
          }
          if (a.type > b.type) {
            return 1;
          }
          return 0;
        });

        setDishes(formattedDishes);
        const uniqueTypes = [...new Set(formattedDishes.map((dish) => dish.type))];
        setDishTypes(uniqueTypes);
      } catch (error) {
        console.error('Failed to fetch dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  const handleAddToCart = (dish) => {
    setDishes((prevDishes) =>
      prevDishes.map((d) => (d.id === dish.id ? { ...d, quantity: d.quantity + 1 } : d)),
    );
  };

  const handleRemoveFromCart = (dish) => {
    setDishes((prevDishes) =>
      prevDishes.map((d) =>
        d.id === dish.id ? { ...d, quantity: Math.max(d.quantity - 1, 0) } : d,
      ),
    );
  };

  const value = {
    dishes,
    dishTypes,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
