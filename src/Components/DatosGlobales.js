import React, {useState, useEffect} from 'react';
//import 'bootstrap/dist/css/bootstrapcgr.css';
import "../assets/css/style.css";// ***
import imagenes from'../assets/imagenes'
//import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function DatosGlobales() {
    const baseUrl="http://localhost:4040/vacunas/";
    const [data, setData]=useState([]);
    const [contador, setContador]=useState(0);// ***
    const [PfizerTotal, setPfizerTotal]=useState(0);// ***
    const [ModernaTotal, setModernaTotal]=useState(0);// ***
    const [DosisAdmin, setDosisAdmin]=useState(0);// ***
    const [PersonasPauCom, setPersonasPauCom]=useState(0); // ***
    const peticionGet=async()=>{
      var Pfizer = 0;// *** 
      var Moderna = 0;// ***
      var Admin = 0;// ***
      var Personas = 0; // ***
        await axios.get(baseUrl)
        .then(response=>{
          setData(response.data);
          response.data.forEach(vac => { // *** 
            console.log(vac.dosis_entregadas_Pfizer); // *** 
            console.log(vac.dosis_entregadas_Moderna); // *** 
            Pfizer = Pfizer + vac.dosis_entregadas_Pfizer; // *** 
            Moderna = Moderna + vac.dosis_entregadas_Moderna; // *** 
            Admin = Admin + vac.dosis_administradas; // ***
            Personas = Personas + vac.personas_pauta_completa; // ***
          });

          //console.log(response.data);
          console.log(Pfizer); // *** 
          console.log(Moderna); // *** 
          console.log(Admin); // *** 
          console.log(Personas); // *** 

          setPfizerTotal(Pfizer); // *** 
          setModernaTotal(Moderna); // *** 
          setDosisAdmin(Admin); // ***
          setPersonasPauCom(Personas); // ***


        }).catch(error=>{
          console.log(error);
        })
      }

useEffect(()=>{
    peticionGet();
  },[])
  return (<div>
    <h2><b>Situación actual</b></h2>
          <img src={imagenes.img6} alt="img España"></img>
          <img src={imagenes.img7} alt="img Europa"></img>
          <img src={imagenes.img8} alt="img Mundo"></img>
          <div class="div1">
            <p>Dosis distribuidas</p>
            <p>{PfizerTotal + ModernaTotal}</p>
        </div>
        <div class="div1">
            <p>Dosis administradas</p>
            <p>{DosisAdmin}</p>
        </div>
        <div class="div1">
            <p>Personas pauta completa</p>
            <p>{PersonasPauCom}</p>
        </div>
    </div>
    

 





);
      


}
export default DatosGlobales;



  /* esto es lo que tenía Juan
  import React from 'react';

const Pricing = () => {
    return(
        <div className="App">
            <h1>Datos Globales</h1>
        </div>
    )
}

export default Pricing;*/