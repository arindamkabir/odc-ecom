import AppLayout from '@/components/layout/AppLayout'
import Filters from '@/components/shop/Filters';
import MobileFilters from '@/components/shop/MobileFilters';
import ProductCard from '@/components/shop/ProductCard';
import SortByMenu from '@/components/shop/SortByMenu';
import { useGetProductList } from '@/hooks/queries/useGetProductList';
import useStore from '@/store/store';
import { FunnelIcon } from '@heroicons/react/24/solid';
import React from 'react'

const ShopPage = () => {
    const openMobileFilters = useStore(state => state.openMobileFilters);
    const productListQueryParams = useStore(state => state.productListQueryParams);
    const { data: productListResponse, isLoading } = useGetProductList(productListQueryParams);

    return (
        <AppLayout>
            <div className="relative z-10 flex items-baseline justify-between pb-6 border-b border-gray-200">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">New Arrivals</h1>

                <div className="flex items-center">
                    <SortByMenu />

                    {/* <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View grid</span>
                <GridIco className="w-5 h-5" aria-hidden="true" />
              </button> */}
                    <button
                        type="button"
                        className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                        onClick={() => openMobileFilters(true)}
                    >
                        <span className="sr-only">Filters</span>
                        <FunnelIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
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
                    {/* <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8"> */}
                    {/* {products.map((product) => (
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
                        ))} */}

                    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8 lg:col-span-3">

                        <>
                            {
                                productListResponse ?
                                    productListResponse.data.map((product) => (
                                        <ProductCard
                                            key={`product-card-${product.slug}`}
                                            product={product}
                                        />
                                    ))
                                    :
                                    <div className='col-span-full'></div>
                            }
                        </>



                    </div>
                    {/* </div> */}


                </div>
            </section>

            <MobileFilters />
        </AppLayout>
    )
}

export default ShopPage;