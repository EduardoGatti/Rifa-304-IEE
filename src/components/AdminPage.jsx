import { useState } from "react";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";

function AdminPage({ numeros, setNumeros }) {
    const [roletaSpin, setRoletaSpin] = useState(false);
    const [numeroSorteado, setNumeroSorteado] = useState("0");
    const navigate = useNavigate();

    const girarRoleta = () => {
        if (roletaSpin) return;

        setRoletaSpin(true);
        let spinCount = 0;
        const totalSpins = 60;  // 100 giros
        const spinInterval = 100;  // Intervalo de 100ms entre os giros

        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * numeros.length);
            setNumeroSorteado(numeros[randomIndex].numero);
            spinCount++;

            if (spinCount >= totalSpins) {
                clearInterval(interval);
                setTimeout(() => {
                    const finalIndex = Math.floor(Math.random() * numeros.length);
                    setNumeroSorteado(numeros[finalIndex].numero);
                    setRoletaSpin(false);
                }, 100);
            }
        }, spinInterval);
    };

    const editarNumero = (index) => {
        const nome = prompt("Digite o nome do comprador:");
        if (nome) {
            setNumeros((prevNumeros) =>
                prevNumeros.map((item, i) =>
                    i === index ? { ...item, comprador: nome } : item
                )
            );
        }
    };

    const cancelarVenda = (index) => {
        setNumeros((prevNumeros) =>
            prevNumeros.map((item, i) =>
                i === index ? { ...item, comprador: null } : item
            )
        );
    };

    return (
        <div className="admin-container">
            <h2 className="admin-title">Área de Administração de Rifa - 304 IEE</h2>

            <div className="roleta-container">
                <p className="roleta-numero">{numeroSorteado}</p>
                <button
                    className="botao-girar"
                    onClick={girarRoleta}
                    disabled={roletaSpin}
                    type="button"
                >
                    {roletaSpin ? "Girando..." : "Girar Roleta"}
                </button>
            </div>

            <div className="admin-container">
                <h2 className="admin-title">Tabela de Rifa</h2>
                <div className="tabela-container">
                    <table className="tabela">
                        <tbody>
                            {numeros.map((item, index) => (
                                <tr key={item.numero}>
                                    <td>
                                        <div>
                                            {item.comprador
                                                ? `${item.numero} - ${item.comprador}`
                                                : item.numero}
                                        </div>
                                        <button
                                            className="botao-editar"
                                            onClick={() => editarNumero(index)}
                                            type="button"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="botao-cancelar"
                                            onClick={() => cancelarVenda(index)}
                                            type="button"
                                        >
                                            Cancelar Venda
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <button className="botao-cancelar" onClick={() => { navigate("/") }}>Sair</button>
        </div>
    );
}

export default AdminPage;
