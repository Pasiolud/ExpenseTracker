import { useNavigate } from "react-router-dom"
import { API_URL } from "../api"
import { useEffect, useState } from "react"
import axios from 'axios'
import "../../public/css/dashboard_input.css"
import "../../public/css/dashboard.css"
import EditExpensePanel from "../components/edit_expense_panel"
const DashBoardPage = () => {
    const [exepnses, setExpenses] = useState([])
    const [inputText, setInputText] = useState("")
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [editId, setEditId] = useState(null)

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/expenses`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setExpenses(response.data)
        } catch (error) {
            console.error(error)
            navigate('/login')
            return;
        }
    }


    useEffect(() => {
        if (!token) {
            navigate('/login')
            return;
        }
        getData()

    }, [])

    const sendToAi = async () => {
        try {
            const response = await axios.post(`${API_URL}/aisummary`, {

                prompt: inputText
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getData()
        } catch (error) {
            console.log(error)
        }
        setInputText("")
    }


    const editExpense = async (id: number) => {
        try {
            const response = await axios.put(`${API_URL}/expenses/${id}`, {

                id: id,
                name: "",
                amount: "",
                tag_ids: []


            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    let edit_modal = null
    if (editId !== null) {
        edit_modal = <EditExpensePanel id={editId} closeWindow={() => setEditId(null)} updateExpenses={getData} />
    } else {
        edit_modal = null
    }

    return (
        <div className="main-content">
            <div className="dashboard-container">
                <header style={{ marginBottom: '2rem' }}>
                    <h1>Dashboard Finansowy</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Zarządzaj wydatkami z pomocą AI</p>
                </header>
                <div className="glass-panel ai-input-section">
                    <h3 style={{ marginBottom: '0.5rem' }}>Dodawanie Ai</h3>
                    <textarea
                        value={inputText}
                        id="dashboard_input"
                        className="ai-textarea"
                        placeholder="Napisz np: Kupiłem pizzę za 50zł"
                        rows={1}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = "auto";
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                        onChange={(e) => {
                            setInputText(e.target.value)
                        }}
                    />
                    <button onClick={sendToAi} className="btn-primary" style={{ alignSelf: 'flex-end', marginTop: '1rem' }}>
                        Analizuj i Dodaj
                    </button>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Twoje Wydatki</h2>
                    <ul className="expense-list">
                        {exepnses.map((expense: any) => (
                            <li key={expense.id} className="glass-panel expense-item">
                                <div className="expense-info">
                                    <span className="expense-name">{expense.name}</span>
                                    {expense.tags && (
                                        <div className="expense-tags">
                                            {expense.tags.map((tag: any) => (
                                                <span key={tag.id} className="tag-badge">{tag.name}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="expense-amount">
                                    {expense.amount} <span className="currency">PLN</span>
                                </div>
                                <button onClick={() => setEditId(expense.id)} className="btn-primary">Edytuj</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {edit_modal}
        </div>
    )
}

export default DashBoardPage
