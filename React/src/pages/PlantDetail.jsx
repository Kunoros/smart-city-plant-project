import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/Card";
import mockPlants from "@/data/mockPlants";
import SimpleLineChart from "@/components/SimpleLineChart";
import PlantIcon from "@/components/PlantIcon";

export default function PlantDetail() {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/plants/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => setPlant(data))
            .catch(() => {
                // fallback: find plant in mock data by id
                const found = mockPlants.find(p => String(p.id) === String(id));
                setPlant(found || null);
            });
    }, [id]);

    if (!plant) return <div>Loading...</div>;

    return (
        <div className="p-6 page-container">
            <div className="flex gap-6 items-start">
                <Card className="w-40 h-40 flex items-center justify-center text-lg font-semibold">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        <PlantIcon size={48} color="#f97316" />
                        <div className="font-semibold">{plant.name}</div>
                    </div>
                </Card>

                <div className="flex flex-col gap-4 text-lg font-medium">
                    <p>Temp: {plant.temperature}°C</p>
                    <p>Humidity: {plant.humidity}%</p>
                    <p>Pressure: {plant.pressure}</p>
                    <p>Moisture: {plant.moisture}%</p>
                </div>
            </div>

            <div className="detail-charts">
                <Card>
                    <CardContent>
                        <SimpleLineChart
                            series={[{ name: 'Temperature (°C)', color: '#ef4444', points: plant.historyTempPressure || [] }]}
                            height={140}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <SimpleLineChart
                            series={[{ name: 'Pressure (hPa)', color: '#0ea5e9', points: plant.historyPressure || [] }]}
                            height={140}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <SimpleLineChart
                            series={[{ name: 'Humidity (%)', color: '#10b981', points: plant.historyHumidity || [] }]}
                            height={140}
                            yDomain={{ min: 0, max: 100 }}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <SimpleLineChart
                            series={[{ name: 'Moisture (%)', color: '#f59e0b', points: plant.historyMoisture || [] }]}
                            height={140}
                            yDomain={{ min: 0, max: 100 }}
                        />
                    </CardContent>
                </Card>
            </div>

            <div className="page-last-updated">Last updated: {new Date(plant.updatedAt).toLocaleString()}</div>
        </div>
    );
}
