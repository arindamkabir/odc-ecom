import { useState } from 'react'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid'
import AppLayout from '@/components/layout/AppLayout'
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import PrimaryButton from '@/components/common/PrimaryButton'

const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        price: '৳32.00',
        color: 'Sienna',
        inStock: true,
        size: 'Large',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in sienna.",
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        price: '৳32.00',
        color: 'Black',
        inStock: false,
        leadTime: '3–4 weeks',
        size: 'Large',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
    },
    {
        id: 3,
        name: 'Nomad Tumbler',
        href: '#',
        price: '৳35.00',
        color: 'White',
        inStock: true,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
        imageAlt: 'Insulated bottle with white base and black snap lid.',
    },
]
const relatedProducts = [
    {
        id: 1,
        name: 'Billfold Wallet',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
        imageAlt: 'Front of Billfold Wallet in natural leather.',
        price: '৳118',
        color: 'Natural',
    },
    // More products...
]

const deliveryLocations = [
    { id: 1, title: 'Dhaka', turnaround: '2-4 business days', price: '70' },
    { id: 2, title: 'Outside Dhaka', turnaround: '4-7 business days', price: '200' },
]

const steps = [
    { name: 'Cart', href: '#', status: 'complete' },
    { name: 'Billing Information', href: '#', status: 'current' },
    { name: 'Confirmation', href: '#', status: 'upcoming' },
]

const CartPage = () => {
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryLocations[0]);

    return (
        <div className="bg-white">
            <header className="relative bg-black text-sm font-medium text-gray-700">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="relative flex justify-end sm:justify-center">
                        <a href="#" className="absolute left-0 top-1/2 -mt-4">
                            <img src="/logo-white.png" className='h-[5.75rem] w-auto' alt="" />
                        </a>
                        <nav aria-label="Progress" className="hidden sm:block">
                            <ol role="list" className="flex space-x-4">
                                {steps.map((step, stepIdx) => (
                                    <li key={step.name} className="flex items-center">
                                        {step.status === 'current' ? (
                                            <a href={step.href} aria-current="page" className="text-white">
                                                {step.name}
                                            </a>
                                        ) : (
                                            <a href={step.href} className='text-gray-400'>{step.name}</a>
                                        )}

                                        {stepIdx !== steps.length - 1 ? (
                                            <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" />
                                        ) : null}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                        <p className="sm:hidden">Step 2 of 4</p>
                    </div>
                </div>
            </header>

            <main className="relative mx-auto max-w-7xl lg:px-8">
                <h2 id="summary-heading" className="my-12 text-lg font-medium text-gray-900 mb-4">
                    Review Your Order
                </h2>
                <form className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {products.map((product, productIdx) => (
                                <li key={product.id} className="flex py-6 sm:py-10">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="h-24 w-24 object-cover object-center sm:h-48 sm:w-48"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                                                            {product.name}
                                                        </a>
                                                    </h3>
                                                </div>
                                                <div className="mt-1 flex text-sm">
                                                    <p className="text-gray-500">{product.color}</p>
                                                    {product.size ? (
                                                        <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                                                    ) : null}
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <label htmlFor={`quantity-৳{productIdx}`} className="sr-only">
                                                    Quantity, {product.name}
                                                </label>
                                                <select
                                                    id={`quantity-৳{productIdx}`}
                                                    name={`quantity-৳{productIdx}`}
                                                    className="max-w-full border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:outline-none sm:text-sm outline-none rounded-none"
                                                >
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                    <option value={6}>6</option>
                                                    <option value={7}>7</option>
                                                    <option value={8}>8</option>
                                                </select>

                                                <div className="absolute right-0 top-0">
                                                    <button type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                        <span className="sr-only">Remove</span>
                                                        <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                            {product.inStock ? (
                                                <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                                            ) : (
                                                <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                                            )}

                                            <span>{product.inStock ? 'In stock' : `Ships in ৳{product.leadTime}`}</span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 lg:border lg:border-gray-200 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >

                        <div className="pb-10">
                            <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
                                <RadioGroup.Label className="text-lg font-medium text-gray-900">Delivery method</RadioGroup.Label>

                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    {deliveryLocations.map((deliveryMethod) => (
                                        <RadioGroup.Option
                                            key={deliveryMethod.id}
                                            value={deliveryMethod}
                                            className={({ checked, active }) =>
                                                clsx(
                                                    checked ? 'border-transparent' : 'border-gray-300',
                                                    active ? 'ring-2 ring-black' : '',
                                                    'relative bg-white border shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                                )
                                            }
                                        >
                                            {({ checked, active }) => (
                                                <>
                                                    <div className="flex-1 flex">
                                                        <div className="flex flex-col">
                                                            <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                                                {deliveryMethod.title}
                                                            </RadioGroup.Label>
                                                            <RadioGroup.Description
                                                                as="span"
                                                                className="mt-1 flex items-center text-sm text-gray-500"
                                                            >
                                                                {deliveryMethod.turnaround}
                                                            </RadioGroup.Description>
                                                            <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                                                                ৳ {deliveryMethod.price}
                                                            </RadioGroup.Description>
                                                        </div>
                                                    </div>
                                                    {checked ? (
                                                        <CheckCircleIcon className="h-5 w-5 text-black" aria-hidden="true" />
                                                    ) : null}
                                                    <div
                                                        className={clsx(
                                                            active ? 'border' : 'border-2',
                                                            checked ? 'border-black' : 'border-transparent',
                                                            'absolute -inset-px pointer-events-none'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>

                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">৳99.00</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping </span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">৳{selectedDeliveryMethod.price}</dd>
                            </div>
                            {/* <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how tax is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">৳8.32</dd>
                            </div> */}
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">৳112.32</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <PrimaryButton className='!max-w-full !w-full !block'>
                                Checkout
                            </PrimaryButton>
                        </div>
                    </section>
                </form>
            </main>
        </div>
    )
}

export default CartPage;
