import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { API_URL } from "../api"
import axios from "axios"



const useAuthCheck = () =>{
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const check_token = async () =>{
                try{
                    const response = await axios.get(`${API_URL}/tokenCheck`,{
                    headers :{
                        Authorization: `Bearer ${token}`}
                    })
                    navigate("/dashboard")
                    return;
                }catch(error){
                    console.error(error)
                    localStorage.removeItem('token') 
                }
            }
            check_token()      
        }
    }, [])
}

export default useAuthCheck;