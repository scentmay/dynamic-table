import '../styles/DynamicTable.css';
import { sortTable, toggleIdColumn, selectOrDeselectAll, selectRow, deselectRow, trashTable, setTableData, setPageSize, setPage, moveRow } from '../reducers/tableSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const DynamicTable = ({ actionButtons }) => {
    const showIdColumn = useSelector(state => state.table.checked);
    const table = useSelector(state => state.table.table);
    const selectedRows = useSelector(state => state.table.selectedRows);
    const dispatch = useDispatch();
    const { page, pageSize, totalItems } = useSelector (state =>state.table);
    
    // traemos variables de la URL 
    const params = useParams();
    const pg = params.page;
    const pgSize = params.pageSize;
    console.log(pg, pgSize);

  

    //funciones de funcionamiento de la tabla, búsqueda, ordenación reseteo, checks...
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
   
    // funciones para el arrastre de filas
    const handleDragStart = (event, row) => {
        event.dataTransfer.setData('text/plain', JSON.stringify(row));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (event, index) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData('text/plain'));
        dispatch(moveRow(data.id));
        console.log (data)
    };


    // useEffect inicial, extrae datos de la URL y los posiciona en la store
    useEffect(() => {
        //solicitud http para obtener los elementos de la página
        console.log("entrando en fetch")
        dispatch(setPage(Number(pg)));
        dispatch(setPageSize(Number(pgSize)));
    }, [pg, pgSize]);

    return (
        <div className="table-container">
            <table className="table" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event)}>
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
                                <tr key={row.id} draggable onDragStart={(event) => handleDragStart(event,row) }>
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