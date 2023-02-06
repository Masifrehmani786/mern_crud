import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbaar from './components/Navbaar';
import Home from './components/Home';
import Register from './components/Register';
import {BrowserRouter  as Router,Routes, Route} from "react-router-dom"
import Edit from './components/Edit';
import Detail from './components/Detail';
import Display from './Display';

function App() {
  return (
    <>
      <Router>
      <Navbaar />
     
      <Routes>
        <Route  exact path="/" element={<Home/>} />
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/edit/:id" element={<Edit/>}/>
        <Route exact path="/view/:id" element={<Detail/>}/>
        </Routes> 
        </Router> 
        </>
    

  );
}

export default App;
