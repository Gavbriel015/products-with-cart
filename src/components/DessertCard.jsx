import { useState, useEffect } from 'react';

import IconCart from '/assets/images/icon-add-to-cart.svg';
import IconIncrement from '/assets/images/icon-increment-quantity.svg';
import IconDecrement from '/assets/images/icon-decrement-quantity.svg';

export default function DessertCard({ image, category, name, price, addToCart, incrementQuantity, decrementQuantity, cart }) {
    const [showQuantity, setShowQuantity] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const item = cart.find(item => item.name === name);
        if (item) {
            setCounter(item.quantity);
            setShowQuantity(true);
        } else {
            setCounter(0);
            setShowQuantity(false);
        }
    }, [cart, name]);

    const handleViews = () => {
        if (counter === 0) {
            addToCart();
            setCounter(1);
        } else {
            setShowQuantity(true);
        }
    };

    const handleIncrement = () => {
        setCounter(counter + 1);
        incrementQuantity(name);
    };

    const handleDecrement = () => {
        if (counter === 1) {
            setShowQuantity(false);
            setCounter(0);
            decrementQuantity(name);
        } else {
            setCounter(counter - 1);
            decrementQuantity(name);
        }
    };

    return (
        <div className='flex flex-col items-center max-w-[240px]'>
            <div className='relative'>
                <img className='w-[230px] h-[240px] rounded-xl object-cover' src={image} alt='dessert image' />
                <div
                    className={`${showQuantity ? 'hidden' : 'flex'} border-[#C23F15] border-[1px] bg-white px-4 py-2 w-36 rounded-full justify-center absolute -bottom-5 left-1/2 transform -translate-x-1/2 gap-2 cursor-pointer`}
                    onClick={handleViews}
                >
                    <img src={IconCart} alt='icon cart' />
                    <p className='text-title'>Add to cart</p>
                </div>

                <div
                    className={`${showQuantity ? 'flex' : 'hidden'} bg-[#C23f15] px-4 py-2 w-36 rounded-full justify-center absolute -bottom-5 left-1/2 transform -translate-x-1/2 gap-7 cursor-pointer items-center`}
                >
                    <div className='bg-[#C23f15] p-1' onClick={handleDecrement}>
                        <img className='' src={IconDecrement} alt='icon decrement' />
                    </div>

                    <p className='text-white'>{counter}</p>
                    <div className='bg-[#C23f15] p-1' onClick={handleIncrement}>
                        <img src={IconIncrement} alt='icon increment' />
                    </div>
                </div>
            </div>

            <div className='w-full mt-6 text-left'>
                <p className='text-emptyColor'>{category}</p>
                <p className='text-title font-bold'>{name}</p>
                <p className='text-[#C23F15] font-bold'>${parseFloat(price).toFixed(2)}</p>
            </div>
        </div>
    );
}
