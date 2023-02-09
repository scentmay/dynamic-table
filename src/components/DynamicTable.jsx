import '../styles/DynamicTable.css';
import React from 'react';

const DynamicTable = (props) => {
    return(
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Ciudad</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((row, index) => {
                        return(
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
    );
}

export default DynamicTable;