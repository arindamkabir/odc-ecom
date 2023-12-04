import '@/styles/globals.css';
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { CloseButtonProps, ToastContainer } from "react-toastify"
import { XMarkIcon } from '@heroicons/react/24/solid';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

const contextClass = {
  success: "bg-primary",
  error: "bg-error",
  info: "bg-primary",
  warning: "bg-primary",
  default: "bg-primary",
  dark: "bg-primary",
  light: "bg-primary"
};

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <span className="pr-5 cursor-pointer" onClick={closeToast}>
    <XMarkIcon
      color="#ffffff"
      height={16}
      width={16}
    />
  </span>
);

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '400', '500', '600', '700'], variable: '--font-poppins' });

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 40000 } }
  }));

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <ToastContainer
        toastClassName={context =>
          `${contextClass[context?.type || "default"]} text-white relative flex p-1 min-h-10 rounded-md justify-between items-center overflow-hidden cursor-pointer my-3 w-full`
        }
        className={"min-w-[4rem] !w-auto max-w-[90vw]"}
        bodyClassName={() => "w-full text-sm font-medium block p-5"}
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        closeButton={CloseButton}
        theme="light"
        icon={false}
      />
      <QueryClientProvider client={queryClient}>
        <main className={`${poppins.className} min-h-screen`} data-theme="dark">
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools />
      </QueryClientProvider >
    </>
  )
}

export default CustomApp;