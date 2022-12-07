import { useState } from "react"
import { useRouter } from 'next/router'
const Tarea = ({ tarea, setTareaEditar, setTrayendoTareas, trayendoTareas,setLeyendoCambios }) => {
  const [estado, setEstado] = useState('No completada')
  const { title,
    nombrePropietario,
    description, completed, startDate,endDate } = tarea

  // const HandleSubmitEliminar = () => {
  //   const res = confirm('Are you sure you want')
  //   if (res == true) {
  //     eliminarAlgoDelArreglo(tarea.id)
  //   }
  // }
  const router = useRouter()
  const observandoComportamiento = async(tarea) => {
    console.log(tarea)
    let switchedBoton
    if (tarea.completed == false) {
      switchedBoton = trayendoTareas.filter(element => element.id == tarea.id ? tarea.completed = true : null)
      console.log(switchedBoton)
    } else {
      switchedBoton = trayendoTareas.filter(element => element.id == tarea.id ? tarea.completed = 'false' : null)
      console.log(switchedBoton)
    }
  
    switchedBoton = switchedBoton[0]
   
    let arregloNuevo = trayendoTareas.filter(element => element.id == tarea.id ? switchedBoton : element)
    const respuesta = await fetch(`http://localhost:3001/tasks/${tarea.id}`, {
      method: 'PUT',
      body: JSON.stringify(arregloNuevo),
      headers: { 'Content-Type': 'application/json' }
  })
  await respuesta.json()
  setLeyendoCambios('1')

    setEstado(!estado)
  }
  return (
    <div className="m-3 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {""}
        <span className="font-normal normal-case">{title}</span>
      </p>
      {nombrePropietario ? (
          <p className="font-bold mb-3 text-gray-700 uppercase">Propietario: {""}
          <span className="font-normal normal-case">{nombrePropietario}</span>
        </p>
      ):null}
    
      <p className="font-bold mb-3 text-gray-700 uppercase">Descripcion: {""}
        <span className="font-normal normal-case">{description}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">fecha de iniciacion: {""}
          <span className="font-normal normal-case">{startDate}</span>
        </p>
      {endDate ? (
        <p className="font-bold mb-3 text-gray-700 uppercase">fecha de finalizacion: {""}
          <span className="font-normal normal-case">{endDate}</span>
        </p>
      ) : null}

      <div className="flex justify-between mt-10">
        <button type="button" onClick={() => setTareaEditar(tarea)} className="font-bold text-white bg-indigo-500 hover:bg-indigo-700 uppercase py-2 px-10 rounded-lg">editar</button>
        <div className="switch-button">

          <input type="checkbox" onClick={() => observandoComportamiento(tarea)} name={tarea.id} id={tarea.id} className="switch-button__checkbox" />
          <label htmlFor={tarea.id} className="switch-button__label"></label><br />
          <h1 className="font-bold">{completed == "false" ? 'No completada' : 'Completada'}</h1>
        </div>

        {/* <button type="button" onClick={HandleSubmitEliminar} className="font-bold text-white bg-red-500 hover:bg-red-700 uppercase py-2 px-10 rounded-lg">eliminar</button> */}
      </div>
    </div>
  )
}
export default Tarea