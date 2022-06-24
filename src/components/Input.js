import { forwardRef } from "react"

const TextInput = forwardRef(({placeholder, name, value, onChange, type, ...props}, ref) => {
    return (
        <div className="form-control">
            <label className="input-group">
                <span className="w-24">{name}</span>
                <input {...props} ref={ref} type={type ? type : "number"} placeholder={placeholder} value={value} onChange={onChange} className="input input-accent input-bordered w-48" />
            </label>
        </div>
    )
})

export default TextInput