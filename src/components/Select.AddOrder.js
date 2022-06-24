import { forwardRef } from "react"

const Select = forwardRef(({onChange, value, customersList}, ref) => {
    const customers = customersList.map(customer => customer.name)
    const options = customers.map((customer, idx) => <option key={idx} idx={idx} value={customer}>{customer}</option>)
    return (
        <div>
            <select ref={ref} onChange={onChange} value={value} className="select select-accent w-72 max-w-xs">
                <option value="" disabled>Select customer</option>
                {options}
            </select>
        </div>
    )
})

export default Select