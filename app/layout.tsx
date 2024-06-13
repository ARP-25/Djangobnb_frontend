import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modal";

import React from "react";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";
import AddPropertyModal from "./components/modals/AddPropertyModal";
import SearchModal from "./components/modals/SearchModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DjangoBnb",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const content = (
        <div>
            <p>Modal Content</p>
        </div>
    );
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <div className="pt-36">{children}</div>
                {/* <Modal label="Modal Test" content={content} isOpen={true} /> */}
                <LoginModal />
                <SignupModal />
                <AddPropertyModal />
                <SearchModal />
            </body>
        </html>
    );
}