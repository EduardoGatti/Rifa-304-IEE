import React from "react";

function PublicTable({ numeros }) {
  return (
    <div className="container">
      <h2 className="tabela-titulo">Tabela Pública da Rifa</h2>
      <table className="tabela">
        <tbody>
          {Array.from({ length: Math.ceil(numeros.length / 5) }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {numeros.slice(rowIndex * 5, (rowIndex + 1) * 5).map((item) => (
                <td key={item.numero} className={item.comprador ? "comprado" : ""}>
                  {item.comprador ? `${item.numero} - ${item.comprador}` : item.numero}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PublicTable;
