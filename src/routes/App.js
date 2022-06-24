import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../components/Login"
import Navbar from './Navbar';
import Orders from './Orders';
import Dashboard from './Dashboard';
import Planner from './Planner';

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true)

    if (isLoggedIn) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}  >
                        <Route index element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/planner" element={<Planner />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    } else {
        return <Login setIsLoggedIn={setIsLoggedIn} />
    }
}

export default App