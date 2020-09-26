import React, { useContext, useState } from 'react';
import AlertaContext from '../../context/alertas/alertaContext';
import {Row,Col} from 'reactstrap';
const AgregarUsuario = () => {

    const alertaContext = useContext(AlertaContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const [usuario, setUsuario] = useState({ 
        nombre: '',
        apellido: '', 
        email: '', 
        dni: '',
        galpon: '',
        cargo: '',
        password: '', 
        confirmarPassword: '' 
    });
    const { nombre, apellido, dni, galpon, cargo ,password, confirmarPassword } = usuario;

    const onChange = (e) => { 
        setUsuario({ 
            ...usuario, 
            [e.target.name]: e.target.value 
        }); 
    }    
    const onSubmit = (e) => {
        e.preventDefault();
        //VALIDAR
        console.log(usuario);       
        if (nombre.trim() === '' || apellido.trim() === '' || password.trim() === '' || confirmarPassword.trim() === '' || dni.trim() === ''|| cargo.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        if(!isNaN(nombre) || !isNaN(apellido)){
            mostrarAlerta('El nombre o apellido no puede ser numerico', 'alerta-error');
            return;
        }
        //VALIDAR PASSWORD MINIMO  
        if (password.length < 6) {
            mostrarAlerta('El password debe ser de al menos de 6 caracteres', 'alerta-error');
            return;
        }
        //VALIDAR PASSWORD IGUALES        
        if (password !== confirmarPassword) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }
        if (cargo === 'operario'){
            if(isNaN(galpon)){
                mostrarAlerta('Se debe proporcionar un galpon valido', 'alerta-error');
            return;
            }
        }

        console.log('aa')
        //ACTION 
        //console.log({ nombre, apellido, email, dni, cargo, password,galpon });       
        //registrarUsuario({ nombre, apellido, email, dni, cargo, password,galpon });
    }
    return ( 
            <>
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}
            <Row style={{display: 'flex', justifyContent: 'center'}}>
                <Col md={6}>
                    <div className="contenedor-observacion sombra-dark">
                        <h1>Formulario Agregar Usuario</h1>
                        <form
                            onSubmit={onSubmit}
                        >
                            <div className="campo-form">
                                <label htmlFor="nombre">Nombre</label>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    id="nombre"
                                    placeholder="Ingresa tu Nombre"
                                    value={nombre}
                                    onChange={onChange}
                                    required
                                    />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="apellido">Apellido</label>
                                <input 
                                    type="text" 
                                    name="apellido" 
                                    id="apellido"
                                    placeholder="Ingresa tu Apellido"
                                    value={apellido}
                                    onChange={onChange}
                                    required
                                    />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="dni">Dni</label>
                                <input 
                                    type="number" 
                                    name="dni" 
                                    id="dni"
                                    placeholder="Ingresa tu dni"
                                    value={dni}
                                    onChange={onChange}
                                    required
                                    />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    placeholder="Ingresa tu password"
                                    value={password}
                                    onChange={onChange}
                                    required
                                    />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="password">Confirmar Password</label>
                                <input 
                                    type="password" 
                                    name="confirmarPassword" 
                                    id="password"
                                    placeholder="Repite tu password"
                                    value={confirmarPassword}
                                    onChange={onChange}
                                    required
                                    />
                            </div>
                            <div className="campo-form">
                                <label htmlFor="cargo">Cargo</label>
                                <select 
                                    name="cargo"
                                    value={cargo}
                                    onChange={onChange}
                                    required
                                >
                                    <option value="">--Selecciona--</option>
                                    <option value="jefeproduccion">Jefe/a Produccion</option>
                                    <option value="admin">Administrador/a</option>
                                    <option value="operario">Operario/a</option>
                                    <option value="vendedor">Vendedor/a</option>
                                </select>
                            </div>
                            {(cargo==='operario')? (
                                <div className="campo-form">
                                    <label htmlFor="galpon">#N Galpon</label>
                                    <select 
                                        name="galpon"
                                        value={galpon}
                                        onChange={onChange}
                                        required
                                    >
                                        <option value="">--Selecciona--</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                    </select>
                                </div>
                            ):( null )}
                            <div className="campo-form">
                                <input 
                                    type="submit" 
                                    value="Agregar"
                                    className="btn btn-primario btn-block"
                                />
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
            </>
     );
}
 
export default AgregarUsuario;