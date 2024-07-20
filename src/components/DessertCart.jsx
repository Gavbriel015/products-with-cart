import IconDelete from '../../public/assets/images/icon-remove-item.svg'

export default function DessertCart({ name, quantity, price, onDelete }) {

    let total = price * quantity

    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
                <p className='font-semibold text-title pb-2'>{name}</p>
                <div className='flex gap-3'>
                    <p className='text-[#C23f15] font-bold'>{quantity}x</p>
                    <p className='text-[#CAAFA7] font-semibold'>@ ${parseFloat(price).toFixed(2)}</p>
                    <p className='text-emptyColor font-semibold'>${parseFloat(total).toFixed(2)}</p>

                </div>
            </div>
            <div onClick={onDelete} className='cursor-pointer w-6 h-6 rounded-full border-[#CAAFA7] border-2 flex items-center justify-center'>
                <img className='w-3 h-3' src={IconDelete} alt="" />
            </div>

        </div>
    )
}