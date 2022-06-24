const Button = ({onClick, text, type}) => {
    return (
        <button onClick={onClick} className={`btn ${type} btn-outline`}>{text}</button>
    )
}

export default Button