import './App.css';
import DynamicTable from './components/DynamicTable';

function App() {

  const data = [
    { Nombre: "Juan", Edad: 32, Ciudad: "París"},
    { Nombre: "Pablo", Edad: 25, Ciudad: "New York"},
    { Nombre: "Antonio", Edad: 17, Ciudad: "Madrid"},
    { Nombre: "Sara", Edad: 43, Ciudad: "Italia"},
    { Nombre: "Belén", Edad: 29, Ciudad: "Londres"}
  ];

  return (
    <div className="App">
      <DynamicTable data={data}/>
    </div>
  );
}

export default App;
