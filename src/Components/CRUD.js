
//npm i bootstrap reactstrap axios sweetalert
import React, {useState, useEffect} from 'react';
//import 'bootstrap/dist/css/bootstrapcgr.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
//libreria para mejorar los alert   https://sweetalert.js.org/guides/
//npm install sweetalert --save
import swal from 'sweetalert';
function CRUD() {
    //direccion de la API
    const baseUrl="http://localhost:4040/vacunas/";//este /vacunas/ es el que está en el BACK/controller en RequestMapping
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [frameworkSeleccionado, setFrameworkSeleccionado]=useState({
      id_comunidad: '',
      nombre_comunidad: '',
      dosis_entregadas_Pfizer: '',
      dosis_entregadas_Moderna: '',
      dosis_administradas: '',
      personas_pauta_completa: ''
 
    });
  
    const handleChange=e=>{
      const {name, value}=e.target;
      setFrameworkSeleccionado((prevState)=>({
        ...prevState,
        [name]: value
      }))
      console.log(frameworkSeleccionado);
    }
  
    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }
  
    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }
  
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }
  
    const peticionGet=async()=>{
      
      await axios.get(baseUrl)
      .then(response=>{
        setData(response.data);
        //console.log(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }//peticionGet
  
    const peticionPost=async()=>{
      const Datos_Vacunas={ //*******
        nombre_comunidad:frameworkSeleccionado.nombre_comunidad,
        dosis_entregadas_Pfizer:frameworkSeleccionado.dosis_entregadas_Pfizer,
        dosis_entregadas_Moderna:frameworkSeleccionado.dosis_entregadas_Moderna,
        dosis_administradas:frameworkSeleccionado.dosis_administradas,
        personas_pauta_completa:frameworkSeleccionado.personas_pauta_completa
        
      };
      
      await axios.post(baseUrl+"insertar/", Datos_Vacunas)
      .then(response=>{
       
        //cerramos la ventana modal
        abrirCerrarModalInsertar();
        //refresco la tabla haciendo una peticion get
        peticionGet();
        
      }).catch(error=>{
        console.log(error);
      })
    }//peticionPost
  
    const peticionPut=async()=>{
      
      const Datos_Vacunas={
        nombre_comunidad:frameworkSeleccionado.nombre_comunidad,
        dosis_entregadas_Pfizer:frameworkSeleccionado.dosis_entregadas_Pfizer,
        dosis_entregadas_Moderna:frameworkSeleccionado.dosis_entregadas_Moderna,
        dosis_administradas:frameworkSeleccionado.dosis_administradas,
        personas_pauta_completa:frameworkSeleccionado.personas_pauta_completa
      };
      await axios.put(baseUrl+"modificar/"+frameworkSeleccionado.id_comunidad,Datos_Vacunas)
      .then(response=>{
        if (response.data!=null)
        {
         //swal("Good job!", "You clicked the button!", "success"); 
          swal("Perfecto!","Registro Modificado Satisfactoriamente","success");
         
          abrirCerrarModalEditar();
           //refresco la tabla haciendo una peticion delete
           peticionGet();
        }  
       
      }).catch(error=>{
        console.log(error);
      })
    }//peticionPut
  
    const peticionDelete=async()=>{
     
      axios.delete(baseUrl+"borrar/"+frameworkSeleccionado.id_comunidad).then(response=>{
      if (response.data!=null)
      {
        swal("Perfecto!","Registro borrado satisfactoriamente","success");
        abrirCerrarModalEliminar();
         //refresco la tabla haciendo una peticion delete
         peticionGet();
      }
      
       
      }).catch(error=>{
        console.log(error);
       
      })
    }//peticionDelete
  
    const seleccionarFramework=(framework, caso)=>{
      setFrameworkSeleccionado(framework);
  
      (caso==="Editar")?
      abrirCerrarModalEditar():
      abrirCerrarModalEliminar()
    }
  
    useEffect(()=>{
      peticionGet();
    },[])
  
    return (
      <div style={{textAlign: 'center'}}>
  <br />
        <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Nuevo</button>
        <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Cdad.autónoma</th>
            <th>Pfizer</th>
            <th>Moderna</th>
            <th>Administradas</th>
            <th>Personas_pauta_completa</th>
          </tr>
        </thead>
        <tbody>
        {console.log(data[0])}
          {data.map(framework=>(
            <tr key={framework.id}>
              {/*console.log(framework.ccaa)*/}
              {/* el nombre de los campos que vienen a continuacion tienes que ser
              los que nos devuelve el JSON. Fijate en como se llaman cuando te devuelve 
              haciendo una peticion get por la url http://localhost:4040/vacunacovid/
              [{"id_comunidad":1,"nombre_comunidad":"olmedo","dosis_entregadas_Pfizer":"10000"},
              {"id_comunidad":2,"nombre_comunidad":"mucientes","dosis_entregadas_Pfizer":"5000"},
              {"id_comunidad":3,"nombre_comunidad":"boecillo","dosis_entregadas_Pfizer":"2500"},
              {"id_comunidad":4,"nombre_comunidad":"cigales","dosis_entregadas_Pfizer":"3700"}]
  
              
              */}
              <td>{framework.id_comunidad}</td>
              <td>{framework.nombre_comunidad}</td>
              <td>{framework.dosis_entregadas_Pfizer}</td>
              <td>{framework.dosis_entregadas_Moderna}</td>
              <td>{framework.dosis_administradas}</td>
              <td>{framework.personas_pauta_completa}</td>
            <td>
            <button className="btn btn-primary" onClick={()=>seleccionarFramework(framework, "Editar")}>Modificar</button> 
            <button className="btn btn-danger" onClick={()=>seleccionarFramework(framework, "Eliminar")}>Borrar</button>
            </td>
            </tr>
          ))}
  
  
        </tbody> 
  
      </table>
  
  
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar datos vacunas</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>nombre_comunidad</label>
            <br />
            <input type="text" className="form-control" name="nombre_comunidad" onChange={handleChange}/>
            <br />
            <label>dosis_entregadas_Pfizer</label>
            <br />
            <input type="text" className="form-control" name="dosis_entregadas_Pfizer" onChange={handleChange}/>
            <br />
            <label>dosis_entregadas_Moderna</label>
            <input type="text" className="form-control" name="dosis_entregadas_Moderna" onChange={handleChange}/>
            <br />
            <label>dosis_administradas</label>
            <input type="text" className="form-control" name="dosis_administradas" onChange={handleChange}/>
            <br />
            <label>personas_pauta_completa</label>
            <input type="text" className="form-control" name="personas_pauta_completa" onChange={handleChange}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
  
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar vacunas</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>nombre_comunidad</label>
            <br />
            <input type="text" className="form-control" name="nombre_comunidad" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.nombre_comunidad}/>
            <br />
            <label>dosis_entregadas_Pfizer</label>
            <br />
            <input type="text" className="form-control" name="dosis_entregadas_Pfizer" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.dosis_entregadas_Pfizer}/>
            <br />
            <label>dosis_entregadas_Moderna</label>
            <br />
            <input type="text" className="form-control" name="dosis_entregadas_Moderna" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.dosis_entregadas_Moderna}/>
            <br />
            <label>dosis_administradas</label>
            <br />
            <input type="text" className="form-control" name="dosis_administradas" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.dosis_administradas}/>
            <br />
            <label>personas_pauta_completa</label>
            <br />
            <input type="text" className="form-control" name="personas_pauta_completa" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.personas_pauta_completa}/>
            <br />
            
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Modificar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
  
      <Modal isOpen={modalEliminar}>
          <ModalBody>
          ¿Estás seguro que deseas eliminar este dato*? {frameworkSeleccionado && frameworkSeleccionado.nombre_comunidad}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>
              Si
            </button>
            <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()} >
              No
            </button>
          </ModalFooter>
        </Modal>
  
      </div>
    );
  }
  
  export default CRUD;