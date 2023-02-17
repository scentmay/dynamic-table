import '../styles/DynamicTable.css';
import { sortTable, toggleIdColumn, selectOrDeselectAll, selectRow, deselectRow, trashTable, setTableData, setPageSize, setPage } from '../reducers/tableSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


const DynamicTable = ({ actionButtons }) => {
    const showIdColumn = useSelector(state => state.table.checked);
    const table = useSelector(state => state.table.table);
    const selectedRows = useSelector(state => state.table.selectedRows);
    const dispatch = useDispatch();
    const { page, pageSize, totalItems } = useSelector (state =>state.table);

    // console.log(selectedRows)

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

    // Calcula qué elementos se deben mostrar en la página actual
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems); 
    const items = useSelector(state => table.slice(startIndex, endIndex))
   

    useEffect(() => {
        //solicitud http para obtener los elementos de la página
        console.log("entrando en fetch")
        fetch(`http://localhost:3000/table?page=${page}&pageSize=${pageSize}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                dispatch(setPage(data.page));
                dispatch(setPageSize(data.pageSize));
            })
    }, [page, pageSize, dispatch]);


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
                        items.map((row, index) => {
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