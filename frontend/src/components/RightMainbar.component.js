import React from 'react';
import Dish from './Dish.component';

function App() {
  const dishes = [
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      description: 'Delicious spaghetti with bacon and parmesan cheese.',
      price: 12.99,
      image: 'https://random.imagecdn.app/50/50',
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      description: 'A healthy salad with grilled chicken, lettuce, tomatoes, and a light dressing.',
      price: 10.99,
      image: 'https://random.imagecdn.app/50/50',
    },
  ];

  const handleAddToCart = (dish) => {
    console.log(`Adding ${dish.name} to cart.`);
  };

  return (
    <div>
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
}

export default App;
