import { useSelector, useDispatch } from 'react-redux';
import { setPage, setPageSize } from '../reducers/tableSlice.js';
import '../styles/pagination.css';

const Pagination = () => {
    const { page, pageSize, totalItems } = useSelector (state =>state.table);
    const table = useSelector(state => state.table.table);
    const dispatch = useDispatch();

    const handlePageChange = (newPage) => {
        dispatch(setPage(newPage));
    }

    const handlePageSizeChange = (newPageSize) => {
        dispatch(setPageSize(newPageSize));
    }

    // obtenemos nº de páginas en función de l paginación redondeando hacia arriba
    const totalPages = Math.ceil(totalItems/pageSize);

 
    return(
        <div className='pagination'>
            <button className="btn" onClick={() => handlePageChange(page-1)} disabled={page===1}>Anterior</button>
            <span className="span">{`${page} de ${totalPages}`}</span>
            <button className="btn" onClick={() => handlePageChange(page+1)} disabled={page===totalPages}>Siguiente</button>
            <select className="select" value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))}>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
        </div>
    );
}

export default Pagination;