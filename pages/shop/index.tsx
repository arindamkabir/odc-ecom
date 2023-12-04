import AppLayout from '@/components/layout/AppLayout'
import Filters from '@/components/shop/Filters';
import SortByMenu from '@/components/shop/SortByMenu';
import React from 'react'

const products = [
    {
        id: 1,
        name: 'Nomad Pouch',
        href: '#',
        price: '$50',
        availability: 'White and Black',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-07-product-01.jpg',
        imageAlt: 'White fabric pouch with white zipper, black zipper pull, and black elastic loop.',
    },
    {
        id: 2,
        name: 'Zip Tote Basket',
        href: '#',
        price: '$140',
        availability: 'Washed Black',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-07-product-02.jpg',
        imageAlt: 'Front of tote bag with washed black canvas body, black straps, and tan leather handles and accents.',
    },
    // More products...
]

const ShopPage = () => {
    return (
        <AppLayout>
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">New Arrivals</h1>

                <div className="flex items-center">
                    <SortByMenu />

                    {/* <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View grid</span>
                <GridIco className="w-5 h-5" aria-hidden="true" />
              </button> */}
                    {/* <button
                        type="button"
                        className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        <span className="sr-only">Filters</span>
                        <FunnelIcon className="w-5 h-5" aria-hidden="true" />
                    </button> */}
                </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
                <h2 id="products-heading" className="sr-only">
                    Products
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                    {/* Filters */}
                    <Filters />

                    {/* Product grid */}
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
                        {products.map((product) => (
                            <a key={product.id} href={product.href} className="group text-sm">
                                <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 group-hover:opacity-75">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                                <h3 className="mt-4 font-medium text-gray-900">{product.name}</h3>
                                <p className="text-gray-500 italic">{product.availability}</p>
                                <p className="mt-2 font-medium text-gray-900">{product.price}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default ShopPage;