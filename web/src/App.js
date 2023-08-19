import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Table from "./theme/container/table";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
