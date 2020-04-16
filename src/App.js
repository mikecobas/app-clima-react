import React, { Fragment, useState, useEffect } from "react";
import Header from "./componentes/Header";
import Formulario from "./componentes/Formulario";
import Clima from "./componentes/Clima";
import Error from "./componentes/Error";

function App() {
  // State del formulario

  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [ resultado, guardarResultado ] = useState({});

  const [consultar, guardarConsultar] = useState(false);

  const [error, guardarError] =  useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {

    const consultarAPI = async () => {
      const appid = "a491565a1f0e21db89ce8f3460493f42";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`;

      if (consultar) {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        // parsear errores de ciudades no encontradas

        if(resultado.cod === '404'){
          guardarError(true);
      
        }else{
          guardarError(false)
        }


      }
    };

    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados" />
  } else{
    componente = <Clima resultado={resultado} />
  } 
 
  return (
    <Fragment>
      <Header titulo="Clima" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                consultar={consultar}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
