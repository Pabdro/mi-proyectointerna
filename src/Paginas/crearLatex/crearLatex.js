import React from 'react'
import './crearLatex.css';
import { useState } from 'react';
// import useAxios from 'axios-hooks'
import axios from 'axios';
const CrearLatex = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateLatex = async () => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:3500/exercises/sentLatex', {
        ids: exercises.map(exercise => exercise._id)
      }, {
        responseType: 'blob' // Indicar que se espera una respuesta de tipo blob
      });
      const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', 'archivo.tex');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLoading(false);
    } catch (error) {
      setError('Error al crear el archivo .tex');
      setLoading(false);
    }
  };
    // const [{data}, refetch] = useAxios(
    //     {
    //         url: 'http://localhost:3500/exercises/',
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": 'application/json'
    //         }
    //     },
    //     {
    //         manual: true
    //     }
    // );
    const [exercises, setExercises] = useState([]);

  const loadExercises = () => {
    fetch('http://localhost:3500/exercises/')
      .then(response => response.json())
      .then(data => {
        const dataLength = data.exercises.length
        const randomIndex = Math.floor(Math.random() * dataLength)
        setExercises(data.exercises.slice(randomIndex, randomIndex + value));
      })
      .catch(error => {
        console.error('Error al cargar los ejercicios:', error);
      });
  };
    // const prueba = async () => {
    //     await refetch({
    //       ids: 
    //     })
    //     console.log(data)
    // }
    const [active, setActive] = useState(false);
    const handleClick = () => {
    setActive(!active);
    };
    const [active2, setActive2] = useState(false);
    const handleClick2 = () => {
        setActive2(!active2);
    };
    const [value, setValue] = useState(1);
    const handleSubtract = () => {
        if (value > 1) {
            setValue(value - 1);
        } else {
            setValue(value + 0)
        }
    };
    const handleAdd = () => {
        setValue(value + 1);
    };
    return (
    <div className="CrearLatex">
        <div className="button-bar">
        <button className={`toggle-button ${active ? 'active' : ''}`}onClick={handleClick}>Derivadas</button>
        <button className={`toggle-button ${active2 ? 'active' : ''}`}onClick={handleClick2}>Integrales</button>
        </div>
        <div className="container">
            <div className="box">
            {exercises.map(exercise => (
              <p key={exercise._id}>{exercise.problem}</p>
            ))}
        </div>
            <div className="box"></div>
        </div>
        <div className="contenedormaster">
        <button className="boton-izquierdo">Crear pdf</button>
        <button onClick={handleCreateLatex} className="boton-izquierdo2">Crear latex</button>
        <button onClick={handleSubtract} className='botonegativo'>-</button>
        <button onClick={loadExercises} className="boton-derecho">aleatorio: {value}</button>
        <button onClick={handleAdd} className='botonpositivo'>+</button>
        </div>
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
    )
}
export default CrearLatex