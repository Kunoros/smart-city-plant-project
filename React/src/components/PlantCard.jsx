import { Card } from "./Cards";
import { Link } from "react-router-dom";
import PlantIcon from "./PlantIcon";

export default function PlantCard({ plant }) {
    return (
        <Link to={`/plants/${plant.id}`}>
            <Card className="hover:scale-105 transition cursor-pointer">
                <div className="flex gap-4 items-center">
                    {/* image placeholder */}
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <PlantIcon size={30} color="#f97316" />
                    </div>

                    <div className="flex-1">
                        <div className="text-lg font-semibold">{plant.name}</div>
                        <div className="text-sm text-gray-600 mt-1">Temp: {plant.temperature}°C • Humidity: {plant.humidity}%</div>
                    </div>

                    <div className="text-right text-sm text-gray-500">
                        <div>#{plant.id}</div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
