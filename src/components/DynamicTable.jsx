import '../styles/DynamicTable.css';
import { sortTable } from '../reducers/tableSlice.js'
import { useSelector, useDispatch } from 'react-redux';

const DynamicTable = () => {
    const data = useSelector(state => state.table)
    const dispatch = useDispatch();
        const handleSort = (param) => dispatch(sortTable(param));
    
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
                        data.table.map((row, index) => {
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