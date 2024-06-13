"use client";
import useLoginModal from "../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import apiService from "../services/apiService";

interface ContactButtonProps {
    userId: string | null;
    hostId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ userId, hostId }) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const startConversation = async () => {
        if (userId) {
            try {
                const response = await apiService.get(`/api/chat/start/${hostId}/`);
                if (response.success && response.conversation_id) {
                    router.push(`/inbox/${response.conversation_id}`);
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Error starting conversation:", error);
            }
        } else {
            loginModal.open();
        }
    };

    return (
        <div onClick={startConversation} className="cursor-pointer hover:bg-airbnbDark transition mt-6 py-4 px-6 bg-airbnb text-white rounded-xl">
            Contact
        </div>
    );
};

export default ContactButton;
