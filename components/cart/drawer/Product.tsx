import { CartProduct } from '@/types/Product'
import React from 'react'

type CartDrawerProductProps = {
    product: CartProduct
}

const CartDrawerProduct = ({ product }: CartDrawerProductProps) => {
    return (
        <li className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={product.primary_image.full_url}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-sm font-medium text-gray-900">
                        <h3>
                            {product.name}
                        </h3>
                        <p className="ml-4 whitespace-nowrap">৳ {product.stock.price}</p>
                    </div>
                    {
                        (product.stock.color)
                            ?
                            <div className="mt-1 text-sm text-black flex items-center space-x-2">
                                <p>Color : <span className='font-medium capitalize'>{product.stock.color.name}</span></p>
                                <div style={{ height: '16px', width: '16px', backgroundColor: product.stock.color.hex_code, borderRadius: 9999 }}></div>
                            </div>
                            :
                            null
                    }
                    {
                        (product.stock.size)
                            ?
                            <div className="mt-1 text-sm text-black">
                                Size : <span className='font-medium uppercase'>{product.stock.size.name}</span>
                            </div>
                            :
                            null
                    }
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-black">Quantity: {product.quantity}</p>

                    <div className="flex">
                        <button
                            type="button"
                            className="font-medium text-black hover:text-black text-sm hover:underline hover:underline-offset-1 hover:underline-black"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartDrawerProduct