import ThumbnailCard from './ThumbnailCard'
import OrderIcon from '/assets/images/icon-order-confirmed.svg'

export default function OrderConfirmed({ onClose, cart, totalPrice, resetAll}) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 ">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-[500px] w-full flex flex-col justify-center items-start gap-4">
                <img src={OrderIcon} alt="Order confirmed icon" />
                <h1 className='font-bold text-4xl'>Order Confirmed</h1>
                <p className='text-gray-400'>We hope you enjoy your food!</p>
                <div className='px-6'>
                    {cart.map(dessert => (
                        <div key={dessert.name}>
                            <ThumbnailCard thumbnail={dessert.image.thumbnail} name={dessert.name} quantity={dessert.quantity} price={dessert.price} />
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center pt-10 w-full px-6'>
                    <p>Total Price</p>
                    <span className='font-bold text-3xl'>${parseFloat(totalPrice).toFixed(2)}</span>
                </div>
                <button onClick={resetAll} className='bg-[#C23F15] w-full py-3 mt-4 text-white rounded-full' >Start New Order</button>
            </div>
        </div>
    )
}
