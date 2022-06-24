import {useState} from "react"
import logo from "../logo/print_transparent.svg"
import Message from "./Message"
import { auth } from "../services/firebase.service"
import { signInWithEmailAndPassword } from "firebase/auth"

const Login = ({setIsLoggedIn}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [failed, setFailed] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await signInWithEmailAndPassword(auth, username, password)
            console.log(user)
            setIsLoggedIn(true)
        } catch (error) {
            setFailed(true)
            setTimeout(() => {
                setFailed(false)
            },3000)
        }
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                <img className="mx-auto h-40 w-auto" src={logo} alt="TS INDUSTRY"/>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Please sign in to your account</h2>
                </div>
                <form  onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm -space-y-px">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
                </div>
                <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign in
                    </button>
                </div>
                </form>
                {failed ? <Message alert={true} text="Incorrect username or password!"/> : ""}
            </div>
        </div>
    )   
}

export default Login