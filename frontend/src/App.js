import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routingArray } from "./Services/routing";
import ToasterCollection from "./Components/Toasters/ToasterCollection";

function App() {
    return (
        <div className="App">
            <ToasterCollection />
            <Routes>
                {routingArray.map((curElem) => {
                    return <Route exact path={curElem.path} element={curElem.element} />;
                })}
            </Routes>
        </div>
    );
}

export default App;
