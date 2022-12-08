import Link from "next/link"
import { useEffect, useState } from "react"
import Tarea from "./Tarea"

const ListadoTareas = ({ cliente }) => {
    const [leyendoCambios, setLeyendoCambios] = useState('')
    const [trayendoTareas, setTrayendoTareas] = useState([])
    const [tareasFiltradas, setTareasFiltradas] = useState([])
    const [tareaEditar, setTareaEditar] = useState({})
    useEffect(() => {
        const trayendoUsuarios = async () => {
          try {
            const pidiendoTareas = await fetch('http://localhost:3001/tasks')
            const respuesta = await pidiendoTareas.json()
            setTrayendoTareas(respuesta)
          } catch (error) {
            console.log(error)
          }
        }
        trayendoUsuarios()
      }, [leyendoCambios])

    useEffect(() => {
        let filtro = trayendoTareas.filter(element => element.personId == cliente.id)
        setTareasFiltradas(filtro)
    }, [leyendoCambios, trayendoTareas])

    // const eliminarAlgoDelArreglo = id => {
    //     let eliminandoGlobal = trayendoTareas.filter(element => element.id !== id)
    //     setTrayendoTareas(eliminandoGlobal)
    //     localStorage.setItem('tareas', JSON.stringify(trayendoTareas))
    

    return (
        <>
            <div className="container mx-auto ">
                    <div className="md:w-full lg:w-full md:h-screen overflow-y-scroll">
                        {tareasFiltradas.length > 0 ?
                            <>
                            <div className="md:flex">
                                <div className="grow h-14">
                                <h2 className="font-black text-3xl text-center">Listado de tareas</h2>
                                <p className="text-xl mt-5  mb-10 text-center" >Administra tus {""} <span className="text-indigo-600 font-bold">Tareas y agenda</span></p>
                                </div>
                          <div className="grow h-14">

                          </div>
                                <div className="grow h-10 inline-flex items-center px-3 mb-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <Link href="/tasks/new">
                                                Agregar Tarea
                                            </Link>
                                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </div>
                            </div>
                               
                                {tareasFiltradas.map(tarea => (
                                    <Tarea
                                        key={tarea.id}
                                        tarea={tarea}
                                        setLeyendoCambios={setLeyendoCambios}
                                        cliente={cliente}

                                    />
                                ))}
                            </> :
                            <>
                                <h2 className="font-black text-3xl text-center">No hay tareas</h2>
                                <p className="text-xl mt-5 mb-10 text-center" >Comienza agregando tareas {""}
                                    <span className="text-indigo-600 font-bold">aparecerán en este lugar</span>
                                </p>
                                <div className="text-center">
                                <div className="grow h-10 inline-flex  items-center px-3 mb-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <Link href="/tasks/new">
                                                Agregar Tarea
                                            </Link>
                                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </div>
                                </div>
                               
                            </>
                        }

                    </div>
                </div>

        </>
    )
                    }
export default ListadoTareas