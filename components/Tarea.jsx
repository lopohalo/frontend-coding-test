import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Link from "next/link"
const Tarea = ({tarea,setLeyendoCambios, cliente}) => {
  const [estado, setEstado] = useState('No completada')
  const [cambiando, setCambiando] = useState('')
  const { title,
    nombrePropietario,
    description, completed, startDate,endDate } = tarea

  const router = useRouter()

  useEffect(() => {
    setLeyendoCambios(cambiando)
  },[cambiando])
  const observandoComportamiento = async(tarea1) => { 
    console.log(tarea.completed)
    let obj
    if(tarea.completed == false){
      obj = {
        title: tarea1.title,
        nombrePropietario: tarea1.nombrePropietario,
        description: tarea1.description,
        completed:  true ,
        startDate: tarea1.startDate,
        endDate: tarea1.endDate,
        personId:  cliente.id
      }
    } else {
       obj = {
        title: tarea1.title,
        nombrePropietario: tarea1.nombrePropietario,
        description: tarea1.description,
        completed: false ,
        startDate: tarea1.startDate,
        endDate: tarea1.endDate,
        personId:  cliente.id
      }
    
    }
    const respuesta = await fetch(`http://localhost:3001/tasks/${tarea1.id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' }
  })
  await respuesta.json()
  setCambiando(respuesta)
   
console.log(obj)   
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
      <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <Link href="/tasks/[id]/edit" as={`/tasks/${tarea.id}/edit`}>
                                        Editar Tarea
                                    </Link>
                                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </div>
                                <div>
             <h1 className="font-bold">{completed == true ? 'Completada': <p className="text-sm">No Completada</p>}</h1>
          </div>
        <div className={completed == true ? "switch-button bg-green" : "switch-button bg-orange"}>
          
       
          <input type="checkbox" onClick={() => observandoComportamiento(tarea)} name={tarea.id} id={tarea.id} className="switch-button__checkbox" />
          <label htmlFor={tarea.id} className="switch-button__label"></label><br />
        
        </div>

        {/* <button type="button" onClick={HandleSubmitEliminar} className="font-bold text-white bg-red-500 hover:bg-red-700 uppercase py-2 px-10 rounded-lg">eliminar</button> */}
      </div>
    </div>
  )
}
export default Tarea