import { CartProduct } from '@/types/Product'
import React, { useEffect } from 'react'
import ProductQtyInput from './ProductQtyInput'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import useStore from '@/store/store'
import { useRouter } from 'next/router'

type CartProductProps = {
    product: CartProduct
}

const Product = ({ product }: CartProductProps) => {
    const removeFromCart = useStore(state => state.removeFromCart);

    return (
        <div key={product.id} className="flex py-6 sm:py-10">
            <div className="flex-shrink-0">
                <img
                    src={product.primary_image.full_url}
                    alt={product.name}
                    className="h-24 w-24 object-cover object-center sm:h-48 sm:w-48"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                {product.name}
                            </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                            {product.stock.color ? <p className="text-gray-500 capitadivze">{product.stock.color.name}</p> : null}
                            {product.stock.size ? (
                                <p className={`${product.stock.color ? `ml-4 pl-4 border-l border-gray-200` : ''} text-gray-500 uppercase`}>{product.stock.size.name}</p>
                            ) : null}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">৳ {product.stock.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <ProductQtyInput product={product} />

                        <div className="absolute right-0 top-0">
                            <button
                                type="button"
                                onClick={() => removeFromCart(product.id, product.stock.id)}
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>

                <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                    {product.cartQuantity <= product.stock.quantity ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                    ) : (
                        <XMarkIcon className="h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
                    )}

                    <span>{product.cartQuantity <= product.stock.quantity ? 'In stock' : `Out of stock`}</span>
                </p>
            </div>
        </div>
    )
}

export default Product