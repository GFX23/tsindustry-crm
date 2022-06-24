import Navbar from "./Navbar"
import ButtonTooltip from "./ButtonTooltip"
import {ReactComponent as LogoutIcon} from "./icons/logout.svg"

const Header = ({setIsLoggedIn}) => {

    const logOut = () => {
        setIsLoggedIn(false)
    }

    return (
        <div className="navbar m-0 p-0">
        <div className="flex flex-row justify-between grow p-4">
        <Navbar />
        <ButtonTooltip onClick={logOut} name="Logout" text={<LogoutIcon />}/>
        </div>
        </div>
    )
}

export default Header