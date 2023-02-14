import './styles/App.css';
import './styles/header.css';
import DynamicTable from './components/DynamicTable';
import Form from './components/Form';

function App() {


  const actionButtons = (
    <>
      <button>Borrar</button>
      <button style={{marginLeft: "3px"}}>Editar</button>
    </>
  );

  return (
    <div className="App">
      <header>
        <Form />
      </header>
      <div className="content">
        <DynamicTable actionButtons={actionButtons}/>
      </div>
    </div>
  );
}

export default App;
