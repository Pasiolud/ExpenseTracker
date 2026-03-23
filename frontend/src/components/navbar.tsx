import { useNavigate, Link } from 'react-router-dom';
import '../../public/css/navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => navigate('/dashboard')}>
                Nawigacja
            </div>

            <div className="nav-links">
                {token ? (
                    <>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        <Link to="/tags" className="nav-link">Tagi</Link>
                        <button onClick={handleLogout} className="logout-btn">
                            Wyloguj
                        </button>

                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Logowanie</Link>
                        <Link to="/register" className="nav-link">Rejestracja</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
