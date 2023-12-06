import { Product } from '@/types/Product'
import Link from 'next/link'
import React from 'react'

type ProductCardProps = {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link href={`/product/${product.slug}`} className="group relative bg-white border border-gray-200 flex flex-col overflow-hidden">
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                <img
                    src={product.primary_image.full_url}
                    alt={product.name}
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                />
            </div>
            <div className="flex-1 p-4 space-y-2 flex flex-col">
                <h3 className="text-sm font-medium text-gray-900">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                </h3>
                <div className="flex-1 flex flex-col justify-end w-full">
                    <p className="text-sm italic text-gray-500">{product.has_colors && product.colors_count ? `${product.colors_count} colors` : ''} {(product.has_colors && product.colors_count && product.has_sizes && product.sizes_count) ? '&' : ''} {product.has_sizes && product.sizes_count ? `${product.sizes_count} sizes` : ''}</p>
                    <p className="text-base font-medium text-gray-900">৳ {product.price}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;