"use client";
import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

//
// Custom Styles for Select Component to match the global custim Settings we configured in tailwind.config.js
const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderColor: state.isFocused ? "#00b4d8" : provided.borderColor,
        boxShadow: state.isFocused ? "0 0 0 2px #00b4d8" : provided.boxShadow,
        "&:hover": {
            borderColor: state.isFocused ? "#00b4d8" : provided["&:hover"].borderColor,
        },
    }),
};

//
// SelectCountryValue type definition for the value of the SelectCountry component
export type SelectCountryValue = {
    label: string;
    value: string;
};

//
// SelectCountryProps type definition for the props of the SelectCountry component
interface SelectCountryProps {
    value?: SelectCountryValue;
    onChange: (value: SelectCountryValue) => void;
}

//
// SelectCountry component definition
const SelectCountry: React.FC<SelectCountryProps> = ({ value, onChange }) => {
    const countries = useCountries();
    const { getAll } = useCountries();
    return (
        <>
            <Select
                isClearable
                placeholder="Anywhere"
                options={getAll()}
                styles={customStyles}
                value={value}
                onChange={(value) => onChange(value as SelectCountryValue)}
            />
        </>
    );
};

export default SelectCountry;
