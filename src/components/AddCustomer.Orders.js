import { useState } from "react"
import { addData } from "../services/firebase.service"
import { useOutletContext } from "react-router-dom"
import { ReactComponent as UserAddIcon } from "./icons/user-add.svg"
import Input from "./Input"
import Button from "./Button"
import Message from "./Message"

const AddCustomer = () => {
    const [data, setData] = useOutletContext()
    const [customerName, setCustomerName] = useState("")
    const [hourRate, setHourRate] = useState("")
    const [success, setSuccess] = useState(false)

    const addCustomer = () => {
        const customer = {
            name: customerName,
            hourRate
          }
          addData("customers", customer)
          setSuccess(true)
          setTimeout(() => {
              setSuccess(false)
          }, 3000)
          setCustomerName("")
          setHourRate("")
          return setData({...data, customers: [...data.customers, {...customer}]})
    }

    return (
        <>
            <label htmlFor="my-modal-5" className="btn modal-button btn-square btn-accent border-2 text-2xl"><UserAddIcon /></label>
            <input type="checkbox" id="my-modal-5" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-max flex flex-col p-4">
                    <label htmlFor="my-modal-5" className="btn btn-sm btn-circle btn-error btn-outline absolute right-4 top-4">x</label>
                    <div className="flex flex-row">
                    <div className="flex flex-col gap-4">
                        <h2>Enter customer details:</h2>
                        <Input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} name="Name" placeholder="Enter name"/>
                        <Input value={hourRate} onChange={(e) => setHourRate(e.target.value)} name="Rate" placeholder="Enter hour rate"/>
                    </div>
                    <div className="flex grow pl-4 items-end">
                        <Button onClick={addCustomer} text="+" type="btn-square btn-accent text-2xl" />
                    </div>
                    </div>
                    {success && <div className="pt-4"><Message success={true} text={`Customer ${data.customers[data.customers.length-1].name} was added`} /></div>}
                </div>
            </div>
        </>
    )
}

export default AddCustomer