import { useState } from 'react';
import './App.css';
import DessertCard from './components/DessertCard';
import data from './data/data.json';

import EmptyIcon from '/assets/images/illustration-empty-cart.svg';
import DessertCart from './components/DessertCart';

function App() {
  const [cart, setCart] = useState([]);


  const addToCart = (dessert) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.name === dessert.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === dessert.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...dessert, quantity: 1 }];
      }
    });
  };

  const incrementQuantity = (name) => {
    setCart((prevCart) => 
      prevCart.map(item =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (name) => {
    setCart((prevCart) => 
      prevCart
        .map(item =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleDelete = (name) => {
    setCart((prevCart) => prevCart.filter(item => item.name !== name));
  };

  return (
    <div className='max-w-[1600px] m-auto'>
      <h1 className='text-title font-bold text-4xl text-left pl-2'>Desserts</h1>
      <div className='flex flex-col lg:flex-row '>
        <div className='basis-3/4 pt-12 grid grid-cols-3 gap-10'>
          {data.map(dessert => (
            <div key={dessert.name}>
              <DessertCard
                name={dessert.name}
                image={dessert.image.desktop}
                category={dessert.category}
                price={dessert.price}
                addToCart={() => addToCart(dessert)}
                incrementQuantity={() => incrementQuantity(dessert.name)}
                decrementQuantity={() => decrementQuantity(dessert.name)}
                cart={cart}
              />
            </div>
          ))}
        </div>
        <div className='basis-1/4 ml-14'>
          <h2 className='text-[#C23F15] font-bold text-2xl text-left pb-10'>
            Your Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
          </h2>
          {cart.length <= 0 ? (
            <div className='flex flex-col items-center'>
              <img src={EmptyIcon} alt='' />
              <p className='font-bold text-emptyColor'>Your added items will appear here</p>
            </div>
          ) : (
            <div>
              {cart.map(item => (
                <div key={item.name}>
                  <DessertCart onDelete={() => handleDelete(item.name)} price={item.price} quantity={item.quantity} name={item.name}/>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
