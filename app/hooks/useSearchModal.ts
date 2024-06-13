import { create } from "zustand";

export type SearchQuery = {
    country: string | undefined;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
    guests: number;
    bathrooms: number;
    bedrooms: number;
    category: string;
};

interface SearchModalStore {
    isOpen: boolean;
    step: string;
    open: (step: string) => void;
    close: () => void;
    query: SearchQuery;
    setQuery: (query: SearchQuery) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    step: "",
    open: (step) => {
        console.log(`Modal opened to step: ${step}`);
        set({ isOpen: true, step: step });
    },
    close: () => {
        console.log("Modal closed");
        set({ isOpen: false });
    },
    setQuery: (query: SearchQuery) => {
        console.log("Query updated:", query);
        set({ query: query });
    },
    query: {
        country: "",
        checkIn: undefined,
        checkOut: undefined,
        guests: 1,
        bedrooms: 0,
        bathrooms: 0,
        category: "",
    },
}));

export default useSearchModal;
