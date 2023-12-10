import useStore from '@/store/store'
import { CartProduct } from '@/types/Product'
import React from 'react'

type ProductQtyInputProps = {
  product: CartProduct
}

const ProductQtyInput = ({ product }: ProductQtyInputProps) => {
  const updateCartProduct = useStore(state => state.updateCartProduct);
  return (
    <select
      value={product.cartQuantity}
      onChange={(e) => updateCartProduct(product.id, product.stock.id, Number(e.target.value))}
      className="max-w-full border border-gray-300 focus:border-black py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:outline-none sm:text-sm outline-none inset-0 rounded-none ring-0 focus:ring-0"
    >
      {
        Array.from(Array((product.stock.quantity <= 20 ? product.stock.quantity : 20) + 1).keys()).slice(1).map(item =>
          <option
            className='text-sm rounded-none'
            key={`cart-product--quantity-${product.stock.id}-${product.slug}-${item}`}
            value={item}>
            {item}
          </option>
        )
      }
    </select>
  )
}

export default ProductQtyInput;