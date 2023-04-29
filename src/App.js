import './App.css';
import {Routes , Route} from 'react-router-dom'
import Inicio from '../src/Paginas/inicio/inicio'
function App() {
  return (
    <div classname='App'>
    <Routes>
      <Route path='/' element={<Inicio/>} />
    </Routes>
    </div>
  );
}

export default App;