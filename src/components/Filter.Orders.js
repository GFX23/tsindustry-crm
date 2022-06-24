import { useState, useEffect } from "react"
import Input from "./Input"
import DateInput from "./DateInput.filter"
import {ReactComponent as SearchIcon} from "./icons/search.svg"

const Filter = ({orderList, setDisplayList}) => {
//    const [partName, setPartName] = useState ("")
    const [orderNum, setOrderNum] = useState("")
    const [customer, setCustomer] = useState("")
    const [date, setDate] = useState(new Date().toISOString().substring(0,7))

    useEffect(() => {
        const filterOrderList = () => {
            const filteredList = orderList.filter(item => 
                item.orderNum.includes(orderNum.toLowerCase()) &&
                item.customer.toLowerCase().includes(customer.toLowerCase()) &&
//                item.partName.toLowerCase().includes(partName.toLowerCase()) &&
                item.date.includes(date)
            )
            return setDisplayList(filteredList)
        }
        filterOrderList()
    }, [orderNum, customer, orderList, setDisplayList, date])
    return (
        <div className="dropdown dropdown-hover dropdown-right w-fit">
            <button className="btn btn-accent border-2 btn-square"><SearchIcon/></button>
            <ul className="dropdown-content flex flex-row menu pl-4 gap-4">
                <DateInput value={date} onChange={(e) => setDate(e.target.value)} label="Enter date:"  />
                {/*<Input value={partName} onChange={(e) => setPartName(e.target.value)} name="Part" placeholder="Enter part name"/>*/}
                <Input value={customer} onChange={(e) => setCustomer(e.target.value)} name="Customer" placeholder="Enter customer name" type="text"/>
                <Input value={orderNum} onChange={(e) => setOrderNum(e.target.value)} name="Order" placeholder="Enter order #" type="text"/>
            </ul>
        </div>
    )
}

export default Filter