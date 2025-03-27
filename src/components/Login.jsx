import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"
function Login({ onLogin }) {
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (senha === "304iee@2025") {
      onLogin();
      navigate("/admin"); // Redireciona para a página de administração
    } else {
      alert("Senha incorreta!");
    }
  };

  return (
    <div className="login-container">
      <h2>Administração de Sorteios IEE - Acesso 304</h2>
      <input
        type="password"
        placeholder="Insira sua senha:"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Logar-se</button>
      <button className="botao-cancelar" onClick={() => { navigate("/") }}>Sair</button>

    </div>
  );
}

export default Login;
