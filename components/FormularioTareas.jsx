import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from 'next/router'
import Alerta from "./Alerta"

const FormularioTareas = ({setTrayendoTareas, cliente,tareaEditar,setTareaEditar,setLeyendoCambios}) => {
    const [title, setNombre] = useState('')
    const [startDate, setfecha] = useState('')
    const [endDate, setendDate] = useState('')
    const [nombrePropietario, setNombrePropietario] = useState([])
    const [arregloPersonas, setArregloPersonas] = useState(['Hugo','Martín','Lucas','Mateo', 'Leo','Daniel','Alejandro','Pablo'])
    const [description, setdescripcion] = useState('')
    const [Alerta1 , setAlerta] = useState(false) 
const router = useRouter()
    const HandleSudmit = async (e) => {
        e.preventDefault()
        if([title, nombrePropietario,  description].includes('')){
            setAlerta(true)
            return;
        } 
        const generadoraID = () => {
            let random = Math.random().toString(36).substring(2);
            let fecha = Date.now().toString(36)
            return random + fecha;
        }
        const objeto_carta = {
            usuarioCreador: cliente.id,
            title,
            nombrePropietario,
            description,
            startDate,
            completed: false,
            endDate,
            personId: cliente.id
        }

        if(tareaEditar.id){
            objeto_carta.id = tareaEditar.id
            const respuesta = await fetch(`http://localhost:3001/tasks/${tareaEditar.id}`, {
                method: 'PUT',
                body: JSON.stringify(objeto_carta),
                headers: { 'Content-Type': 'application/json' }
            })
            await respuesta.json()
        } else {
            objeto_carta.id = generadoraID();
            const respuesta = await fetch(`http://localhost:3001/tasks`, {
                method: 'POST',
                body: JSON.stringify(objeto_carta),
                headers: { 'Content-Type': 'application/json' }
            })
            await respuesta.json()
        }
        setLeyendoCambios('1')
        setAlerta(false)
        setNombre("")
        setNombrePropietario('')
        setdescripcion("")
        setfecha("")
        setendDate('')
        setTareaEditar({})
      
    }
    useEffect(() => {
        if(Object.keys(tareaEditar).length > 0){
            setNombre(tareaEditar.title)
            setNombrePropietario(tareaEditar.nombrePropietario)
            setdescripcion(tareaEditar.description)
            setfecha(tareaEditar.startDate)
            setendDate(tareaEditar.endDate)
        }
    },[tareaEditar])
    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Tareas</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade tareas y {""}
                <span className="text-indigo-600 font-bold">Administralas</span>
            </p>
            {Alerta1 && <Alerta children={<p>Todos los Campos son obligatorios</p>} />}
            <form onSubmit={HandleSudmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre tarea</label>
                    <input id="mascota" type="text" value={title} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre Tarea" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Persona encargada</label>
                    <select id="propietario"  onChange={(e) => setNombrePropietario(e.target.value)}  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md">
                      {arregloPersonas.map(propietario => (
                        
                        <option key={propietario} value={propietario}>{propietario}</option>
                      ))
                      }
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">Fecha de iniciacion</label>
                    <input id="fecha" type="date" value={startDate} onChange={(e) => setfecha(e.target.value)}  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">Fecha de finalizacion (opcional)</label>
                    <input id="fecha" type="date" value={endDate} onChange={(e) => setendDate(e.target.value)}  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"/>
                </div>
           
                <div className="mb-5">
                    <label htmlFor="descripcion" className="block text-gray-700 uppercase font-bold">Descripcion</label>
                    <textarea className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="descripcion" value={description} onChange={(e) => setdescripcion(e.target.value)} placeholder="ej. Realizacion de un carrito..."></textarea>
                </div>
                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 transition-all" value= {tareaEditar.id ? "Editar tarea"  : "Agregar Tarea"} />
            </form>
        </div>
    )
}
export default FormularioTareas