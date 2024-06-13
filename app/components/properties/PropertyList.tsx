"use client";

import { useEffect, useState } from "react";
import React from "react";
import format from "date-fns/format";
import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
//
// Type for the Property object used to set the property state which gets passed to the PropertyListItem component
export type PropertyType = {
    id: string;
    name: string;
    price_per_night: number;
    image_url: string;
    is_favorite: boolean;
};

//
// Interface for the PropertyList component
interface PropertyListProps {
    host_id?: string | null;
    favorites?: boolean | null;
}

const PropertyList: React.FC<PropertyListProps> = ({ host_id, favorites }) => {
    //
    // State to store the properties
    const [properties, setProperties] = useState<PropertyType[]>([]);

    //
    //
    const searchModal = useSearchModal();
    const country = searchModal.query.country;
    const numbGuests = searchModal.query.guests;
    const numBathrooms = searchModal.query.bathrooms;
    const numBedrooms = searchModal.query.bedrooms;
    const checkinDate = searchModal.query.checkIn;
    const checkoutDate = searchModal.query.checkOut;
    const category = searchModal.query.category;

    //
    //
    const params = useSearchParams();

    //
    // Function to mark a property as favorite
    // Gets passed to the PropertyListItem component
    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if (property.id === id) {
                property.is_favorite = is_favorite;
                if (is_favorite) {
                    console.log("Added to favorites");
                } else {
                    console.log("Removed from favorites");
                }
            }
            return property;
        });
        setProperties(tmpProperties);
    };

    //
    // Function to fetch properties from the API
    const getProperties = async () => {
        let url = "/api/properties/";
        if (host_id) {
            url = `/api/properties/?host_id=${host_id}`;
        } else if (favorites) {
            url = "/api/properties/?is_favorites=true";
        } else {
            let urlQuery = "";
            if (country) {
                urlQuery += `&country=${country}`;
            }
            if (numbGuests) {
                urlQuery += `&guests=${numbGuests}`;
            }
            if (numBathrooms) {
                urlQuery += `&bathrooms=${numBathrooms}`;
            }
            if (numBedrooms) {
                urlQuery += `&bedrooms=${numBedrooms}`;
            }
            if (checkinDate) {
                urlQuery += `&checkin=${format(checkinDate, "yyyy-MM-dd")}`;
            }
            if (checkoutDate) {
                urlQuery += `&checkout=${format(checkoutDate, "yyyy-MM-dd")}`;
            }
            if (category) {
                urlQuery += `&category=${category}`;
            }
            if (urlQuery.length) {
                console.log("URL Query:", urlQuery);
                urlQuery = "?" + urlQuery.substring(1);
                url += urlQuery;
            }
        }

        try {
            const response = await apiService.get(url);
            console.log("Full response:", response);

            const { data, favorites } = response;
            if (Array.isArray(data)) {
                const propertiesWithFavorites = data.map((property: any) => ({
                    ...property,
                    is_favorite: favorites.includes(property.id),
                }));
                console.log("Processed properties:", propertiesWithFavorites);
                setProperties(propertiesWithFavorites);
            } else {
                console.error("Fetched data is not an array", response);
            }
        } catch (error) {
            console.error("Error fetching properties with axios", error);
        }
    };

    //
    // Fetch properties when the component mounts or query changes
    useEffect(() => {
        getProperties();
    }, [host_id, searchModal.query, params]);

    return (
        <>
            {properties.map((property) => (
                <PropertyListItem key={property.id} property={property} markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)} />
            ))}
        </>
    );
};

export default PropertyList;
