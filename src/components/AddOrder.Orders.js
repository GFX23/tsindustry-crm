import { addData } from "../services/firebase.service"
import { useState, useRef } from "react"
import { useOutletContext } from "react-router-dom"
import {ReactComponent as AddIcon} from "./icons/add.svg"
import Input from "./Input"
import DateInput from "./DateInput"
import Button from "./Button"
import Select from "./Select.AddOrder"
import Message from "./Message"


const AddOrderButton = () => {
    const [data, setData] = useOutletContext()
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const setFocus = useRef()
    const customerSelect = useRef()

    const [order, setOrder] = useState({
        date: new Date().toISOString().substring(0,10),
        customer: "",
        orderNum: "",
        partName: "",
        partCount: "",
        op1: "",
        op2: "",
        time: "",
        price: ""
    })

    const handleChange = (key, e) => {
        setOrder({...order, [key]: e.target.value})
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            const sum = parseInt(order.op1) + parseInt(order.op2)
            setOrder({...order, "op1": sum, "op2": ""})
        }
    }

    const addDoc = async() => {
        const idx = customerSelect.current.options.selectedIndex-1
        if (order.customer === "") {
            setTimeout(() => {
                setFailure(false)
            },3000)
            return setFailure(true)
        }
        const docData = await addData("orders", {
            ...order, 
            price: order.price === "" ? data.customers[idx].hourRate * order.time : order.price,
        })
        setOrder({
            ...order, orderNum: "", partName: "", partCount: 0,
            op1: 0, op2: 0, time: "", price: ""
        })
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        },3000)
        setFocus.current.focus()
        return setData({...data, orders: [...data.orders, {
            ...order, 
            price: order.price === "" ? data.customers[idx].hourRate * order.time : order.price,
            id: docData.id,
            partCount: parseInt(order.partCount)
        }]})
    }

    return (
        <>
        <label htmlFor="my-modal-1" className="btn modal-button btn-square border-2 btn-accent text-2xl"><AddIcon /></label>
        <input type="checkbox" id="my-modal-1" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box w-min flex flex-col p-4">
                <label htmlFor="my-modal-1" className="btn btn-sm btn-circle btn-error btn-outline absolute right-4 top-4">✕</label>
                <div className="flex flex-col gap-4">
                    <h2 className="text-center text-lg">Enter order details:</h2>
                    <div className="flex flex-row gap-4">
                        <Select ref={customerSelect} onChange={(e) => handleChange("customer", e)} value={order.customer} customersList={data.customers}/>
                        <DateInput value={order.date} onChange={(e) => handleChange("date", e)} label="Enter date:"  />
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col gap-4">
                            <Input ref={setFocus} value={order.orderNum} onChange={(e) => handleChange("orderNum", e)} name="Order #" placeholder="Enter number" type="text" />
                            <Input value={order.partName} onChange={(e) => handleChange("partName", e)} name="Part" placeholder="Enter name" type="text"/>
                            <Input value={order.partCount} onChange={(e) => handleChange("partCount", e)} name="Count" placeholder="Enter count"/>
                            <Input value={order.op1} onChange={(e) => handleChange("op1", e)} name="OP1" placeholder="Enter minutes"/>
                            <Input value={order.op2} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => handleChange("op2", e)} name="OP2" placeholder="Enter minutes"/>
                            <Input value={order.time} onChange={(e) => handleChange("time", e)} name="Time" placeholder="Enter time in hours" />
                            <Input value={order.price} onChange={(e) => handleChange("price", e)} name="Price" placeholder="Enter final price" />
                        </div>
                        <div className="flex grow justify-end items-end gap-4 pl-4">
                            <input type="text" readOnly value={(order.partCount*order.op1*order.op2) > 0 ? `${(((parseInt(order.op1) + parseInt(order.op2)) * order.partCount)/60).toFixed(2)} H` : 0} className="input input-bordered input-accent w-full" />
                            <Button onClick={addDoc} text="+" type="btn-square text-2xl btn-accent" />
                        </div>
                    </div>
                </div>
                {success && <div className="pt-4"><Message success={true} text={`Order for ${order.customer} was added!`} /></div>}
                {failure && <div className="pt-4"><Message alert={true} text={`Please select customer!`} /></div>}
            </div>
        </div>
    </>
    )
}

export default AddOrderButton