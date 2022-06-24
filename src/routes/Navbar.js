import { useState, useEffect } from "react"
import { getOrders, getCustomers } from "../services/firebase.service"
import { Outlet } from "react-router-dom"
import { ReactComponent as OrdersIcon } from "../components/icons/orders.svg"
import { ReactComponent as PlannerIcon } from "../components/icons/planner.svg"
import { ReactComponent as DashboardIcon } from "../components/icons/charts.svg"
import { ReactComponent as LogoutIcon } from "../components/icons/logout.svg"
import NavButton from "../components/NavButton.App"
import ButtonTooltip from "../components/ButtonTooltip"
import Loader from "../components/Loader"
import ModeSwap from "../components/ModeSwap"

const Navbar = ({setIsLoggedIn}) => {
  const [data, setData] = useState({orders: [], customers: []})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
          const getData = async () => {
              const customersData = await getCustomers()
              const orderData = await getOrders()
              orderData.map(order => order.partCount = parseInt(order.partCount))
              console.log(orderData)
              setData({orders: orderData, customers: customersData})
          }
      setLoading(true)
      getData()
          .then(() => setLoading(false))
  }, [])

  return (
    
    <div className="container flex flex-col mx-auto max-w-5xl">
      <div className="navbar m-0 p-0">
        <div className="flex flex-row justify-between grow p-4">
          <div className="flex flex-row gap-4">
            <NavButton to="/orders" name="orders" logo={<OrdersIcon />} />
            <NavButton to="/" name="dashboard" logo={<DashboardIcon />} />
            <NavButton to="/planner" name="planner" logo={<PlannerIcon />} />
          </div>
          <div className="flex justify-center gap-4">
          <ModeSwap />
          <ButtonTooltip onClick={() => setIsLoggedIn(false)} name="Logout" text={<LogoutIcon />} />
          </div>
        </div>
      </div>
      {loading ? <Loader /> : <Outlet context={[data, setData]} />}
    </div>
  )
  
}

export default Navbar;
