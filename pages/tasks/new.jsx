import Link from 'next/link'
import { useEffect, useState } from 'react'
import FormularioTareas from '../../components/FormularioTareas'

export default () => {
    const [cliente, setCliente] = useState({})
    useEffect(() => {
        const trayendoCliente = () => {
            let x = JSON.parse(localStorage.getItem('cliente'))
            setCliente(x)
        }
        trayendoCliente()
    }, [])
    return (
         <>
      <h1 className="font-black text-4xl text-blue-900 m-6">Agregar una tarea</h1>
      <p className="mt-3 m-6">Utiliza este formulario para agregar una tarea</p>
      <div className="inline-flex items-center ml-8 px-1 py-1 text-lg font-medium text-center mt-10 text-white bg-orange-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-orange-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <Link href="/profile/[id]" as={`/profile/${cliente.id}`}>
                                Atras
                            </Link>
                        </div>
        <FormularioTareas/>
       
    </>
    )
}