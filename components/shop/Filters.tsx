import useStore from '@/store/store'
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/solid'

const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]



const Filters = () => {
    const sizes = useStore(state => state.sizes);
    const colors = useStore(state => state.colors);
    const productListQueryParams = useStore(state => state.productListQueryParams);
    const setProductListQueryParams = useStore(state => state.setProductListQueryParams);

    return (
        <div className="hidden lg:block md:col-span-3 lg:col-span-2">
            <Disclosure as="div" className="border-b border-gray-200 py-6">
                {({ open }) => (
                    <>
                        <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Sizes</span>
                                <span className="ml-6 flex items-center">
                                    {open ? (
                                        <MinusSmallIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </span>
                            </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                                {sizes.map((option, optionIdx) => (
                                    <div key={option.slug} className="flex items-center">
                                        <input
                                            id={`filter-size-${option.slug}`}
                                            name={`size[]`}
                                            defaultValue={option.id}
                                            type="checkbox"
                                            defaultChecked={productListQueryParams.sizes.includes(option.id)}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    setProductListQueryParams({
                                                        ...productListQueryParams,
                                                        sizes: [...productListQueryParams.sizes, option.id]
                                                    })
                                                } else {
                                                    setProductListQueryParams({
                                                        ...productListQueryParams,
                                                        sizes: productListQueryParams.sizes.filter(item => item !== option.id)
                                                    })
                                                }
                                            }}
                                            className="h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                                        />
                                        <label
                                            htmlFor={`filter-size-${option.slug}`}
                                            className="ml-3 text-sm text-gray-600 uppercase"
                                        >
                                            {option.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <Disclosure as="div" className="border-b border-gray-200 py-6">
                {({ open }) => (
                    <>
                        <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Colors</span>
                                <span className="ml-6 flex items-center">
                                    {open ? (
                                        <MinusSmallIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <PlusSmallIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </span>
                            </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                                {colors.map((option, optionIdx) => (
                                    <div key={option.slug} className="flex items-center">
                                        <input
                                            id={`filter-color-${option.slug}`}
                                            name={`color[]`}
                                            defaultValue={option.id}
                                            type="checkbox"
                                            defaultChecked={productListQueryParams.colors.includes(option.id)}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    setProductListQueryParams({
                                                        ...productListQueryParams,
                                                        colors: [...productListQueryParams.colors, option.id]
                                                    })
                                                } else {
                                                    setProductListQueryParams({
                                                        ...productListQueryParams,
                                                        colors: productListQueryParams.colors.filter(item => item !== option.id)
                                                    })
                                                }
                                            }}
                                            className="h-4 w-4 border-gray-300 rounded text-gray-600 focus:ring-gray-500"
                                        />
                                        <label
                                            htmlFor={`filter-color-${option.slug}`}
                                            className="ml-3 text-sm text-gray-600 capitalize"
                                        >
                                            {option.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}

export default Filters