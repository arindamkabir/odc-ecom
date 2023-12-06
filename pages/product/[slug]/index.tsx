import { useEffect, useMemo, useState } from 'react'
import { Disclosure, Popover, RadioGroup, Tab, Transition } from '@headlessui/react'
import AppLayout from '@/components/layout/AppLayout'
import clsx from 'clsx'
import { MinusSmallIcon, PlusSmallIcon, StarIcon } from '@heroicons/react/24/solid'
import PrimaryButton from '@/components/common/PrimaryButton'
import { Product } from '@/types/Product'
import { Color } from '@/types/Color'
import { Size } from '@/types/Size'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import useStore from '@/store/store'

const images = [
    {
        id: 1,
        name: 'Angled view',
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
        alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
        id: 2,
        name: 'Angled view',
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
        alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
        id: 3,
        name: 'Angled view',
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
        alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
        id: 4,
        name: 'Angled view',
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
        alt: 'Angled front view with bag zipped and handles upright.',
    },
    {
        id: 5,
        name: 'Angled view',
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
        alt: 'Angled front view with bag zipped and handles upright.',
    },
    // More images...
]



export const getServerSideProps = (async (context) => {
    const slug = context.params?.slug as string || 'random-slug';
    try {
        const response = await axios.get<{ product: Product, relatedProducts: Product[], sizes: Size[] }>(`/api/products/${slug}`);

        const product = response.data.product;
        const relatedProducts = response.data.relatedProducts;
        const sizes = response.data.sizes;
        const colors: Color[] = [];

        product.stocks.forEach(item => {
            if (item.color) {
                colors.push(item.color);
            }
        })

        return { props: { product, relatedProducts, availableColors: Array.from(new Set(colors)), sizes: sizes } }
    } catch (e) {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }
}) satisfies GetServerSideProps<{
    product: Product,
    relatedProducts: Product[],
    availableColors: Color[],
    sizes: Size[]
}>


