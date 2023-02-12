import './styles/App.css';
import './styles/header.css';
import DynamicTable from './components/DynamicTable';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <header>
        <Form />
      </header>
      <div className="content">
        <DynamicTable />
      </div>
    </div>
  );
}

export default App;
