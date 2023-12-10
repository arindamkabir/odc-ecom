import { useEffect, useMemo, useState } from 'react'
import { QuestionMarkCircleIcon, XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid'
import { CheckCircleIcon, ChevronRightIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import PrimaryButton from '@/components/common/PrimaryButton'
import useStore from '@/store/store'
import { useRouter } from 'next/router'
import Product from '@/components/cart/Product'
import { DELIVERY_LOCATIONS } from '@/config/checkout'

const steps = [
    { name: 'Cart', href: '#', status: 'current' },
    { name: 'Shipping Information', href: '#', status: 'upcoming' },
    { name: 'Confirmation', href: '#', status: 'upcoming' },
]

const CartPage = () => {
    const router = useRouter();
    const cart = useStore(state => state.cart);
    const selectedCheckoutDeliveryLocation = useStore(state => state.selectedCheckoutDeliveryLocation);
    const setSelectedCheckoutDeliveryLocation = useStore(state => state.setSelectedCheckoutDeliveryLocation);

    const subtotal = useMemo(() => cart.reduce((acc, currentValue) => acc + (Number(currentValue.stock.price) * currentValue.cartQuantity), 0), [cart]);

    useEffect(() => {
        if (cart.length === 0) {
            router.push('/');
        }
    }, [cart.length, router]);

    const handleShipping = () => {
        router.push('/checkout/shipping')
    }

    return (
        <div className="bg-white">
            <header className="relative bg-black text-sm font-medium text-gray-700">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="relative flex justify-end items-center sm:justify-center  h-[5rem]">
                        <div className="absolute left-0">
                            <img src="/logo-white.png" className='h-[4rem] w-auto' alt="keenbo logo" />
                        </div>
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
                        {/* <p className="sm:hidden">Step 2 of 4</p> */}
                    </div>
                </div>
            </header>

            <main className="relative mx-auto max-w-7xl lg:px-8">
                <h2 id="summary-heading" className="my-12 text-lg font-medium text-gray-900 mb-4">
                    Review Your Order
                </h2>
                <form className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section className="lg:col-span-7">
                        {cart.length > 0 ?
                            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">

                                {cart.map((product) => (
                                    <Product key={`checkout-product-${product.slug}`} product={product} />
                                ))}
                            </ul>
                            :
                            <div className='pt-20 flex flex-col justify-center items-center space-y-8 font-medium text-gray-900'>
                                <span>
                                    <ShoppingBagIcon className='h-16 w-16' />
                                </span>
                                <div className='text-xl lg:text-2xl font-semibold'>
                                    Your cart is empty.
                                </div>
                            </div>
                        }
                    </section>

                    {/* Order summary */}
                    <section
                        className="mt-16 lg:border lg:border-gray-200 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                    >

                        <div className="pb-10">
                            <RadioGroup value={selectedCheckoutDeliveryLocation} onChange={(val) => setSelectedCheckoutDeliveryLocation(val)}>
                                <RadioGroup.Label className="text-lg font-medium text-gray-900">Delivery method</RadioGroup.Label>

                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    {DELIVERY_LOCATIONS.map((deliveryMethod) => (
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
                                <dd className="text-sm font-medium text-gray-900">৳ {subtotal}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping </span>
                                    {/* <button
                                        className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                    >
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </button> */}
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">৳ {selectedCheckoutDeliveryLocation.price}</dd>
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
                                <dt className="text-base font-medium text-gray-900">Total</dt>
                                <dd className="text-base font-medium text-gray-900">৳ {subtotal + selectedCheckoutDeliveryLocation.price}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <PrimaryButton className='!max-w-full !w-full !block' onClick={handleShipping}>
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