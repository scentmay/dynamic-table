import '../styles/Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { filteredTable, resetTable } from '../reducers/tableSlice.js'
import { useState } from 'react';

const Form = () => {
    const [search, setSearch] = useState("");
    const [column, setColumn] = useState("")
    const dispatch = useDispatch();

    const handleSearch = e => {
        setSearch(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        // pasamos un objeto con las dos propiedades que nos interesan
        dispatch(filteredTable({
            "search": search,
            "column": column
        }));
    }

    const handleReset = () => {
        dispatch(resetTable());
    }

    const handleCol = e => {
        setColumn(e.target.value)
    }

    return (
        <div className="form-container">
            <form>
                <input
                    type="text"
                    id="search"
                    placeholder="búsqueda..."
                    value={search}
                    onChange={handleSearch}
                />
                <input 
                    type="text"
                    id="column"
                    placeholder="columna..."
                    value={column}
                    onChange={handleCol}
                />
                <button className="search-button" onClick={handleClick}>GO!</button>
                <button className="search-button" onClick={handleReset}>Reset Table</button>
            </form>
        </div>
    );
}

export default Form;