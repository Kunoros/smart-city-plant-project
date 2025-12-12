import { useEffect, useState } from "react";
import PlantCard from "@/components/PlantCard";
import mockPlants from "@/data/mockPlants";

export default function PlantOverview() {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/plants")
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => setPlants(data))
            .catch(() => setPlants(mockPlants)); // fallback to mock data
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold brand-accent">Slimme Planten</h1>

            <div className="overview-grid mt-4">
                {plants.map(p => (
                    <PlantCard key={p.id} plant={p} />
                ))}
            </div>
        </div>
    );
}
