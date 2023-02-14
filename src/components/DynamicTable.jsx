import '../styles/DynamicTable.css';
import { sortTable, toggleIdColumn, selectOrDeselectAll, selectRow, deselectRow, trashTable } from '../reducers/tableSlice.js'
import { useSelector, useDispatch } from 'react-redux';


const DynamicTable = ({ actionButtons }) => {
    const data = useSelector(state => state.table);
    const showIdColumn = useSelector(state => state.table.checked);
    const table = useSelector(state => state.table.table);
    const selectedRows = useSelector(state => state.table.selectedRows);
    const dispatch = useDispatch();

    console.log(selectedRows)


    const handleSort = (param) => dispatch(sortTable(param));
    const handleCheck = () => {
        dispatch(toggleIdColumn());
    }

    const handleSelectOrDeselectAll = () => {
        dispatch(selectOrDeselectAll());
    }

    const handleSelection = (index) => {
        dispatch(
            selectedRows.includes(index)
            ? deselectRow(index)
            : selectRow(index)
        )
    }

    const handletrash = () => {
        dispatch(trashTable());
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead className="table-head">
                    <tr>
                        <th><input 
                            type="checkbox"
                            checked={showIdColumn}
                            onChange={handleCheck}
                            >
                        </input>Id</th>
                        <th onClick={() => handleSort("Nombre")}>Nombre</th>
                        <th onClick={() => handleSort("Edad")}>Edad</th>
                        <th onClick={() => handleSort("Ciudad")}>Ciudad</th>
                        <th><input
                            type="checkbox"
                            onChange={handleSelectOrDeselectAll}
                            checked={selectedRows.length === table.length}
                        />
                        <button className="trashButton" onClick={handletrash} ><i className="fa-solid fa-trash fa-sm"></i></button>
                        </th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.table.map((row, index) => {
                            return (
                                <tr key={index}>
                                    {showIdColumn ? <td>{row.Id}</td> : <td>*****</td>}
                                    <td>{row.Nombre}</td>
                                    <td>{row.Edad}</td>
                                    <td>{row.Ciudad}</td>
                                    <td><input 
                                        type="checkbox"
                                        onChange={() => handleSelection(index)}
                                        checked={selectedRows.includes(index)}
                                        />
                                    </td>
                                    <td>{actionButtons}</td>
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