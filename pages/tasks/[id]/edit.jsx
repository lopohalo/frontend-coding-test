import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import FormularioTareas from '../../../components/FormularioTareas'


export default () => {
    const [tarea, setTarea] = useState({})
    const [cargando, setcargando] = useState(false)
    const router = useRouter()
    const { id } = router.query
    console.log(id)
    useEffect(() => {
        console.log(id)
        setcargando(!cargando)
        const obtener = async () => {
            try {
                let respuesta = await fetch(`http://localhost:3001/tasks/${id}`)
                respuesta = await respuesta.json()
                setTarea(respuesta)
            } catch (error) {
                console.log(error)
            }
            setcargando(false)
        }
        obtener()
    }, [id])





    return (

         <>
      <h1 className="font-black text-4xl text-blue-900 m-6">Formulario Tareas</h1>
      <p className="mt-3 m-6">Utiliza este formulario para editar o agregar tus tareas</p>
      {tarea ? (
        <FormularioTareas
          tarea={tarea}
          setTarea={setTarea}
        />
        
      ) : 'No se encontro Usuario'}

    </>
    )
}