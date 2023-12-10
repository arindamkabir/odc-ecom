import { Transition } from "@headlessui/react";
import MoonLoader from "react-spinners/MoonLoader";

const PageLoader = ({ loading }: { loading: boolean }) => {
    return (
        <Transition
            appear={true}
            show={loading}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="h-screen w-screen bg-white flex justify-center items-center">
                <MoonLoader color="black" size={40} />
            </div>
        </Transition>
    )
}

export default PageLoader