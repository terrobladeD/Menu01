import React from 'react';

function Dish({ dish, onAddToCart }) {
  return (
    <div style={{ display: 'flex', marginBottom: '16px', alignItems: 'center' }}>
      <img src={dish.image} alt={dish.name} style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '16px' }} />
      <div style={{ flexGrow: 1 }}>
        <h4>{dish.name}</h4>
        <p>{dish.description}</p>
        <p>${dish.price.toFixed(2)}</p>
      </div>
      <button onClick={() => onAddToCart(dish)} style={{ backgroundColor: 'green', color: 'white', borderRadius: '50%', width: '40px', height: '40px', fontSize: '24px', textAlign: 'center', lineHeight: '40px', cursor: 'pointer' }}>+</button>
    </div>
  );
}

export default Dish;
