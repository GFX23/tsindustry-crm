import { Link } from "react-router-dom"

const NavButton = ({to, name, logo}) => {
    return (
        <Link to={to}>
            <button className="btn btn-accent w-40 gap-2">
                {logo}{name}
            </button>
        </Link>
    )
}

export default NavButton