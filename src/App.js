import './App.css';
import React  from 'react';
import {Routes , Route} from 'react-router-dom'
import Inicio from '../src/Paginas/inicio/inicio'
import CrearLatex from '../src/Paginas/crearLatex/crearLatex'
function App() {
  return (
    <div className='App'>
    <Routes>
      <Route path='/' element={<Inicio/>} />
      <Route path='/crearLatex' element={<CrearLatex/>} />
    </Routes>
    </div>
  );
}

export default App;