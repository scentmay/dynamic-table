import './App.css';
import DynamicTable from './components/DynamicTable';

function App() {

  const data = [
    { Nombre: "Juan", Edad: 32, Ciudad: "París"},
    { Nombre: "Pablo", Edad: 25, Ciudad: "New York"},
    { Nombre: "Antonio", Edad: 17, Ciudad: "Madrid"},
    { Nombre: "Sara", Edad: 43, Ciudad: "Roma"},
    { Nombre: "Belén", Edad: 23, Ciudad: "Londres"},
    { Nombre: "Patricia", Edad: 15, Ciudad: "Tokio"},
    { Nombre: "Jose", Edad: 24, Ciudad: "Singapur"},
    { Nombre: "Marta", Edad: 28, Ciudad: "Berlin"},
    { Nombre: "Adrián", Edad: 37, Ciudad: "Barcelona"}
  ];

  return (
    <div className="App">
      <h1><u>TABLA DINÁMICA</u></h1>
      <DynamicTable data={data}/>
    </div>
  );
}

export default App;
