"use client";
import { useCallback, useEffect, useState } from "react";

interface ModalProps {
    label: string;
    content: React.ReactElement;
    isOpen: boolean;
    close: () => void;
}

const Modal: React.FC<ModalProps> = ({ label, content, isOpen, close }) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        setShowModal(false);
        setTimeout(() => {
            close();
        }, 700);
    }, [close]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={`flex items-center justify-center fixed inset-0 z-50 bg-black/60 transition-opacity duration-700 ${
                showModal ? "opacity-100" : "opacity-0"
            }`}
        >
            <div className="relative w-full max-w-3xl mx-4 my-6 h-auto">
                <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
                    <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
                        <div
                            onClick={handleClose}
                            className="p-3 absolute left-3 hover:bg-gray-300 hover:text-airbnbDark transition rounded-full cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold">{label}</h2>
                    </header>
                    <section className="p-6 ">{content}</section>
                </div>
            </div>
        </div>
    );
};
export default Modal;
