export const columnasPedidos = [
    { title: 'id', field: 'idpedido',},
    {
      title: 'Codigo', field: 'codPedido',editable: 'never', validate: rowData => rowData.codPedido === '' ?
        { isValid: false, helperText: 'Codigo no puede estar vacio' } : true
    },
    { title: 'Descripcion', field: 'descripcion', },
    {
        title: 'Cliente', field: 'cliente', validate: rowData => rowData.cliente === '' ?
          { isValid: false, helperText: 'cliente no puede estar vacio' } : true
    },
    { title: 'Fecha Emision', field: 'fechaEmision', type: 'date', editable: 'never'},
    { title: 'Fecha Produccion', field: 'fechaProduccion', type: 'date', editable: 'never' },
    { title: 'Fecha Terminado', field: 'fechaTerminado', type: 'date', editable: 'never' },
    { title: 'Galpon', field: 'galpon', editable: 'never' },
]
export const columnasEstadoPedidos = [
    { title: 'id', field: 'idpedido', hidden: true },
    {
      title: 'Codigo', field: 'codPedido',editable: 'never', validate: rowData => rowData.codPedido === '' ?
        { isValid: false, helperText: 'Codigo no puede estar vacio' } : true
    },
    { title: 'Descripcion', field: 'descripcion', },
    { title: 'Fecha Emision', field: 'fechaEmision', type: 'date', editable: 'never' },
    { title: 'Fecha Produccion', field: 'fechaProduccion', type: 'date', editable: 'never' },
    { title: 'Fecha Terminado', field: 'fechaTerminado', type: 'date', editable: 'never' },
    { title: 'Galpon', field: 'galpon', editable: 'never' },
]
export const columnasUsuarios = [
    { title: 'id', field: 'idusuario', hidden: true },
    {
      title: 'Nombre', field: 'nombre', validate: rowData => rowData.nombre === '' ?
        { isValid: false, helperText: 'Nombre no puede estar vacio' } : true
    },
    {
      title: 'Apellido', field: 'apellido', validate: rowData => rowData.apellido === '' ?
        { isValid: false, helperText: 'Apellido no puede estar vacio' } : true
    },
    {
      title: 'Dni', field: 'dni', validate: rowData => rowData.dni === '' ?
        { isValid: false, helperText: 'DNI no puede estar vacio' } : true
    },
    { title: 'Cargo', field: 'cargo', editable: 'never'},
]
export const columnasObservaciones = [
    { title: 'id', field: 'idobservacion', hidden: true },
    /*{
      title: 'Codigo', field: 'codObservacion', validate: rowData => rowData.codObservacion === '' ?
        { isValid: false, helperText: 'Codigo no puede estar vacio' } : true
    },*/
    {
      title: 'Motivo', field: 'motivo', editable: 'never'
    },
    {
      title: 'Cantidad Piezas', field: 'cantidadPiezas', type: 'numeric', validate: rowData => rowData.cantidadPiezas <= 0 ?
      { isValid: false, helperText: 'El numero debe ser mayor a Cero' } : true
    },
    { title: 'Pedido', field: 'idpedido.codPedido', editable: 'never'},
    { title: 'Producto', field: 'idproducto.codProducto', editable: 'never'},
]
