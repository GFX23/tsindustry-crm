import { useOutletContext } from "react-router-dom"
import AddExcelOrders from "../components/DatabaseFiller"

const Planner = () => {
    const [data, setData] = useOutletContext()
    
    return (
        <div className="w-full h-screen bg-black text-white"><AddExcelOrders /></div>
    )
}

export default Planner