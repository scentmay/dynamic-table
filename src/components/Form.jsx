import '../styles/Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../reducers/tableSlice.js'

const Form = () => {
    // const [search, setSearch] = useState("");
    // const [col, setCol] = useState("Nombre");
    // const dispatch = useDispatch();
    // const searchTerm = useSelector(state => state.searchTerm);
    // const handleSearch = (e) => dispatch(setSearchTerm(e.target.value));

    return (
        <div className="form-container">
            <form>
                <input
                    type="text"
                    id="search"
                    placeholder="búsqueda..."
                    // value={searchTerm}
                    // onChange={(e)=>handleSearch(e)}
                />
            </form>
        </div>
    );
}

export default Form;