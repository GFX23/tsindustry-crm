import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import DoughnutChart from "../components/DoughnutChart"
import DateInput from "../components/DateInput.filter"
import LineChart from "../components/LineChart"

const Dashboard = () => {
    const [data] = useOutletContext()
    const [date, setDate] = useState(new Date().toISOString().substring(0, 7))

    const getFilteredOrders = (from, to) => {
        const orders = data.orders.filter(order => parseInt(order.date.substring(from, to)) === parseInt(date.substring(from, to)))
        return orders
    }

    const getLastMonthOrders = () => {
        const orders = data.orders.filter(order => parseInt(order.date.substring(5, 7)) === parseInt(date.substring(5, 7)) - 1)
        return orders
    }

    const getTotal = (data) => {
        const total = data.reduce((total, current) => {
            return total += parseInt(current.price)
        }, 0)
        return total / 1000
    }

    const thisMonthTotal = getTotal(getFilteredOrders(5, 7)).toFixed(1)
    const lastMonthTotal = getTotal(getLastMonthOrders()).toFixed(1)
    const thisYearTotal = getTotal(getFilteredOrders(0, 4)).toFixed(2)

    const getPartsTotal = (data) => {
        const total = data.reduce((total, current) => {
            return total += parseInt(current.partCount)
        }, 0)
        return total
    }

    const getMoneyOnCustomer = () => {
        const orders = getFilteredOrders(5, 7)
        const reducedOrders = orders.reduce((accumulator, item) => {
            accumulator[item.customer] = (accumulator[item.customer] || 0) + parseInt(item.price)
            return accumulator;
        }, {});
        return reducedOrders
    }

    const getMonthlyPerformance = () => {
        const orders = getFilteredOrders(5, 7)
        const reducedOrders = orders.reduce((accumulator, item) => {
            accumulator[parseInt(item.date.substring(8, 10))] = (accumulator[parseInt(item.date.substring(8, 10))] || 0) + parseInt(item.price)
            return accumulator;
        }, {});
        const values = Object.values(reducedOrders)
        const keys = Object.keys(reducedOrders)
        let total = 0
        let monthly = {}
        keys.forEach((key, idx) => {
            const value = values[idx] + total
            monthly = { ...monthly, [key]: value }
            total += values[idx]
        })
        return monthly
    }

    return (
        <div className="w-full h-screen p-4 gap-4">
            <DateInput value={ date } onChange={ (e) => setDate(e.target.value) } />
            <div className="divider my-10">THIS MONTH STATS</div>
            <div className="flex flex-row justify-between">

                <div className="stats stats-vertical shadow">
                    <div className="stat place-items-center">
                        <div className="stat-title">This Month Total</div>
                        <div className="stat-value text-accent">{ thisMonthTotal > 1000 ? `${(thisMonthTotal / 1000).toFixed(2)} M` : `${thisMonthTotal} K` }</div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title">Previous Month</div>
                        <div className="stat-value">{ lastMonthTotal > 1000 ? `${(lastMonthTotal / 1000).toFixed(2)} M` : `${lastMonthTotal} K` }</div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title">Parts Made This Month</div>
                        <div className="stat-value">{ getPartsTotal(getFilteredOrders(5, 7)) }</div>
                    </div>
                </div>
                <DoughnutChart ordersData={ getMoneyOnCustomer() } />
                <div className="stats stats-vertical shadow">
                    <div className="stat place-items-center">
                        <div className="stat-title">This Year Total</div>
                        <div className="stat-value">{ thisYearTotal > 1000 ? `${(thisYearTotal / 1000).toFixed(2)} M` : `${thisYearTotal} K` }</div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title">This Month Total</div>
                        <div className="stat-value text-secondary"></div>
                    </div>
                    <div className="stat place-items-center">
                        <div className="stat-title">Parts Made This Year</div>
                        <div className="stat-value">{ getPartsTotal(getFilteredOrders(0, 4)) }</div>
                    </div>
                </div>
            </div>
            <div className="divider my-10">MONTHLY BREAKDOWN</div>
            <LineChart orderData={ getMonthlyPerformance() } />
        </div >
    )
}

export default Dashboard