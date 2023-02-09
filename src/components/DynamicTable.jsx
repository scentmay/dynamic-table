import '../styles/DynamicTable.css';
import React, { useState } from 'react';

const DynamicTable = (props) => {
    const [table, setTable] = useState(props.data);
    const [order, setOrder] = useState("");

    // función para ordenar la tabla en función de donde se haya pulsado (param)
    // se actualiza el estado con la nueva ordenación y se renderiza en pantalla
    const handleSort = (param) => {
        setOrder(param);
        setTable(
            table.sort((a, b) => {
                if (a[param] < b[param]) return -1;
                if (a[param] > b[param]) return 1;
                return 0;
            })
        );
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead className="table-head">
                    <tr>
                        <th onClick={() => handleSort("Nombre")}>Nombre</th>
                        <th onClick={() => handleSort("Edad")}>Edad</th>
                        <th onClick={() => handleSort("Ciudad")}>Ciudad</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{row.Nombre}</td>
                                    <td>{row.Edad}</td>
                                    <td>{row.Ciudad}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>

    );
}

export default DynamicTable;