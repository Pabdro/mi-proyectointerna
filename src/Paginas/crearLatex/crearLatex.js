import React from 'react'
import './crearLatex.css';
import { useState } from 'react';
const CrearLatex = () => {
    const [active, setActive] = useState(false);
    const handleClick = () => {
    setActive(!active);
    };
    const [active2, setActive2] = useState(false);
    const handleClick2 = () => {
        setActive2(!active2);
        };
    return (
    <div className="CrearLatex">
        <div class="button-bar">
        <button className={`toggle-button ${active ? 'active' : ''}`}onClick={handleClick}>Derivadas</button>
        <button className={`toggle-button ${active2 ? 'active' : ''}`}onClick={handleClick2}>Integrales</button>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
    )
}
export default CrearLatex