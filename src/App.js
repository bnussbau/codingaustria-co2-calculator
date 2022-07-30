import logo from "./logo.svg";
import "./App.scss";
import CalculatorComponent from "./Component/Calculator/CalculatorComponent";
import Map from "./Component/Map/Map";
function App() {
  return (
    <div className="App">
      <CalculatorComponent />
      <Map />
    </div>
  );
}

export default App;
