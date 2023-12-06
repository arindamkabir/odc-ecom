import React from 'react'

const footerNavigation = {
    account: [
        { name: 'Manage Account', href: '#' },
        { name: 'Saved Items', href: '#' },
        { name: 'Orders', href: '#' },
        { name: 'Redeem Gift card', href: '#' },
    ],
    service: [
        { name: 'Shipping & Returns', href: '#' },
        { name: 'Warranty', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Find a store', href: '#' },
        { name: 'Get in touch', href: '#' },
    ],
    company: [
        { name: 'Who we are', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy', href: '#' },
    ],
    connect: [
        { name: 'Instagram', href: '#' },
        { name: 'Pinterest', href: '#' },
        { name: 'Twitter', href: '#' },
    ],
};

const Footer = () => {
    return (
        <footer className="bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 py-20 grid grid-cols-2 gap-8 sm:gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
                        {/* <div>
                            <h3 className="text-sm font-medium text-white">Account</h3>
                            <ul role="list" className="mt-6 space-y-6">
                                {footerNavigation.account.map((item) => (
                                    <li key={item.name} className="text-sm">
                                        <a href={item.href} className="text-gray-200 hover:text-gray-300">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                        <div>
                            <h3 className="text-sm font-medium text-white">Service</h3>
                            <ul role="list" className="mt-6 space-y-6">
                                {footerNavigation.service.map((item) => (
                                    <li key={item.name} className="text-sm">
                                        <a href={item.href} className="text-gray-200 hover:text-gray-300">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
                        <div>
                            <h3 className="text-sm font-medium text-white">Company</h3>
                            <ul role="list" className="mt-6 space-y-6">
                                {footerNavigation.company.map((item) => (
                                    <li key={item.name} className="text-sm">
                                        <a href={item.href} className="text-gray-200 hover:text-gray-300">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-white">Connect</h3>
                            <ul role="list" className="mt-6 space-y-6">
                                {footerNavigation.connect.map((item) => (
                                    <li key={item.name} className="text-sm">
                                        <a href={item.href} className="text-gray-200 hover:text-gray-300">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="py-10 sm:flex sm:items-center sm:justify-end">
                    <p className="mt-6 text-sm text-white text-center sm:mt-0">&copy; {(new Date()).getFullYear()} Black Market BD.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer