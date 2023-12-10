import { Fragment, useState } from 'react'
import { ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { Popover, Transition } from '@headlessui/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PrimaryButton from '@/components/common/PrimaryButton';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import InputError from '@/components/common/form/InputError';
import OrderSummary from '@/components/checkout/OrderSummary';
import useStore from '@/store/store';

const steps = [
    { name: 'Cart', href: '#', status: 'complete' },
    { name: 'Shipping Information', href: '#', status: 'current' },
    { name: 'Confirmation', href: '#', status: 'upcoming' },
]

type IShippingFormInput = {
    email: string,
    phone: string,
    company: string,
    address: string,
    address_2: string,
    city: string,
    state: string,
    zip_code: string
}

export default function CheckoutShippingPage() {

    const { register, handleSubmit, control, watch, formState: { errors }, setValue, setError } = useForm<IShippingFormInput>({
        defaultValues: {
            email: '',
            phone: '',
            company: '',
            address: '',
            address_2: '',
            city: '',
            state: '',
            zip_code: ''
        }
    });

    const handleCheckout: SubmitHandler<IShippingFormInput> = async (data) => {
        console.log(data);
        // mutate(data);
    }

    return (
        <div className="bg-white">
            <div className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
            <div className="fixed right-0 top-0 hidden h-full w-1/2 bg-gray-50 lg:block" aria-hidden="true" />

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

            <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
                <OrderSummary />

                <form
                    onSubmit={handleSubmit(handleCheckout)}
                    className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
                    <div className="mx-auto max-w-lg lg:max-w-none">
                        <section>
                            <h2 className="text-lg font-medium text-gray-900">
                                Contact information
                            </h2>

                            <div className="mt-6">
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <div className="mt-1 relative shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">+880</span>
                                    </div>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="focus:border-gray-800 focus:ring-gray-700 block w-full pl-16 sm:pl-14 sm:text-sm border-gray-300"
                                        placeholder="12345678"
                                        {...register("phone", { required: { value: true, message: "The phone number field is required." } })}
                                    />
                                </div>
                                {errors.phone && <InputError className='mt-2' message={errors.phone.message} />}
                            </div>

                            <div className="mt-6">
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1 relative shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        className="focus:border-gray-800 focus:ring-gray-700 block w-full pl-10 sm:text-sm border-gray-300"
                                        placeholder="you@example.com"
                                        {...register("email", { required: { value: true, message: "The email field is required." } })}
                                    />
                                </div>
                                {errors.email && <InputError className='mt-2' message={errors.email.message} />}
                            </div>
                        </section>

                        <section className="mt-10">
                            <h2 className="text-lg font-medium text-gray-900">
                                Shipping address
                            </h2>

                            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                <div className="sm:col-span-3">
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                        Company <span className='ml-2 text-gray-400'>(Optional)</span>
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="company"
                                            className="block w-full border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-700 sm:text-sm"
                                            {...register("company", { required: false })}
                                        />
                                    </div>
                                    {errors.company && <InputError className='mt-2' message={errors.company.message} />}
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="address"
                                            autoComplete="street-address"
                                            className="block w-full border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-700 sm:text-sm"
                                            {...register("address", { required: { value: true, message: "The address field is required." } })}
                                        />
                                    </div>
                                    {errors.address && <InputError className='mt-2' message={errors.address.message} />}
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                                        Apartment, suite, etc. <span className='ml-2 text-gray-400'>(Optional)</span>
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="apartment"
                                            className="block w-full border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-700 sm:text-sm"
                                            {...register("address_2", { required: false })}
                                        />
                                    </div>
                                    {errors.address_2 && <InputError className='mt-2' message={errors.address_2.message} />}
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-700 sm:text-sm"
                                            {...register("city", { required: { value: true, message: "The city field is required." } })}
                                        />
                                    </div>
                                    {errors.city && <InputError className='mt-2' message={errors.city.message} />}
                                </div>

                                <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                        State / Province
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="region"
                                            autoComplete="address-level1"
                                            className="block w-full border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-700 sm:text-sm"
                                            {...register("state", { required: { value: true, message: "The state field is required." } })}
                                        />
                                    </div>
                                    {errors.state && <InputError className='mt-2' message={errors.state.message} />}
                                </div>

                                <div>
                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                        Postal code
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full border-gray-300 shadow-sm focus:border-gray-800 focus:ring-gray-700 sm:text-sm"
                                            {...register("zip_code", { required: { value: true, message: "The postal code field is required." } })}
                                        />
                                    </div>
                                    {errors.zip_code && <InputError className='mt-2' message={errors.zip_code.message} />}
                                </div>
                            </div>
                        </section>

                        {/* Uncomment after adding online payment */}
                        {/* <section aria-labelledby="billing-heading" className="mt-10">
                            <h2 id="billing-heading" className="text-lg font-medium text-gray-900">
                                Billing information
                            </h2>

                            <div className="mt-6 flex items-center">
                                <input
                                    id="same-as-shipping"
                                    name="same-as-shipping"
                                    type="checkbox"
                                    defaultChecked
                                    className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-700"
                                />
                                <div className="ml-2">
                                    <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                                        Same as shipping information
                                    </label>
                                </div>
                            </div>
                        </section> */}

                        <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                            <PrimaryButton
                                type="submit"
                            >
                                Continue
                            </PrimaryButton>
                            {/* <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                                You won&apos;t be charged until the next step.
                            </p> */}
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}