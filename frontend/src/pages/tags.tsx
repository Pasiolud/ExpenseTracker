import axios from 'axios'
import { API_URL } from '../api'
import { useEffect, useState } from 'react'
import "../../public/css/dashboard.css"

function TagsPage() {
    const [tags, setTags] = useState([])
    const [tagName, setTagName] = useState("")
    const token = localStorage.getItem('token')

    const getTags = async () => {
        try {
            const respone = await axios.get(`${API_URL}/tags`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTags(respone.data)
        } catch (error) {
            console.error(error)
        }
    }

    const addTag = async () => {
        try {
            const response = await axios.post(`${API_URL}/tags`, {
                name: tagName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getTags()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTags()
    }, [])

    return (
        <div className="main-content">
            <div className="dashboard-container">
                <header style={{ marginBottom: '2rem' }}>
                    <h1>Zarządzanie Tagami</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Dodawaj kategorie dla swoich wydatków</p>
                </header>

                <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Szybkie dodawanie</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input type="text" placeholder="Nazwa tagu" value={tagName} onChange={(e) => {
                            setTagName(e.target.value)
                        }} style={{ flex: 1 }} />
                        <button onClick={addTag} className="btn-primary">Dodaj</button>
                    </div>
                </div>

                <h2>Zdefiniowane Tagi</h2>
                <ul className="expense-list" style={{ marginTop: '1rem' }}>
                    {tags.map((tag: any) => {
                        return (
                            <li key={tag.id} className="glass-panel expense-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="expense-name">{tag.name}</span>
                                <span className="tag-badge" style={{ fontSize: '1rem' }}>ID: {tag.id}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default TagsPage