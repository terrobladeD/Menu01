import React, { useState, useEffect } from 'react';
import DishItem from './DishItem.component';

function RightMainbar() {
  const [dishes, setDishes] = useState([]);

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
          image: 'https://random.imagecdn.app/200/200',
        }));

        setDishes(formattedDishes);
      } catch (error) {
        console.error('Failed to fetch dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  const handleAddToCart = (dish) => {
    console.log(`Adding ${dish.name} to cart.`);
  };

  return (
    <div>
      {dishes.map((dish) => (
        <DishItem key={dish.id} dish={dish} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
}

export default RightMainbar;
