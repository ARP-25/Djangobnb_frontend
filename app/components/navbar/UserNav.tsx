"use client";
import { useState } from "react";
import MenuLink from "./MenuLink";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignupModal from "@/app/hooks/useSignupModal";
import LogoutButton from "../LogoutButton";
import { useRouter } from "next/navigation";
interface UserNavProps {
    userId?: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ userId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const loginModal = useLoginModal();
    const signupModal = useSignupModal();
    const router = useRouter();

    return (
        <div className="p-2  relative border rounded-full flex items-center justify-center">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
                {/* Hamburger */}
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                {/* Profil */}
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
            </button>

            {isOpen && (
                <div className="w-[220px] z-50 absolute top-[60px] right-0 bg-white-200 border rounded-xl shadow-md flex flex-col cursoir-pointer">
                    {userId !== null ? (
                        <>
                            <LogoutButton />
                            <MenuLink
                                label="Inbox"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/inbox");
                                }}
                            />
                            <MenuLink
                                label="My Properties"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/myproperties");
                                }}
                            />
                            <MenuLink
                                label="My Reservations"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/myreservations");
                                }}
                            />
                            <MenuLink
                                label="My Favorites"
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/myfavorites");
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <MenuLink
                                label="Log In"
                                onClick={() => {
                                    setIsOpen(false);
                                    loginModal.open();
                                }}
                            />
                            <MenuLink
                                label="Sign Up"
                                onClick={() => {
                                    setIsOpen(false);
                                    signupModal.open();
                                }}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
export default UserNav;
