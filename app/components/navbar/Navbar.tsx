import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";
import { getUserId } from "@/app/lib/actions";
const Navbar = async () => {
    const userId = await getUserId();
    return (
        <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
            <div className="max-w-[1500px] mx-auto px-8">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex-shrink-2">
                        <Image src="/logo.png" alt="Djangobnb Logo" width={200} height={50} />
                    </Link>

                    <div className="flex space-x-6">
                        <SearchFilters />
                    </div>

                    <div className="flex space-x-6">
                        <AddPropertyButton userId={userId} />
                        <UserNav userId={userId} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
