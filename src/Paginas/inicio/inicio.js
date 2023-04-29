import React from 'react'
import {Link} from "react-router-dom";
import './inicio.css';

const Inicio = () => {
    return (
    <div className="Inicio">
        <br/><br/><br/>
        <h1 className='titulo'>Aplicacion interna</h1>
        <div className='cajabotones'>
        <Link to = "/signin">
        <button  type="button" class="boton"><b>Crear latex</b>
        </button>
        </Link>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
    )
}
export default Inicio