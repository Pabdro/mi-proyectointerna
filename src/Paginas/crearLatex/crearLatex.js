import React from 'react'
import './crearLatex.css';
import { useState } from 'react';
import axios from 'axios';
import pdf from '../crearLatex/exercices.pdf'
import ojo from '../../assets/eye-svgrepo-com.svg'
import ojocerrado from '../../assets/eye-closed-bold-svgrepo-com.svg'
const CrearLatex = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateLatex = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3500/exercises/sentLatex', {
        // ids: exercises.map(exercise => exercise._id)
        ids: active ? exercises2.map(exercise => exercise._id) : active2 ? exercises3.map(exercise => exercise._id) : exercises.map(exercise => exercise._id)
      }, {
        responseType: 'blob'
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

  const [exercises, setExercises] = useState([]);
  const loadExercises = () => {
    fetch('http://localhost:3500/exercises/')
      .then(response => response.json())
      .then(data => {
        if (value <= data.exercises.length) {
          const selectedExercises = [];
          while (selectedExercises.length < value) {
            const randomNumber = data.exercises[Math.floor(Math.random() * data.exercises.length)];
            if (!selectedExercises.includes(randomNumber)) {
              selectedExercises.push(randomNumber);
            }
          }
          setExercises(selectedExercises);
        } else {
          alert("No hay mas ejercicios, por favor elegir un número mas bajo");
        }
      })
      .catch(error => {
        console.error('Error al cargar los ejercicios:', error);
      });
  };

  const [exercises2, setExercises2] = useState([]);
  const loadDerivadas = () => {
    fetch('http://localhost:3500/exercises/allDerivadas')
      .then(response => response.json())
      .then(data => {
        if (value <= data.exercises.length) {
          const selectedExercises = [];
          while (selectedExercises.length < value) {
            const randomNumber = data.exercises[Math.floor(Math.random() * data.exercises.length)];
            if (!selectedExercises.includes(randomNumber)) {
              selectedExercises.push(randomNumber);
            }
          }
          setExercises2(selectedExercises);
        } else {
          alert("No hay mas ejercicios, por favor elegir un número mas bajo");
        }
      })
      .catch(error => {
        console.error('Error al cargar los ejercicios:', error);
      });
  };

  const [exercises3, setExercises3] = useState([]);
  const loadIntegrales = () => {
    fetch('http://localhost:3500/exercises/allIntegrales')
      .then(response => response.json())
      .then(data => {
        if (value <= data.exercises.length) {
          const selectedExercises = [];
          while (selectedExercises.length < value) {
            const randomNumber = data.exercises[Math.floor(Math.random() * data.exercises.length)];
            if (!selectedExercises.includes(randomNumber)) {
              selectedExercises.push(randomNumber);
            }
          }
          setExercises3(selectedExercises);
        } else {
          alert("No hay mas ejercicios, por favor elegir un número mas bajo");
        }
      })
      .catch(error => {
        console.error('Error al cargar los ejercicios:', error);
      });
  };

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

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfAvailable, setPdfAvailable] = useState(false);
  const handleCreatePdf = async () => {
    try {

      setPdfLoading(true);
      await axios.post('http://localhost:3500/exercises/createPdf', {
        ids: active ? exercises2.map(exercise => exercise._id) : active2 ? exercises3.map(exercise => exercise._id) : exercises.map(exercise => exercise._id)
      });
      setPdfAvailable(true);
      setPdfLoading(false);
    } catch (error) {
      console.log(error);
      setPdfLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      setPdfLoading(true);
      const response = await axios.get('http://localhost:3500/exercises/downloadPdf', {
        responseType: 'arraybuffer', // Establece el tipo de respuesta como un arraybuffer
      });
      setPdfLoading(false);

      // Crea un Blob con los datos recibidos del backend
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

      // Crea una URL del objeto Blob para descargar el PDF
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Crea un enlace temporal y haz clic en él para descargar el PDF
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'ejercicios.pdf';
      link.click();
    } catch (error) {
      console.log(error);
      setPdfLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (active && active2) {
      alert('Por favor elegir solo una opcion o ninguna opcion')
    } else if (active) {
      console.log("Derivadas")
      loadDerivadas();
      handleCreatePdf();
    } else if (active2) {
      console.log("Integrales")
      loadIntegrales();
      handleCreatePdf();
    } else if (!active && !active2) {
      loadExercises();
      handleCreatePdf();
    }
    console.log(exercises2)
  };

  return (
    <div className="CrearLatex">
      <div className="button-bar">
        <button className={`toggle-button ${active ? 'active' : ''}`} onClick={handleClick}>Derivadas</button>
        <button className={`toggle-button ${active2 ? 'active' : ''}`} onClick={handleClick2}>Integrales</button>
      </div>
      <div className="container">
        <div className="box">
          {!active && !active2 ? (
            exercises.map(exercise => (
              <p key={exercise._id}>{exercise.problem}</p>
            ))
          ) : active ? (
            exercises2.map(exercise => (
              <p key={exercise._id}>{exercise.problem}</p>
            ))
          ) : (
            exercises3.map(exercise => (
              <p key={exercise._id}>{exercise.problem}</p>
            ))
          )}
        </div>
        <div className="box2">
          <br/> <br/>
          <div className="contenedormaster">
        {pdfLoading ? (
          <p>Cargando PDF...</p>
        ) : (
          <button className="boton-izquierdo" onClick={handleDownloadPdf} disabled={!pdfAvailable}>
            Descargar PDF
          </button>
        )}
        {pdfAvailable ? (
          <a href={pdf} target="_blank" rel="noreferrer">
            <img src={ojo} alt="Ver pdf" className="ver-pdf-icon" />
          </a>
        ) : (
          <img src={ojocerrado} alt="Ver pdf" className="ver-pdf-icon" />
        )}   
        {pdfLoading ? (
          <p>Cargando latex...</p>
        ) : (
          <button onClick={handleCreateLatex} disabled={!pdfAvailable} className="boton-izquierdo2">Descargar latex</button>
        )}
      </div>
      <br/>
      <div className="contenedormaster">
        <button onClick={handleSubtract} className='botonegativo'>-</button>
        <button onClick={handleButtonClick} className="boton-derecho">aleatorio: {value}</button>
        <button onClick={handleAdd} className='botonpositivo'>+</button>
      </div>
      </div>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <br /><br />
    </div>
  )
}
export default CrearLatex