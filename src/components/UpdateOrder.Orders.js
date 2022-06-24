import { useState, useRef } from "react"
import { useOutletContext } from "react-router-dom"
import { editData } from "../services/firebase.service"
import Input from "./Input"
import DateInput from "./DateInput"
import Button from "./Button"
import Select from "./Select.AddOrder"
import Message from "./Message"


const UpdateOrder = ({id, orderData, setUpdate}) => {
    const [data, setData] = useOutletContext()
    const [success, setSuccess] = useState(false)
    const [order, setOrder] = useState(orderData)
    const closeButton = useRef()
    const customerSelect = useRef()
    
    const handleChange = (key, e) => {
        setOrder({...order, [key]: e.target.value})
    }
    
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            const sum = parseInt(order.op1) + parseInt(order.op2)
            setOrder({...order, "op1": sum, "op2": ""})
        }
    }

    const editDoc = () => {
        const idx = customerSelect.current.options.selectedIndex-1
        const recalc = {
            price: orderData.time === order.time ?
            order.price : 
            data.customers[idx].hourRate * order.time,
        }
        const newList = data.orders.filter(item => item.id !== id)
        editData("orders", id, {...order, ...recalc})
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        },3000)
        closeButton.current.focus()

        return setData({...data, orders: [...newList, {
            ...order, ...recalc, id}]})
    }

    return (
        <div className="modal modal-open">
        <div className="modal-box w-min flex flex-col p-4">
            <label ref={closeButton} onClick={() => setUpdate(false)} htmlFor="my-modal-1" className="btn btn-sm btn-circle btn-error btn-outline absolute right-4 top-4">✕</label>
            <div className="flex flex-col gap-4">
                <h2 className="text-center text-lg">Enter order details:</h2>
                <div className="flex flex-row gap-4">
                    <Select ref={customerSelect} onChange={(e) => handleChange("customer", e)} value={order.customer} customersList={data.customers}/>
                    <DateInput value={order.date} onChange={(e) => handleChange("date", e)} label="Enter date:"  />
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col gap-4">
                        <Input value={order.orderNum} onChange={(e) => handleChange("orderNum", e)} name="Order #" placeholder="Enter number" type="text"/>
                        <Input value={order.partName} onChange={(e) => handleChange("partName", e)} name="Part" placeholder="Enter name" type="text"/>
                        <Input value={order.partCount} onChange={(e) => handleChange("partCount", e)} name="Part #" placeholder="Enter count"/>
                        <Input value={order.op1} onChange={(e) => handleChange("op1", e)} name="OP1" placeholder="Enter minutes"/>
                        <Input value={order.op2} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => handleChange("op2", e)} name="OP2" placeholder="Enter minutes"/>
                        <Input value={order.time} onChange={(e) => handleChange("time", e)} name="Time" placeholder="Enter time in hours"/>
                        <Input value={order.price} onChange={(e) => handleChange("price", e)} name="Price" placeholder="Enter final price"/>
                    </div>
                    <div className="flex grow justify-end items-end gap-4 pl-4">
                        <input type="text" readOnly value={(order.partCount*order.op1*order.op2) > 0 ? `${(((parseInt(order.op1) + parseInt(order.op2)) * order.partCount)/60).toFixed(2)} H` : 0} className="input input-bordered input-accent w-full" />
                        <Button onClick={editDoc} text="+" type="btn-square btn-accent text-2xl" />
                    </div>
                </div>
            </div>
            {success && <div className="pt-4"><Message success={true} text={`Order was modified!`} /></div>}
        </div>
        </div>
    )
}

export default UpdateOrder