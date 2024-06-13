import Image from "next/image";
import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import { getUserId } from "../lib/actions";

const MyPropertiesPage = async () => {
    const userId = await getUserId();
    return (
        <main className="max-w-[1500px] mx-auto px-8 pb-6 space-y-4">
            <h1 className="text-2xl my-6">MyPropertiesPage</h1>
            <div className="mt-4 md:mt-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <PropertyList host_id={userId} />
            </div>
        </main>
    );
};

export default MyPropertiesPage;
