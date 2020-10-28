import React, { useContext , Fragment, useState, useEffect} from 'react';
import PedidoContext from '../../context/pedidos/pedidoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import TablaGestion from '../tablas/TablaGestion';
import { columnasEstadoPedidos } from '../util/Columnas';
import { Dialog, DialogContent} from '@material-ui/core';
import AuthContext from '../../context/autenticacion/authContext';
//import {moment} from 'moment';
/*const columns = [
    { id: 'codPedido', label: 'Codigo', minWidth: 100 },
    { id: 'descripcion', label: 'Descripcion', minWidth: 100 },
    { id: 'fechaEmision', label: 'Fecha Emision', minWidth: 100, format: (value) => value.format("DD-MM-YYYY") },
    { id: 'fechaProduccion', label: 'Fecha Produccion', minWidth: 100 },
    { id: 'fechaTerminado', label: 'Fecha Terminado', minWidth: 100 },
    
];*/
const EstadoPedidos = () => {
    //EXTRAIGO CONTEXT / FUNCIONES QUE SE CONECTAN CON EL BACKEND
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;
    const pedidoContext = useContext(PedidoContext); 
    const { pedidos, editarPedido ,obtenerPedidos} = pedidoContext;
    const authContext = useContext(AuthContext); 
    const {usuario, usuarioAutenticado} = authContext;
    //OBJETOS DE ESTADO (USE STATE)
    const [openPopup, setOpenPopup] = useState(false);
    const [pedido, setPedido] = useState(null);

    useEffect(() => {
        if(pedidos.length === 0){
            obtenerPedidos();
        }
    }, []);

    //FUNCIONES LOCALES
    const cerrarPopup = () => {
        setOpenPopup(false);
    };
    const activarCambiarEstado = (seleccionadoPedido) => {
        setPedido(seleccionadoPedido);
        console.log('Pedido seleccionado: '+ seleccionadoPedido);
        setOpenPopup(true);
    }
    const formatearFecha = (fecha1) => {
        var fecha = new Date(fecha1);
        return `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}`
    }
    const pasarProduccion = (e) => {
        if(usuario && usuario.cargo == 'operario'){
            if(usuario.galpon == '' || usuario.galpon.length == 0){
                mostrarAlerta('El operario no tiene un galpon asignado', 'alerta-error');
                return;
            }else{
                if(pedido.fechaProduccion === null){
                    pedido.fechaProduccion = new Date();
                    pedido.galpon = usuario.galpon;
                    editarPedido(pedido);
                    mostrarAlerta('El pedido ha sido pasado a produccion.'+formatearFecha(pedido.fechaProduccion), 'alerta-ok');
                    setOpenPopup(false);
                }else{
                    mostrarAlerta('Este pedido ya tiene fecha de produccion: '+formatearFecha(pedido.fechaProduccion), 'alerta-error');
                    setOpenPopup(false);
                    return;
                }
            }
        }else{
            mostrarAlerta('Solo un operario puede realizar el cambio de estado', 'alerta-error');
        }
    }
    const pasarTerminado = (e) => {
        if(usuario && usuario.cargo == 'operario'){
            if(usuario.galpon == '' || usuario.galpon.length == 0){
                mostrarAlerta('El operario no tiene un galpon asignado', 'alerta-error');
                return;
            }else{
                if(pedido.fechaTerminado === null && pedido.fechaProduccion !== null){
                    pedido.fechaTerminado = new Date();
                    editarPedido(pedido);
                    mostrarAlerta('El pedido ha sido pasado a Terminado.'+formatearFecha(pedido.fechaTerminado), 'alerta-ok');
                    setOpenPopup(false);
                }else{
                    if(pedido.fechaProduccion == null){
                        mostrarAlerta('Este pedido aun no fue pasado a produccion', 'alerta-error');
                        return;
                    }else{
                        mostrarAlerta('Este pedido ya tiene fecha de Terminado: '+formatearFecha(pedido.fechaTerminado), 'alerta-error');
                        setOpenPopup(false);
                        return;
        
                    }
                }
            }
        }else{
            mostrarAlerta('Solo un operario puede realizar el cambio de estado', 'alerta-error');
        }

    }
    //INTERFAZ DEL COMPONENTE
    if(pedidos.length === 0){return null;}
    return ( 
        <Fragment>
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}  
            <h1>CAMBIAR ESTADO PEDIDOS</h1>
            {/*
            <form className="buscador">
                <input 
                    type="text" 
                    className="input-text-buscador"
                    placeholder="Ingrese ID del pedido a cambiar estado"
                    id="contenido"
                
                />
                <button
                    type="submit"
                    className="btn btn-primario btn-submit btn-buscador"
                
                >Buscar 
                </button>
                <button
                    type="button"
                    className="btn btn-primario btn-submit btn-buscador"
            
                >Resetear 
                </button>
            </form>
            */}
            <TablaGestion
                columns={columnasEstadoPedidos}
                data={pedidos}
                type={'estadoPedido'}
                activarCambiarEstado={activarCambiarEstado}
            />
            <Dialog fullWidth={'sm'} maxWidth={'sm'} open={openPopup} onClose={cerrarPopup} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primario btn-block btn-custom"
                            name=""
                            onClick={pasarProduccion}
                        >
                            Pasar a Produccion
                        </button>
                        <button
                            type="button"
                            className="btn btn-primario btn-block btn-custom"
                            name=""
                            onClick={pasarTerminado}
                        >
                            Pasar a Terminado
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
     );
}
 
export default EstadoPedidos;