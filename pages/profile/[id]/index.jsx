import VistaCliente from '../../../components/vistaCliente'

export default () => {
    return (
         <>
         <div className='text-center'>
         <h1 className="font-black text-4xl text-blue-900 m-6">Perfil</h1>
      <p className="mt-3 m-6">Bienvenido a tu seccion de perfil y tareas</p>
         </div>

        <VistaCliente/>
    </>
    )
}