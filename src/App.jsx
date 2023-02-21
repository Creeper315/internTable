import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import TableMain from "./view/Table/tableMain";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TableMain />} />
                    <Route path="/table" element={<TableMain />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
