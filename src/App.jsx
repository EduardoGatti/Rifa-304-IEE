import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PublicTable from "./components/PublicTable";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";
import useIndexedDB from "./db/indexDB";
import "./App.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Controle de login do admin
  const [numeros, setNumeros] = useIndexedDB(
    "rifaData",
    Array.from({ length: 151 }, (_, i) => ({ numero: i, comprador: "" }))
  );

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Rifa 304 IEE</h1>

          <Link to="/login" className="login-btn">
            Login Admin
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<PublicTable numeros={numeros} />} />
          <Route path="/login" element={<Login onLogin={() => setIsAdmin(true)} />} />
          <Route
            path="/admin"
            element={
              isAdmin ? (
                <AdminPage
                  numeros={numeros}
                  setNumeros={setNumeros}
                  isAdmin={isAdmin}
                />
              ) : (
                <div>Acesso Restrito. Faça login como Admin para acessar.</div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
