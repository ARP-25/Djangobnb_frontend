import Image from "next/image";
import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const HostDetailPage = async ({ params }: { params: { id: string } }) => {
    const host = await apiService.get(`/api/auth/${params.id}/`);
    const userId = await getUserId();

    return (
        <main className="max-w-[1500px] mx-auto px-8 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <div className="relative w-48 h-48">
                            <Image src={host.avatar_url} alt="host Name" layout="fill" objectFit="cover" className="rounded-full" />
                        </div>
                        <img src="" alt="" />
                        <h1 className="mt-6 text-2xl">{host.name}</h1>
                        {userId !== host.id && <ContactButton userId={userId} hostId={host.id} />}
                    </div>
                </aside>
                <div className="col-span-1 md:col-span-4 pl-0 md:pl-6">
                    <div className="mt-4 md:mt-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <PropertyList host_id={host.id} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HostDetailPage;
