
import { useOutletContext } from "react-router-dom"

const AddExcelOrders = () => {
    const [data] = useOutletContext()
    console.log(data)

    const editDoc = () => {
        data.orders.forEach(item => {
            //editData("orders", item.id, {...item, partCount: parseInt(partCount)})
            console.log({...item, partCount: parseInt(item.partCount)})
        })

    }

/*    const handleAdd = () => {
        const array = data.split("\n")
        const orderArray = array.map(order => order.split(";"))
        orderArray.map(order => order[0] = `${order[0].trim().substring(6,10)}-${order[0].trim().substring(3,5)}-${order[0].trim().substring(0,2)}`)
        orderArray.forEach(order => {
            const orderData = {
                date: order[0],
                customer: order[1],
                orderNum: order[2],
                partName: order[3],
                partCount: order[4],
                op1: "",
                op2: "",
                time: "",
                price: order[5]
            }
            console.log(orderData)
            //addData("orders", orderData)
        })
    }
*/

    return (
        <button className="btn btn-accent" onClick={editDoc}>OOOOOO</button>
    )
}

export default AddExcelOrders

