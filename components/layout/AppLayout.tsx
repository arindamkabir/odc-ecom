import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./navigation/Header";
import Footer from "./navigation/Footer";
import CartDrawer from "../cart/drawer/CartDrawer";

type AppLayoutProps = {
    header?: string;
    children: React.ReactNode;
}

const AppLayout = ({ header, children }: AppLayoutProps) => {
    return (
        <div className="flex flex-col justify-between min-h-screen bg-white">
            <Header />
            <main className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                {children}
            </main>
            <Footer />

            <CartDrawer />
        </div>
    )
}

export default AppLayout;