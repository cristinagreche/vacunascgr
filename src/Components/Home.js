import React from 'react';
//para trabajar con imagenes
//primero la tengo que importar de dnde esta
import imagenes from'../assets/imagenes'
const inicio = () => {
    return(
        <div className="App">
            <br/>
            <img src={imagenes.img5} alt="img usuarios" class="imagen" height="400"></img>
            
            <h1>Informe Covid por CCAA </h1>
            <h1>Cristina González Reche</h1>
        </div>
    )
}

export default inicio;