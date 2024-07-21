export default function ThumbnailCard({ thumbnail, name, quantity, price }) {

    const totalPricePerProduct = price * quantity;

    return (
        <div className="flex gap-32 items-center mt-4">
            <div className="flex w-full gap-4">
                <img className='w-12 h-12' src={thumbnail} alt="" />
                <div className="flex flex-col">
                    <p className="font-semibold text-title text-left text-[14px]">{name}</p>
                    <div className="flex gap-3 items-center">
                        <p className='text-[#C23f15] font-bold'>{quantity}x</p>
                        <p className='text-[#CAAFA7] font-semibold'>@ ${parseFloat(price).toFixed(2)}</p>                    </div>
                </div>
            </div>
            <div className="flex">
                <p className="font-semibold text-title text-lg">${parseFloat(totalPricePerProduct).toFixed(2)}</p>
            </div>

        </div>
    )
}