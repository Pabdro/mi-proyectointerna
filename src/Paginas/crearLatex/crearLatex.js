import React from 'react'
import './crearLatex.css';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import axios from 'axios';
import pdf from '../crearLatex/exercices.pdf'
const CrearLatex = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateLatex = async () => {
    try {
      setLoading(true);

      const response = await axios.post('http://localhost:3500/exercises/sentLatex', {
        ids: exercises.map(exercise => exercise._id)
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
        if (value <= data.exercises.length){        
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

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfAvailable, setPdfAvailable] = useState(false);
  const handleCreatePdf = async () => {
    try {
      setPdfLoading(true);
      await axios.post('http://localhost:3500/exercises/createPdf', {
        ids: ['645ab10d6864befe48a224a8'], // Ejemplo de arreglo de IDs
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
    loadExercises();
    handleCreatePdf();
  };

  const [pdfURL, setPdfURL] = useState(pdf);


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
        <div className="box">
        {/* <h1>Welcome to Geeks for Geeks</h1>
                <h3>Click on below link to open
                    PDF file in new tab</h3>
                <a href={pdf} target="_blank"
                    rel="noreferrer">
                    Open First PDF
                </a> */}
        </div>
        </div>
        <div className="contenedormaster">
        {pdfLoading ? (
          <p>Cargando PDF...</p>
        ) : (
          <button className="boton-izquierdo" onClick={handleDownloadPdf} disabled={!pdfAvailable}>
            Descargar PDF
          </button>
        )}
        <button onClick={handleCreateLatex} className="boton-izquierdo2">Descargar latex</button>
        <button onClick={handleSubtract} className='botonegativo'>-</button>
        <button onClick={handleButtonClick} className="boton-derecho">aleatorio: {value}</button>
        <button onClick={handleAdd} className='botonpositivo'>+</button>
        </div>
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
    )
}
export default CrearLatex