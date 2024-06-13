import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

//
// Interface for the PropertyListItems component
interface PropertyProps {
    property: PropertyType;
    markFavorite: (is_favorite: boolean) => void;
}

const PropertyListItems: React.FC<PropertyProps> = ({ property, markFavorite }) => {
    const router = useRouter();
    return (
        <div className="cursor-pointer" onClick={() => router.push(`/properties/${property.id}`)}>
            <div className="overflow-hidden aspect-square relative rounded-xl">
                <Image
                    className="hover:scale-110 object-cover transition-transform duration-1000 ease-in-out "
                    src={property.image_url}
                    alt="Property Image"
                    fill
                    sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                />
                {markFavorite && (
                    <FavoriteButton id={property.id} is_favorite={property.is_favorite} markFavorite={(is_favorite) => markFavorite(is_favorite)} />
                )}
            </div>
            <div className="mt-2">
                <p className="text-lg font-bold">{property.name}</p>
            </div>
            <div className="mt-2">
                <p className="text-sm text-gray-500">
                    <strong>$200</strong> {property.price_per_night} per night
                </p>
            </div>
        </div>
    );
};
export default PropertyListItems;
