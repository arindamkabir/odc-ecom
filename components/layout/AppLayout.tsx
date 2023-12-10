import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./navigation/Header";
import Footer from "./navigation/Footer";
import CartDrawer from "../cart/drawer/CartDrawer";
import { useGetFilters } from "@/hooks/queries/useGetFilters";
import PageLoader from "../common/PageLoader";
import { Transition } from "@headlessui/react";
import useStore from "@/store/store";

type AppLayoutProps = {
    header?: string;
    children: React.ReactNode;
}

const AppLayout = ({ header, children }: AppLayoutProps) => {
    const setFilters = useStore(state => state.setFilters);
    const { data: filters, isPending } = useGetFilters();

    useEffect(() => {
        if (filters)
            setFilters(filters);
    }, [filters, setFilters]);

    return (
        <>
            <PageLoader loading={isPending} />

            <Transition
                appear={true}
                show={!isPending}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex flex-col justify-between min-h-screen bg-white">
                    <Header />
                    <main className="px-4 sm:px-8 lg:px-16 pt-24">
                        {children}
                    </main>
                    <Footer />

                    <CartDrawer />
                </div>
            </Transition>
        </>
    )
}

export default AppLayout;