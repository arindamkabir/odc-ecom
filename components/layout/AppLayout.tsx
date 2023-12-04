import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./navigation/Header";
import Footer from "./navigation/Footer";

type AppLayoutProps = {
    header?: string;
    children: React.ReactNode;
}

const AppLayout = ({ header, children }: AppLayoutProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col justify-between min-h-screen bg-white">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default AppLayout;