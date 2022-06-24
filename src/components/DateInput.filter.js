const DateInput = ({value, props, label, onChange}) => {
    return <input type="month" value={value} onChange={onChange} {...props} className="input input-accent input-bordered w-full max-w-xs" />
}

export default DateInput