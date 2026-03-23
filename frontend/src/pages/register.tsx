import React, { useState } from "react"
import axios from "axios"
import { API_URL } from "../api"
import { useNavigate } from "react-router-dom"
import "../../public/css/auth.css"
const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleSubmition = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${API_URL}/register`, {
                email,
                password,
            })
            if (response.status === 200) {
                navigate('/login')
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (


        <div className="auth-container">
            <form onSubmit={handleSubmition} className="glass-panel auth-card auth-form">
                <h1 className="auth-title">Zarejestruj się</h1>
                <p className="auth-subtitle">Jakiś opis</p>
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="btn-primary">Zarejestruj się</button>
            </form>
        </div>
    )
}

export default RegisterPage 