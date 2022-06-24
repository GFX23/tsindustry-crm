const ButtonTooltip = ({name, text, onClick}) => {
    return (
        <div className="tooltip tooltip-accent tooltip-bottom" data-tip={name}>
            <button onClick={onClick} className="btn btn-square btn-accent border-2">{text}</button>
        </div>
    )
}

export default ButtonTooltip