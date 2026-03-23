import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../api"
import useAuthCheck from '../hooks/useAuthCheck'
import "../../public/css/auth.css"
const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useAuthCheck()

    const handleSubmition = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', email)
        formData.append('password', password)
        try {
            const response = await axios.post(`${API_URL}/login`, formData)
            if (response.status === 200) {
                const jwt_token = response.data.access_token
                localStorage.setItem('token', jwt_token)
                navigate('/dashboard')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmition} className="glass-panel auth-card auth-form">
                <h1 className="auth-title">Login</h1>
                <p className="auth-subtitle">Zaloguj się.</p>
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="btn-primary">Login</button>
            </form>
        </div>
    )
}

export default LoginPage