import { useSelector, useDispatch } from 'react-redux';
import { setPage, setPageSize } from '../reducers/tableSlice.js';
import '../styles/pagination.css';
import { useNavigate } from 'react-router-dom';

const Pagination = () => {
    const { page, pageSize, totalItems } = useSelector (state =>state.table);
    const dispatch = useDispatch();

    //hook para actualizar la url al pasar página
    // navegamos hasta la url deseada y el hook useEffect de la tabla dinámica 
    //se va a encargar de recoger los datos para el nuevo rendereizado directamente
    // no hace falta usar dspatch(setPage(e))
    const navigate = useNavigate();

    const handlePageChange = (newPage) => {
        navigate(`/table/${newPage}/${pageSize}`)
    }

    const handlePageSizeChange = (newPageSize) => {
        navigate(`/table/${page}/${newPageSize}`)
    }

    // obtenemos nº de páginas en función de l paginación redondeando hacia arriba
    const totalPages = Math.ceil(totalItems/pageSize);




 
    return(
        <div className='pagination'>
            <button className="btn" onClick={() => handlePageChange(Number(page) - 1)} disabled={page===1}>Anterior</button>
            <span className="span">{`${page} de ${totalPages}`}</span>
            <button className="btn" onClick={() => handlePageChange(Number(page) + 1)} disabled={page===totalPages}>Siguiente</button>
            <select className="select" value={pageSize} onChange={(e) => handlePageSizeChange(Number(e.target.value))}>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
        </div>
    );
}

export default Pagination;