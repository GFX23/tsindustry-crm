import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import Filter from "../components/Filter.Orders"
import AddOrder from "../components/AddOrder.Orders"
import AddCustomer from "../components/AddCustomer.Orders"
import { deleteItem, getInfo } from "../services/firebase.service"
import DeleteButton from "../components/DeleteButton.Table"
import UpdateOrder from "../components/UpdateOrder.Orders"
import UpdateButton from "../components/UpdateButton.Table"
import SortingButton from "../components/SortingButton"
import generatePDF from "../services/reportGenerator"
import PrintButton from "../components/PrintButton"

const Orders = () => {
  const [data, setData] = useOutletContext()
  const [displayList, setDisplayList] = useState([...data.orders])
  const [update, setUpdate] = useState(false)
  const [orderData, setOrderData] = useState({})
  const [itemId, setId] = useState("")

  const getTotal = (data, item) => {
    const totalReduce = data.reduce((total, current) => {
      return total += parseInt(current[item])
    }, 0)
    return totalReduce
  }

  const handleSort = (withWhat, ascending) => {
    const sorted = displayList.slice().sort((a, b) => {
      if (ascending) {
        if (a[withWhat] < b[withWhat]) {
          return -1;
        } else if (a[withWhat] > b[withWhat]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a[withWhat] < b[withWhat]) {
          return 1;
        } else if (a[withWhat] > b[withWhat]) {
          return -1;
        } else {
          return 0;
        }
      }
    })
    console.log(sorted)
    setDisplayList(sorted)
  }

  const handleDelete = (id) => {
    const newList = data.orders.filter(item => item.id !== id)
    deleteItem(id)
    return setData({ ...data, orders: newList })
  }

  const handleUpdate = async (id) => {
    setId(id)
    setOrderData(await getInfo("orders", id))
    setUpdate(true)
  }

  return (
    <div className="container flex flex-col p-4 w-full">
      <div className="divider m-0 pb-4">ORDERS LIST</div>
      <div className="flex flex-row justify-between">
        <Filter orderList={ data.orders } setDisplayList={ setDisplayList } />
        <div className="flex flex-row gap-4 pb-4">
          <PrintButton onClick={ () => generatePDF(displayList) } />
          <AddCustomer />
          <AddOrder />
        </div>
      </div>
      { update && <UpdateOrder setUpdate={ setUpdate } orderData={ orderData } id={ itemId } /> }
      <div className="overflow-x-auto">
        <table className="table table-zebra table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th><label className="flex gap-2">Date <SortingButton onClick={ handleSort } withWhat="date" /></label></th>
              <th><label className="flex gap-2">Customer <SortingButton onClick={ handleSort } withWhat="customer" /></label></th>
              <th><label className="flex gap-2">Order <SortingButton onClick={ handleSort } withWhat="orderNum" /></label></th>
              <th><label className="flex gap-2">Part name <SortingButton onClick={ handleSort } withWhat="partName" /></label></th>
              <th className="text-center"><label className="flex gap-2">Count <SortingButton onClick={ handleSort } withWhat="partCount" /></label></th>
              <th><label className="flex gap-2">Price <SortingButton onClick={ handleSort } withWhat="price" /></label></th>
              <th className="text-center">DELETE</th>
              <th className="text-center">UPDATE</th>
            </tr>
          </thead>
          <tbody>
            { displayList.map((item, idx) => {
              return (
                <tr className="hover" key={ idx }>
                  <th>{ idx }</th>
                  <td>{ item.date }</td>
                  <td>{ item.customer }</td>
                  <td>{ item.orderNum }</td>
                  <td>{ item.partName }</td>
                  <td>{ item.partCount }</td>
                  <td>{ item.price }</td>
                  <td className="text-center flex justify-center"><DeleteButton onClick={ () => handleDelete(item.id) } /></td>
                  <td className="text-center"><UpdateButton onClick={ () => handleUpdate(item.id) } /></td>
                </tr>
              )
            }) }
          </tbody>
        </table>
        <div className="flex flex-row justify-around">
          <p>TOTAL PART COUNT: {getTotal(displayList, "partCount")}</p>
          <p>TOTAL PRICE: {getTotal(displayList, "price")}</p>
        </div>
      </div>
    </div>
  )
}

export default Orders