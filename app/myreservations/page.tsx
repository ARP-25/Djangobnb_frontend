import Image from "next/image";
import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import apiService from "../services/apiService";
import Link from "next/link";
const MyReservationsPage = async () => {
    const myReservations = await apiService.get(`/api/auth/myreservations/`);
    return (
        <main className="max-w-[1500px] mx-auto px-8 pb-6 space-y-4">
            <h1 className="text-2xl my-6">My Reservations</h1>

            {myReservations.map((reservation: any) => (
                <div
                    key={reservation?.id}
                    className="p-5 grid grid-cols-1 md:grid-cols-4 space-y-4 md:gap-4 md:space-y-0 shadow-md border border-gray-300 rounded-xl"
                >
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image
                                fill
                                src={reservation?.property?.image_url}
                                className="hover:scale-110 object-cover transition h-full w-full"
                                alt="Beach house"
                            />
                        </div>
                    </div>

                    <div className="col-span-3 space-y-2">
                        <h2 className="mb-4 text-xl"></h2>

                        <p>
                            <strong>Check in Date:</strong> {reservation?.start_date}
                        </p>
                        <p>
                            <strong>Check out Date:</strong> {reservation?.end_date}
                        </p>
                        <p>
                            <strong>Number of Nights:</strong> {reservation?.number_of_nights}
                        </p>
                        <p>
                            <strong>Number of Nights:</strong> ${reservation?.total_price}
                        </p>
                    </div>

                    <Link
                        href={`/properties/${reservation?.property?.id}`}
                        className="mt-4 cursor-pointer py-4 px-6 max-w-[480px] bg-airbnb text-white rounded-xl text-center hover:bg-airbnbDark transition"
                    >
                        Go to Property
                    </Link>
                </div>
            ))}
        </main>
    );
};

export default MyReservationsPage;
