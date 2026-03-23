import { useState } from "react"
import axios from "axios"
import { API_URL } from "../api"

function EditExpensePanel({ id, closeWindow, updateExpenses }: { id: number, closeWindow: () => void, updateExpenses: () => void }) {
    const token = localStorage.getItem('token')
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [tags, setTags] = useState("")
    const editExpense = async () => {
        const array_of_tags = tags.split(',').map(Number)
        try {
            const response = await axios.put(`${API_URL}/expenses/${id}`, {
                name: name,
                amount: amount,
                tag_ids: array_of_tags
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            updateExpenses()
            closeWindow()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="glass-panel modal-content">
                <h1>Edytuj wydatek ID: {id}</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input id="expenseName_0" type="text" placeholder="Nowa nazwa" value={name} onChange={(e) => setName(e.target.value)} />
                    <input id="expenseAmount_0" type="number" placeholder="Nowa kwota" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <input type="text" placeholder="Tagi (np. 1, 2, 4)" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button className="btn-primary" onClick={editExpense} style={{ flex: 1 }}>Zatwierdź</button>
                    <button onClick={closeWindow} className="btn-primary" style={{ flex: 1, background: '#374151' }}>Anuluj</button>
                </div>
            </div>
        </div>
    )
}

export default EditExpensePanel