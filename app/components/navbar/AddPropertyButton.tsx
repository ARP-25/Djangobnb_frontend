"use client";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface AddPropertyButtonProps {
    userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({ userId }) => {
    const addPropertyModal = useAddPropertyModal();
    const loginModal = useLoginModal();

    const airbnbYourHome = () => {
        if (userId) {
            addPropertyModal.open();
        } else {
            loginModal.open();
        }
    };

    return (
        <button onClick={airbnbYourHome} className="hidden md:block cursor-pointer p-2 text-sm font-semibold rounded-full hover:bg-gray-200">
            Airbnb your home
        </button>
    );
};
export default AddPropertyButton;
