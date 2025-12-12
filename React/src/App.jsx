import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlantOverview from "@/pages/PlantOverview";
import PlantDetail from "@/pages/PlantDetail";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PlantOverview />} />
                <Route path="/plants/:id" element={<PlantDetail />} />
            </Routes>
        </BrowserRouter>
    );
}
