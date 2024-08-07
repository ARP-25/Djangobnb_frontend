"use client";

import { useState, useEffect } from "react";
import { Range } from "react-date-range";
import Swal from "sweetalert2";
import { differenceInDays, eachDayOfInterval, set, format } from "date-fns";
import useLoginModal from "../../hooks/useLoginModal";
import DatePicker from "../forms/Calendar";
import apiService from "@/app/services/apiService";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
};

export type Property = {
    id: string;
    price_per_night: number;
    guests: number;
};

interface ReservationSidebarProps {
    userId: string | null;
    property: Property;
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({ property, userId }) => {
    const loginModal = useLoginModal();
    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [guests, setGuests] = useState<string>("1");

    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [bookedDates, setBookedDates] = useState<Date[]>([]); // [new Date(), new Date()

    const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1);

    const performBooking = async () => {
        console.log("Performing booking");
        if (userId) {
            if (dateRange.startDate && dateRange.endDate && guests) {
                const formData = new FormData();
                formData.append("property_id", property.id);
                formData.append("start_date", format(dateRange.startDate, "yyyy-MM-dd"));
                formData.append("end_date", format(dateRange.endDate, "yyyy-MM-dd"));
                formData.append("number_of_nights", nights.toString());
                formData.append("total_price", totalPrice.toString());
                formData.append("guests", guests);

                try {
                    const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);

                    if (response.success) {
                        console.log("Booking successful");
                        console.log("bookedDates", bookedDates);
                        Swal.fire({
                            title: "Booking successful",
                            text: `Start Date: ${format(dateRange.startDate, "yyyy-MM-dd")}\nEnd Date: ${format(dateRange.endDate, "yyyy-MM-dd")}`,
                            icon: "success",
                            confirmButtonText: "OK",
                            customClass: {
                                confirmButton: "swal2-confirm",
                            },
                        });
                    } else {
                        console.log("Booking failed with response:", response);
                        Swal.fire({
                            title: "Booking failed",
                            text: response.message || "An error occurred",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    }
                } catch (error) {
                    console.log("Booking error caught in catch:");
                    Swal.fire({
                        title: "Booking failed",
                        text: "An error occurred, try a different date range or contact support.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            }
        } else {
            loginModal.open();
        }
    };

    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);
        if (newEndDate <= newStartDate) {
            newEndDate.setDate(newStartDate.getDate() + 1);
            0;
        }
        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate,
        });
    };

    const getReservations = async () => {
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`);
        let dates: Date[] = [];
        reservations.forEach((reservations: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservations.start_date),
                end: new Date(reservations.end_date),
            });
            dates = [...dates, ...range];
        });
        setBookedDates(dates);
    };

    useEffect(() => {
        getReservations();

        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

            if (dayCount > 0 && property.price_per_night) {
                const _fee = ((dayCount * property.price_per_night) / 100) * 5;
                setFee(_fee);

                const _totalPrice = Number(dayCount * property.price_per_night) + Number(_fee);
                setTotalPrice(_totalPrice);
                setNights(dayCount);
            } else {
                const _fee = (property.price_per_night / 100) * 5;
                setFee(_fee);

                const _totalPrice = Number(property.price_per_night) + Number(_fee);
                setTotalPrice(_totalPrice);
                setNights(1);
            }
        }
    }, [dateRange]);

    return (
        <aside className="p-6 mt-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
            <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>
            <DatePicker value={dateRange} onChange={(value) => _setDateRange(value.selection)} bookedDates={bookedDates} />
            <div className="mb-6 p-3 border border-gray-400 rounded-xl">
                <label htmlFor="" className="block font-bold text-xs mb-1">
                    Guests
                </label>
                <select className="w-full text-sm" value={guests} onChange={(e) => setGuests(e.target.value)}>
                    {guestsRange.map((number) => (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
            </div>

            <div
                onClick={performBooking}
                className="cursor-pointer w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnbDark rounded-xl transition"
            >
                Book
            </div>
            <div className="flex mb-4 justify-between align-center">
                <p>
                    ${property.price_per_night} * {nights} nights
                </p>
                <p>${property.price_per_night * nights}</p>
            </div>
            <div className="flex mb-4 justify-between align-center">
                <p>Djangobnb fee</p>
                <p>${fee}</p>
            </div>
            <hr />
            <div className="flex mt-4 justify-between align-center font-bold">
                <p>Total</p>
                <p>${totalPrice}</p>
            </div>
        </aside>
    );
};

export default ReservationSidebar;
