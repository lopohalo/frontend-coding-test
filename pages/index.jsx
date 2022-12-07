import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'
import Cliente from '../components/Cliente'

function HomePage() {
  const [clientes, setCliente] = useState([])
  useEffect(() => {
    const trayendoUsuarios = async () => {
      try {
        const pidiendoUsuarios = await fetch('http://localhost:3001/people')
        const respuesta = await pidiendoUsuarios.json()
        respuesta.sort((a, b) => a.age - b.age )
        setCliente(respuesta)
      } catch (error) {
        console.log(error)
      }
    }
    trayendoUsuarios()
  }, [])


  return (
    <>
      <h1 className="font-black text-4xl ml-10 mt-5  text-blue-900">Clientes</h1>
      <p className="mt-5 ml-10 ">Administra  tus clientes</p>
      <div className="bg-blue-600 hover:bg-blue-700 block w-32 mb-3 text-white rounded-md text-center m-auto   p-2 uppercase font-bold text-lg">
          <Link href="/nuevoCliente"  type="button" > Agregar Usuario</Link>
        </div>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Imagen</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Nickname</th>
            <th className="p-2">Genero</th>
            <th className="p-2">Ocupacion</th>
            <th className="p-2">Acciones</th>

          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}
export default HomePage