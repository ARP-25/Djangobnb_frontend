"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import CustomButton from "../forms/CustomButton";
import Categories from "../addProperty/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const AddPropertyModal = () => {
    //
    // states
    // states/nav index
    const [currentStep, setCurrentStep] = useState(1);
    // error state
    const [errors, setErrors] = useState<string[]>([]);
    // states/property data
    const [dataCategory, setDataCategory] = useState("");
    const [dataName, setDataName] = useState("");
    const [dataDescription, setDataDescription] = useState("");
    const [dataPrice, setDataPrice] = useState("");
    const [dataBedrooms, setDataBedrooms] = useState("");
    const [dataBathrooms, setDataBathrooms] = useState("");
    const [dataGuests, setDataGuests] = useState("");
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
    const [dataImage, setDataImage] = useState<File | null>(null);

    //
    // set datas
    const setCategory = (category: string) => {
        setDataCategory(category);
    };

    //
    // Initialize addPropertyModal Zustand
    const addPropertyModal = useAddPropertyModal();

    //
    // Initialize useRouter next.js hook
    const router = useRouter();

    //
    // setImage
    const setImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setDataImage(event.target.files[0]);
        }
    };

    //
    // Reset all states
    const resetForm = () => {
        setCurrentStep(1);
        setDataCategory("");
        setDataName("");
        setDataDescription("");
        setDataPrice("");
        setDataBedrooms("");
        setDataBathrooms("");
        setDataGuests("");
        setDataCountry(undefined);
        setDataImage(null);
        setErrors([]);
    };

    //
    //
    const submitForm = async () => {
        if (dataCategory && dataName && dataDescription && dataPrice && dataBedrooms && dataBathrooms && dataGuests && dataCountry && dataImage) {
            const formData = new FormData();
            formData.append("category", dataCategory);
            formData.append("name", dataName);
            formData.append("description", dataDescription);
            formData.append("price_per_night", dataPrice);
            formData.append("bedrooms", dataBedrooms);
            formData.append("bathrooms", dataBathrooms);
            formData.append("guests", dataGuests);
            formData.append("country", dataCountry.label);
            formData.append("country_code", dataCountry.value);
            formData.append("image", dataImage);

            try {
                const response = await apiService.post("/api/properties/create/", formData);
                console.log("Response", response);
                if (response.success) {
                    console.log("Property created successfully");
                    addPropertyModal.close();
                    resetForm();
                    router.push("/?added=true");
                } else {
                    // Ensure the response contains only strings
                    const tmpErrors: string[] = response.errors
                        ? Object.values(response.errors).map((error: any) => {
                              if (typeof error === "object" && error.message) {
                                  return error.message;
                              }
                              return String(error);
                          })
                        : ["An unknown error occurred"];
                    setErrors(tmpErrors);
                    console.log("Error creating property");
                }
            } catch (err) {
                console.error("Unexpected error", err);
                setErrors(["Unexpected error occurred. Please try again."]);
            }
        } else {
            setErrors(["Please fill in all fields"]);
        }
    };

    //
    // content
    const content = (
        <>
            {" "}
            {currentStep === 1 && (
                <>
                    <h2 className="mb-4 text-2xl">Choose Category</h2>

                    <Categories dataCategory={dataCategory} setCategory={(category) => setCategory(category)} />

                    <CustomButton label="Next" onClick={() => setCurrentStep(2)} />
                </>
            )}
            {currentStep === 2 && (
                <>
                    <h2 className="mb-4 text-2xl">Describe your place</h2>

                    <div className="pt-3 pb-3 space-y-4 mb-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                value={dataName}
                                onChange={(e) => setDataName(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                            <label htmlFor="">Description</label>
                            <textarea
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <CustomButton className="mb-2 bg-black hover:bg-gray-800" label="Previous" onClick={() => setCurrentStep(1)} />

                    <CustomButton label="Next" onClick={() => setCurrentStep(3)} />
                </>
            )}
            {currentStep === 3 && (
                <>
                    <h2 className="mb-4 text-2xl">Details</h2>

                    <div className="pt-3 pb-3 space-y-4 mb-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="">Price per night</label>
                            <input
                                type="number"
                                value={dataPrice}
                                onChange={(e) => setDataPrice(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                            <label htmlFor="">Bedrooms</label>
                            <input
                                type="number"
                                value={dataBedrooms}
                                onChange={(e) => setDataBedrooms(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                            <label>Bathrooms</label>
                            <input
                                type="number"
                                value={dataBathrooms}
                                onChange={(e) => setDataBathrooms(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                            <label>Guests</label>
                            <input
                                type="number"
                                value={dataGuests}
                                onChange={(e) => setDataGuests(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <CustomButton className="mb-2 bg-black hover:bg-gray-800" label="Previous" onClick={() => setCurrentStep(2)} />

                    <CustomButton label="Next" onClick={() => setCurrentStep(4)} />
                </>
            )}
            {currentStep === 4 && (
                <>
                    <h2 className="mb-4 text-2xl">Location</h2>

                    <div className="pt-3 pb-3 space-y-4 mb-5">
                        <SelectCountry onChange={(value) => setDataCountry(value as SelectCountryValue)} value={dataCountry} />
                    </div>

                    <CustomButton className="mb-2 bg-black hover:bg-gray-800" label="Previous" onClick={() => setCurrentStep(3)} />

                    <CustomButton label="Next" onClick={() => setCurrentStep(5)} />
                </>
            )}
            {currentStep === 5 && (
                <>
                    <h2 className="mb-4 text-2xl">Picture</h2>
                    <div className="pt-3 pb-6 space-y-4">
                        <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
                            <input type="file" accept="image/*" onChange={setImage} />
                        </div>
                        {dataImage && (
                            <div className="relative w-full h-[300px]">
                                <Image src={URL.createObjectURL(dataImage)} layout="fill" objectFit="cover" alt="Property Image" className="rounded-xl" />
                            </div>
                        )}
                    </div>

                    {errors.map((error, index: number) => (
                        <div key={index} className="p-5 mb-4 bg-airbnb text-white rounded-xl opacity-80">
                            {error}
                        </div>
                    ))}

                    <CustomButton className="mb-2 bg-black hover:bg-gray-800" label="Previous" onClick={() => setCurrentStep(4)} />

                    <CustomButton label="Submit" onClick={submitForm} />
                </>
            )}
        </>
    );
    return (
        <>
            <Modal isOpen={addPropertyModal.isOpen} close={addPropertyModal.close} label="Add Property" content={content} />
        </>
    );
};

export default AddPropertyModal;
