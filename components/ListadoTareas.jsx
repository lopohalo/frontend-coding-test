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
            <div className="container mx-auto mt-10">
                    <div className="md:w-full lg:w-full md:h-screen overflow-y-scroll">
                        {tareasFiltradas.length > 0 ?
                            <>
                                <h2 className="font-black text-3xl text-center">Listado de tareas</h2>
                                <p className="text-xl mt-5 mb-10 text-center" >Administra tus {""} <span className="text-indigo-600 font-bold">Tareas y agenda</span></p>
                                {tareasFiltradas.map(tarea => (
                                    <Tarea
                                        key={tarea.id}
                                        tarea={tarea}
                                        setTareaEditar={setTareaEditar}
                                        setTrayendoTareas={setTrayendoTareas}
                                        trayendoTareas={trayendoTareas}
                                        setLeyendoCambios={setLeyendoCambios}

                                    />
                                ))}
                            </> :
                            <>
                                <h2 className="font-black text-3xl text-center">No hay tareas</h2>
                                <p className="text-xl mt-5 mb-10 text-center" >Comienza agregando tareas {""}
                                    <span className="text-indigo-600 font-bold">aparecerán en este lugar</span>
                                </p>

                            </>
                        }

                    </div>
                </div>

        </>
    )
                    }
export default ListadoTareas