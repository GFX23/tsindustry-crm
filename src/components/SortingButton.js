import { useRef } from "react"

const SortingButton = ({onClick, withWhat}) => {
    const checkbox = useRef()


    return (
        <label className="swap" onClick={() => onClick(withWhat, checkbox.current.checked)}>
            <input ref={checkbox} type="checkbox" />
            <svg xmlns="http://www.w3.org/2000/svg" className="swap-on h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg> 
            <svg xmlns="http://www.w3.org/2000/svg" className="swap-off h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
        </label>
    )
}

export default SortingButton