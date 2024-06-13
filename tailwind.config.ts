import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                airbnb: "#ff385c",
                airbnbDark: "#d50027",
            },
            borderColor: {
                "custom-focus": "#00b4d8", // Customize this color as needed
            },
        },
    },
    plugins: [
        function ({ addBase, theme }: { addBase: any; theme: any }) {
            addBase({
                "input:focus": {
                    borderColor: theme("borderColor.custom-focus"),
                    borderWidth: theme("borderWidth.2"), // Set the border width to 2px

                    outline: "none", // Ensure the default outline is removed
                },
                "textarea:focus": {
                    borderColor: theme("borderColor.custom-focus"),
                    borderWidth: theme("borderWidth.2"), // Set the border width to 2px

                    outline: "none", // Ensure the default outline is removed
                },
                "Select:focus": {
                    borderColor: theme("borderColor.custom-focus"),
                    borderWidth: theme("borderWidth.2"), // Set the border width to 2px

                    outline: "none", // Ensure the default outline is removed
                },
            });
        },
    ],
};
export default config;
