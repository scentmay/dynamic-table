import '../styles/DynamicTable.css';
import { sortTable, toggleIdColumn, selectOrDeselectAll, selectRow, deselectRow, trashTable, setTableData, setPageSize, setPage, moveRow, setTotalItems } from '../reducers/tableSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const DynamicTable = ({ actionButtons }) => {
    const showIdColumn = useSelector(state => state.table.checked);
    const table = useSelector(state => state.table.table);
    const selectedRows = useSelector(state => state.table.selectedRows);
    const dispatch = useDispatch();
    const { page, pageSize, totalItems } = useSelector(state => state.table);

    // traemos variables de la URL 
    const params = useParams();
    const pg = params.page;
    const pgSize = params.pageSize;
    // console.log(pg, pgSize);



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
        event.dataTransfer.setData('text/plain', JSON.stringify(row)) ;
        console.log(event, row)
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    //index es el indice del elemento que está donde se va a soltar la fila, lo pasamos como position
    const handleDrop = (event) => {
        event.preventDefault();
        const data = JSON.parse(event.dataTransfer.getData('text/plain'));
        const targetIndex = Number(event.target.parentNode.id);
        console.log(event)
        console.log({ id: data.Id, position: targetIndex })
        dispatch(moveRow({ id: data.Id, position: targetIndex }));
    };


    // useEffect inicial, extrae datos de la URL y los posiciona en la store.
    // también cuenta el número de filas de la tabla y los setea como totalItems
    useEffect(() => {
        // console.log("entrando en fetch", pg, pgSize);
        if (pg == undefined || pgSize == undefined) {
            dispatch(setPage(1));
            dispatch(setPageSize(5));
        } else {
            dispatch(setPage(Number(pg)));
            dispatch(setPageSize(Number(pgSize)));
        }

        let totalRows = table.length;
        // console.log(totalRows);
        dispatch(setTotalItems(totalRows));
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
                                <tr key={index} id={index} draggable onDragStart={(event) => handleDragStart(event, row)}>
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