export default function ProductPage({ product, relatedProducts, availableColors, sizes }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);

    const cart = useStore(state => state.cart);
    const addToCart = useStore(state => state.addToCart);

    const availableSizes = useMemo(() => {
        if (product.has_colors && product.has_sizes) {
            if (!selectedColor) return [];
            return sizes.map((item) => {
                let exists = product.stocks.some(stock => stock.color_id === selectedColor.id && stock.size_id === item.id && stock.quantity > 0);
                if (exists) return {
                    ...item,
                    inStock: exists
                }
                else {
                    return {
                        ...item,
                        inStock: false
                    }
                }
            })
        }
        else if (!product.has_colors && product.has_sizes) {
            return sizes.map((item) => {
                let exists = product.stocks.some(stock => stock.size_id === item.id && stock.quantity > 0);
                if (exists) return {
                    ...item,
                    inStock: exists
                }
                else {
                    return {
                        ...item,
                        inStock: false
                    }
                }
            })
        }
        else return null;
    }, [product.has_colors, product.has_sizes, product.stocks, selectedColor, sizes]);

    const selectedStock = useMemo(() => {
        if (product.has_colors && product.has_sizes && selectedColor && selectedSize) {
            const stock = product.stocks.find(item => item.color_id === selectedColor.id && item.size_id === selectedSize.id);
            if (!stock) return undefined;
            const cartItem = cart.find(item => item.stock.id === stock.id);
            if (!cartItem) return {
                ...stock,
                cartQuantity: 0
            };
            return {
                ...stock,
                cartQuantity: cartItem.quantity
            }
        }
        if (product.has_colors && !product.has_sizes && selectedColor) {
            const stock = product.stocks.find(item => item.color_id === selectedColor.id);
            if (!stock) return undefined;
            const cartItem = cart.find(item => item.stock.id === stock.id);
            if (!cartItem) return {
                ...stock,
                cartQuantity: 0
            };
            return {
                ...stock,
                cartQuantity: cartItem.quantity
            }
        }
        if (!product.has_colors && product.has_sizes && selectedSize) {
            const stock = product.stocks.find(item => item.size_id === selectedSize.id);
            if (!stock) return undefined;
            const cartItem = cart.find(item => item.stock.id === stock.id);
            if (!cartItem) return {
                ...stock,
                cartQuantity: 0
            };
            return {
                ...stock,
                cartQuantity: cartItem.quantity
            }
        }
        if (!product.has_colors && !product.has_colors) {
            const stock = product.stocks.at(0);
            if (!stock) return undefined;
            const cartItem = cart.find(item => item.stock.id === stock.id);
            if (!cartItem) return {
                ...stock,
                cartQuantity: 0
            };
            return {
                ...stock,
                cartQuantity: cartItem.quantity
            }
        }
        else return undefined;
    }, [cart, product.has_colors, product.has_sizes, product.stocks, selectedColor, selectedSize]);
    // console.log(product.stocks);
    console.log(selectedStock)
    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto lg:max-w-none">
                {/* Product */}
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Image gallery */}
                    <Tab.Group as="div" className="flex flex-col-reverse">
                        {/* Image selector */}
                        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                            <Tab.List className="grid grid-cols-4 gap-6">
                                {images.map((image) => (
                                    <Tab
                                        key={image.id}
                                        className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-black cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span className="sr-only">{image.name}</span>
                                                <span className="absolute inset-0 rounded-md overflow-hidden">
                                                    <img src={image.src} alt="" className="w-full h-full object-center object-cover" />
                                                </span>
                                                <span
                                                    className={clsx(
                                                        selected ? 'ring-black' : 'ring-transparent',
                                                        'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>
                        </div>

                        <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                            {images.map((image) => (
                                <Tab.Panel key={image.id}>
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-center object-cover sm:rounded-lg"
                                    />
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-2xl font-semibold tracking-tight text-black">{product.name}</h1>

                        <div className="mt-3">
                            <p className="text-2xl text-black">৳ {selectedStock ? selectedStock.price : product.price}</p>
                        </div>

                        <div className="mt-6">
                            <div
                                className="text-sm leading-6 text-gray-700 space-y-6"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>

                        <div className="mt-6">
                            {/* Colors */}
                            {
                                product.has_colors && availableColors && availableColors.length > 0 ?
                                    <div>
                                        <h2 className="text-sm font-medium text-black">Colors</h2>

                                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                            <div className="flex items-center space-x-3">
                                                {availableColors.map((color) => (
                                                    <RadioGroup.Option
                                                        key={color.name}
                                                        value={color}
                                                        className={({ active, checked }) =>
                                                            clsx(
                                                                // color.hex_code,
                                                                active && checked ? 'ring ring-black ring-offset-1' : '',
                                                                !active && checked ? 'ring-2 ring-black' : '',
                                                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                            )
                                                        }
                                                    >
                                                        <RadioGroup.Label as="p" className="sr-only">
                                                            {color.name}
                                                        </RadioGroup.Label>
                                                        <span
                                                            aria-hidden="true"
                                                            className={clsx('h-8 w-8 border border-black border-opacity-10 rounded-full')}
                                                            style={{ backgroundColor: color.hex_code }}
                                                        />
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    : null
                            }

                            {/* Sizes */}
                            {
                                product.has_sizes && availableSizes && availableSizes.length > 0 ?
                                    <div className="mt-8">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-sm font-medium text-black">Sizes</h2>
                                            <a href="#" className="text-sm font-medium text-black hover:text-black">
                                                See sizing chart
                                            </a>
                                        </div>

                                        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                                {availableSizes.map((size) => (
                                                    <RadioGroup.Option
                                                        key={size.name}
                                                        value={size}
                                                        className={({ active, checked }) =>
                                                            clsx(
                                                                size.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                                                                checked
                                                                    ? 'bg-black border-transparent text-white hover:bg-black'
                                                                    : 'bg-white border-gray-200 text-black hover:bg-gray-50',
                                                                'border py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                                                            )
                                                        }
                                                        disabled={!size.inStock}
                                                    >
                                                        <RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    : null
                            }


                            <div className="mt-10 flex sm:flex-col1">
                                <PrimaryButton
                                    onClick={() => {
                                        if (!selectedStock) return;
                                        const { cartQuantity, ...stock } = selectedStock;
                                        addToCart(product, stock);
                                    }}
                                    disabled={(!Boolean(selectedStock) || (selectedStock?.cartQuantity ?? 0) >= (selectedStock?.quantity ?? 0))}
                                >
                                    {!selectedStock ? 'Select an option' : (selectedStock.cartQuantity < selectedStock.quantity ? 'Add to cart' : 'Out of stock')}
                                </PrimaryButton>

                                {/* <button
                                    type="button"
                                    className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                >
                                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                    <span className="sr-only">Add to favorites</span>
                                </button> */}
                            </div>
                        </div>

                        <section className="mt-12">
                            {/* <div className="border-t divide-y divide-gray-200">
                                {product.details.map((detail) => (
                                    <Disclosure as="div" key={detail.name}>
                                        {({ open }) => (
                                            <>
                                                <h3>
                                                    <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                        <span
                                                            className={clsx(
                                                                open ? 'text-black' : 'text-black',
                                                                'text-sm font-medium'
                                                            )}
                                                        >
                                                            {detail.name}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmallIcon
                                                                    className="block h-6 w-6 text-black group-hover:text-black"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusSmallIcon
                                                                    className="block h-6 w-6 text-black group-hover:text-black"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                                                    <ul role="list">
                                                        {detail.items.map((item) => (
                                                            <li key={item}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </div> */}
                        </section>
                    </div>
                </div>

                <section className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0">
                    <h2 id="related-heading" className="text-xl font-bold text-black">
                        Customers also bought
                    </h2>

                    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {relatedProducts.map((product) => (
                            <div key={product.id}>
                                <div className="relative">
                                    <div className="relative w-full h-72 rounded-lg overflow-hidden">
                                        <img
                                            src={product.primary_image.full_url}
                                            alt={product.name}
                                            className="w-full h-full object-center object-cover"
                                        />
                                    </div>
                                    <div className="relative mt-4">
                                        <h3 className="text-sm font-medium text-black">{product.name}</h3>
                                        {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                    </div>
                                    <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                        />
                                        <p className="relative text-lg font-semibold text-white">{product.price}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-black hover:bg-gray-200 disabled:bg-gray-600 uppercase"
                                        disabled={(!selectedStock || selectedStock.cartQuantity >= selectedStock.quantity)}
                                    >
                                        {!selectedStock ? 'Select an option' : (selectedStock.cartQuantity > selectedStock.quantity ? 'Add to cart' : 'Out of stock')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AppLayout>
    )
}
