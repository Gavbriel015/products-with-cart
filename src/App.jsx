import { useState, useEffect } from 'react';
import './App.css';
import DessertCard from './components/DessertCard';
import data from './data/data.json';

import EmptyIcon from '/assets/images/illustration-empty-cart.svg';
import TreeIcon from '/assets/images/icon-carbon-neutral.svg'
import DessertCart from './components/DessertCart';
import OrderConfirmed from './components/OrderConfirmed';

function App() {
  const [cart, setCart] = useState([]);
  const [orderModal, setOrderModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = cart.reduce((acc, dessert) => {
      return acc + dessert.price * dessert.quantity;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const handleModal = () => {
    setOrderModal(orderModal => !orderModal);
  }

  const resetAll = () => {
    setCart([])
    handleModal();
    setTotalPrice(0);
  }


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
              <div className='flex justify-between items-center pt-10'>
                <p>Total Price</p>
                <span className='font-bold text-3xl'>${parseFloat(totalPrice).toFixed(2)}</span>
              </div>
              <div className='flex items-center pt-4 gap-4 text-sm justify-center'>
                <img src={TreeIcon} alt="" />
                <p>This is a <span className='font-bold'>carbon-neutral</span> delivery</p>
              </div>
              <button onClick={handleModal} className='bg-[#C23F15] w-full py-3 mt-4 text-white rounded-full' >Confirm Order</button>
              {orderModal && <OrderConfirmed resetAll={resetAll} totalPrice={totalPrice} onClose={handleModal} cart={cart}/>}
            </div>
            
            
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
