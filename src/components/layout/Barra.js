import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext';

const Barra = () => {

    const authContext = useContext(AuthContext); 
    const {usuario, usuarioAutenticado, cerrarSesion} = authContext;
    
    /* useEffect(() => {
        usuarioAutenticado();
    }, []); */
    
    return ( 
        <header className="app-header">
            {
            //usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null
            }
            <p className="nombre-usuario">Hola <span> Jorge!</span></p>
            <nav className="nav-principal">
                <button
                    onClick={()=> cerrarSesion()}
                    className="btn btn-blank cerrar-sesion"
                >Cerrar Sesion</button>
            </nav>
        </header>
     );
}
 
export default Barra;