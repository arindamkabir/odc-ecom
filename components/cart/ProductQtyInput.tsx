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
      className="min-w-[3rem] rounded-md border border-gray-400 py-1 px-1 text-sm leading-5 font-medium text-gray-500 text-left focus:outline-none sm:text-sm"
    >
      {
        Array.from(Array((product.stock.quantity <= 20 ? product.stock.quantity : 20) + 1).keys()).slice(1).map(item =>
          <option
            className='text-sm'
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