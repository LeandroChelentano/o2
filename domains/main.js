var arrEmpty = new Array();
function empty() {
    for (let i = 0; i < arrEmpty.length; i++) {
        if (arrEmpty[i] == '') {
            arrEmpty.splice(0, arrEmpty.length);
            return true;
        }
    }
    if (arrEmpty.length > -1) {
        arrEmpty.splice(0, arrEmpty.length)
        return false;
    }
}

var arrInteger = new Array();
function integer() {
    for (let i = 0; i < arrInteger.length; i++) {
        if (isNaN(arrInteger[i])) {
            arrInteger.splice(0, arrInteger.length);
            return true;
        }
    }
    if (arrInteger.length > -1) {
        arrInteger.splice(0, arrInteger.length);
        return false;
    }
}

// Clientes

var clientes = new Array();
var clientesBackup = new Array();

var cI;
var nombre;
var apellido;
var telefono;
var eMail;
var direccion;

function refrescarClientes() {
    clearClientes();
    
    saveClientes();

    loadClientes();
    loadVendedores();
    loadVentas();

    showClientes();
}

function getClientes() {
    cI = document.getElementById('cCI').value;
    nombre = document.getElementById('cNombre').value;
    apellido = document.getElementById('cApellido').value;
    telefono = document.getElementById('cTelefono').value;
    email = document.getElementById('cEmail').value;
    direccion = document.getElementById('cDireccion').value;
}

function clientesAdd() {
    getClientes();
    arrEmpty.push(cI,nombre,apellido,telefono,eMail,direccion);
    if(empty()) {
        alert('Debe seleccionar una persona en la lista')
    } else {
        arrInteger.push(telefono,cI);
        if(integer()) {
            alert('Los valores de CI y Telefono deben ser numericos.')
        } else {
            var x = false;
            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].Ci == cI) {
                    alert('La cedula a registrar ya esta registrada.')
                    x = true;
                }
            }
            if (x == false) {
                var newId = clientesBackup.length + clientes.length;
                clientes.push({
                    Id          :   newId,
                    Ci          :   cI,
                    Nombre      :   nombre,
                    Direccion   :   direccion,
                    Apellido    :   apellido,
                    Telefono    :   telefono,
                    Email       :   email,
                    Uso         :   0
                });
                refrescarClientes();
            }
        }
    }
}

function clientesRemove() {
    var index = document.getElementById('dbClientes').selectedIndex;
    if (clientes[index].Uso > 0) {
        alert('El cliente se encuentra en uso.')
    } else {
        clientesBackup.push(clientes[index]);
        clientes.splice(index, 1);
        refrescarClientes();
    }
}

function showClientes() {
    var db = document.getElementById('dbClientes');
    db.innerHTML = '';
    for (let i = 0; i < clientes.length; i++) {
        var line = document.createElement('option');
        line.text = `#${clientes[i].Id} | ${clientes[i].Nombre} ${clientes[i].Apellido} - ${clientes[i].Ci} - ${clientes[i].Direccion} - ${clientes[i].Telefono} - ${clientes[i].Email}`;
        db.add(line);
    }
}

function selCliente() {
    var index = document.getElementById('dbClientes').selectedIndex;

    document.getElementById('cCI').value = clientes[index].Ci;
    document.getElementById('cNombre').value = clientes[index].Nombre;
    document.getElementById('cApellido').value = clientes[index].Apellido;
    document.getElementById('cTelefono').value = clientes[index].Telefono;
    document.getElementById('cEmail').value = clientes[index].Email;
    document.getElementById('cDireccion').value = clientes[index].Direccion;
}

function clearClientes() {
    document.getElementById('cCI').value = '';
    document.getElementById('cNombre').value = '';
    document.getElementById('cApellido').value = '';
    document.getElementById('cTelefono').value = '';
    document.getElementById('cEmail').value = '';
    document.getElementById('cDireccion').value = '';
}

function clientesModify() {
    var index = document.getElementById('dbClientes').selectedIndex;
    getClientes();
    arrEmpty.push(cI,nombre,apellido,telefono,eMail,direccion);
    if(empty()) {
        alert('Debe seleccionar una persona en la lista');
    } else {
        arrInteger.push(telefono,cI);
        if(integer()) {
            alert('Los valores de CI y Telefono deben ser numericos.');
        } else {
            var x = false;
            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].Ci == cI && clientes[i].Ci != clientes[index].Ci) {
                    alert('La cedula a registrar ya esta registrada');
                    x = true;
                } 
            }
            if (x == false) {
                clientes[index] = ({
                    Id          :   clientes[index].Id,
                    Ci          :   cI,
                    Nombre      :   nombre,
                    Apellido    :   apellido,
                    Direccion   :   direccion,
                    Telefono    :   telefono,
                    Email       :   email,
                    Uso         :   clientes[index].Uso
                });
                refrescarClientes();
            }
        }
    }
}










var vendedores = new Array();
var vendedoresBackup = new Array();

// var cI;
// var nombre;
// var apellido;
// var telefono;
// var eMail;
// var direccion;
var segsoc;


function refrescarVendedores() {
    clearVendedores();
    
    saveVendedores();

    loadClientes();
    loadVendedores();
    // loadVentas();

    showVendedores();
}

function getVendedores() {
    cI = document.getElementById('vCI').value;
    nombre = document.getElementById('vNombre').value;
    apellido = document.getElementById('vApellido').value;
    telefono = document.getElementById('vTelefono').value;
    email = document.getElementById('vEmail').value;
    direccion = document.getElementById('vDireccion').value;
    segsoc = document.getElementById('vSegSoc').value;
}

function vendedoresAdd() {
    getVendedores();
    arrEmpty.push(cI,nombre,apellido,telefono,eMail,direccion,segsoc);
    if(empty()) {
        alert('Debe seleccionar una persona en la lista.')
    } else {
        arrInteger.push(telefono,cI,segsoc);
        if(integer()) {
            alert('Los valores de CI, Telefono y numero de seguridad social deben ser numericos.')
        } else {
            var x = false;
            for (var i = 0; i < vendedores.length; i++) {
                if (vendedores[i].Ci == cI)  {
                    alert('La cedula a registrar ya esta registrada.')
                    x = true;
                }
            }
            if (x == false) {
                var newId = vendedoresBackup.length + vendedores.length;
                vendedores.push({
                    Id          :   newId,
                    Ci          :   cI,
                    Nombre      :   nombre,
                    Direccion   :   direccion,
                    Apellido    :   apellido,
                    Telefono    :   telefono,
                    SS          :   segsoc,
                    Email       :   email,
                    Cartera     :   0,
                    Uso         :   0
                });
                refrescarVendedores();
            }
        }
    }
}

function vendedoresRemove() {
    var index = document.getElementById('dbVendedores').selectedIndex;
    if (vendedores[index].Uso > 0) {
        alert('La persona se encuentra en uso.')
    } else {
        vendedoresBackup.push(vendedores[index]);
        vendedores.splice(index, 1);
        refrescarVendedores();
    }
}

function showVendedores() {
    var db = document.getElementById('dbVendedores');
    db.innerHTML = '';
    for (let i = 0; i < vendedores.length; i++) {
        var line = document.createElement('option');
        line.text = `${vendedores[i].Id} | ${vendedores[i].Nombre} | ${vendedores[i].Apellido} | ${vendedores[i].Ci} | ${vendedores[i].Direccion} | ${vendedores[i].Telefono} | ${vendedores[i].SS} | ${vendedores[i].Email}`;
        db.add(line);
    }
}

function selVendedor() {
    var index = document.getElementById('dbVendedores').selectedIndex;

    document.getElementById('vCI').value = vendedores[index].Ci;
    document.getElementById('vNombre').value = vendedores[index].Nombre;
    document.getElementById('vApellido').value = vendedores[index].Apellido;
    document.getElementById('vTelefono').value = vendedores[index].Telefono;
    document.getElementById('vEmail').value = vendedores[index].Email;
    document.getElementById('vSegSoc').value = vendedores[index].SS;
    document.getElementById('vDireccion').value = vendedores[index].Direccion;
    document.getElementById('carteraBox').value = '$ ' + vendedores[index].Cartera;
}

function clearVendedores() {
    document.getElementById('vCI').value = '';
    document.getElementById('vNombre').value = '';
    document.getElementById('vApellido').value = '';
    document.getElementById('vTelefono').value = '';
    document.getElementById('vEmail').value = '';
    document.getElementById('vSegSoc').value = '';
    document.getElementById('vDireccion').value = '';
    document.getElementById('carteraBox').value = '';
}

function vendedoresModify() {
    var index = document.getElementById('dbVendedores').selectedIndex;
    getVendedores();
    arrEmpty.push(cI,nombre,apellido,telefono,eMail,direccion,segsoc);
    if(empty()) {
        alert('Debe seleccionar una persona en la lista.');
    } else {
        arrInteger.push(telefono,cI,segsoc);
        if(integer()) {
            alert('Los valores de CI, Telefono y numero de seguridad social deben ser numericos.')
        } else {
            var x = false;
            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].Ci == cI && clientes[i].Ci != clientes[index].Ci) {
                    alert('La cedula a registrar ya esta registrada');
                    x = true;
                } 
            }
            for (var i = 0; i < vendedores.length; i++) {
                if (vendedores[i].Ci == cI && vendedores[i].Ci != vendedores[index].Ci) {
                    alert('La cedula a registrar ya esta registrada');
                    x = true;
                } 
            }
            if (x == false) {
                vendedores[index] = ({
                    Id          :   vendedores[index].Id,
                    Ci          :   cI,
                    Nombre      :   nombre,
                    Apellido    :   apellido,
                    Direccion   :   direccion,
                    Telefono    :   telefono,
                    Email       :   email,
                    SS          :   segsoc,
                    Cartera     :   vendedores[index].Cartera,
                    Uso         :   vendedores[index].Uso
                });
                refrescarVendedores();
            }
        }
    }
}










var propiedades = new Array();
var propiedadesBackup = new Array();

var tipo; //combo
var direccion;
var barrio;
var ciudad;
var metros;
var dormitorios;
var banos;
var garage; //combo
var parrillero; //combo
var wifi; //combo
var mascotas; //combo
var precio;
var propietario; //combo

function getData() {
    if (document.getElementById('v1').checked) {
        tipo = 'Casa';
    } else if (document.getElementById('v2').checked) {
        tipo = 'Apartamento';
    } else {
        tipo = '';
    }
    
    direccion = document.getElementById('propertiesDireccion').value;
    barrio = document.getElementById('propertiesBarrio').value;
    ciudad = document.getElementById('propertiesCiudad').value;
    metros = document.getElementById('propertiesMetros').value;
    dormitorios = document.getElementById('propertiesDormitorios').value;
    banos = document.getElementById('propertiesBanos').value;
    
    if (document.getElementById('v3').checked) {
        garage = 'Si';
    } else if (document.getElementById('v4').checked) {
        garage = 'No'
    } else {
        garage = '';
    }

    if (document.getElementById('v5').checked) {
        parrillero = 'Si';
    } else if (document.getElementById('v6').checked) {
        parrillero = 'No'
    } else {
        parrillero = ''
    }
    
    if (document.getElementById('v7').checked) {
        wifi = 'Si';
    } else if (document.getElementById('v8').checked) {
        wifi = 'No'
    } else {
        wifi = ''
    }
    
    if (document.getElementById('v9').checked) {
        mascotas = 'Si';
    } else if (document.getElementById('v10').checked) {
        mascotas = 'No'
    } else {
        mascotas = ''
    }
    
    precio = document.getElementById('propertiesPrecio').value;

    i = document.getElementById('propertiesPropietario').selectedIndex;
    propietario = clientes[i].Id;
}

function refrescarPropiedades() {
    propertiesClear();

    savePropiedades();
    saveClientes();

    loadPropiedades();
    loadClientes();

    showProperties();
}

function propertiesAdd() {
    getData();
    arrEmpty.push(tipo, direccion, barrio, ciudad, metros, dormitorios, banos, garage, parrillero, wifi, mascotas, precio)
    if (empty()) {
        alert('Hay elementos en blanco.')
    } else {
        arrInteger.push(metros, banos, dormitorios, precio)
        if (integer()) {
            alert('La extencion, cantidad de baños, dormitorios y el precio deben ser en formato numerico.')
        } else {
            var x = false;
            for(let i = 0; i < propiedades.length; i++)
            {
                if (direccion == propiedades[i].Direccion)
                {
                    alert(`La direccion ${direccion} ya se encuentra en la lista de propiedades`);
                    x = true
                }
            }
            if (x == false) {
                var newId = propiedades.length + propiedadesBackup.length;

                propiedades.push({
                    Id          : newId,
                    Tipo        : tipo,
                    Direccion   : direccion,
                    Barrio      : barrio,
                    Ciudad      : ciudad,
                    Metros      : parseInt(metros),
                    Dormitorios : parseInt(dormitorios),
                    Banos       : parseInt(banos),
                    Garage      : garage,
                    Parrillero  : parrillero,
                    Wifi        : wifi,
                    Mascotas    : mascotas,
                    Precio      : parseInt(precio),
                    Propietario : parseInt(propietario),
                    Vendida     : 0 
                })

                // propietario por id
                for (let i = 0; i < clientes.length; i++) {
                    if (clientes[i].Id == propietario) {
                        clientes[i].Uso = clientes[i].Uso + 1;
                    }
                }
                saveClientes();

                alert('La propiedad se ingreso correctamente.')
                refrescarPropiedades()
            }
        }
    }
}

function showProperties() {
    var db = document.getElementById('dbPropiedades');
    db.innerHTML = "";
    for(var i=0 ; i < propiedades.length ; i++)
    {
        var linea = document.createElement('option');
        var indexP = 0;
        for (let x = 0; x < clientes.length; x++) {
            if (clientes[x].Id == propiedades[i].Propietario) {
                indexP = x;
            }
        }
        if (propiedades[i].Vendida == 1) {
            linea.text = `#${propiedades[i].Id} | ${propiedades[i].Tipo} - ${propiedades[i].Direccion} - ${propiedades[i].Barrio} - ${propiedades[i].Dormitorios} - ${propiedades[i].Banos} - ${propiedades[i].Garage} - ${propiedades[i].Parrillero} - ${propiedades[i].Wifi}  - ${ propiedades[i].Mascotas} - ${propiedades[i].Precio} | P#${clientes[indexP].Id} - ${clientes[indexP].Nombre} ${clientes[indexP].Apellido} VENDIDA`;
        } else {
            linea.text = `#${propiedades[i].Id} | ${propiedades[i].Tipo} - ${propiedades[i].Direccion} - ${propiedades[i].Barrio} - ${propiedades[i].Dormitorios} - ${propiedades[i].Banos} - ${propiedades[i].Garage} - ${propiedades[i].Parrillero} - ${propiedades[i].Wifi}  - ${ propiedades[i].Mascotas} - ${propiedades[i].Precio} | P#${clientes[indexP].Id} - ${clientes[indexP].Nombre} ${clientes[indexP].Apellido}`;
        }
        db.add(linea);
    }

    loadPropietario();
}

function selectP() {
    var index = document.getElementById('dbPropiedades').selectedIndex;
    if (propiedades[index].Tipo == 'Casa') {
        document.getElementById('v1').checked = true;
    } else if (propiedades[index].Tipo == 'Apartamento') {
        document.getElementById('v2').checked = true;
    }
    
    direccion = document.getElementById('propertiesDireccion').value = propiedades[index].Direccion;
    document.getElementById('propertiesBarrio').value = propiedades[index].Barrio;
    document.getElementById('propertiesCiudad').value = propiedades[index].Ciudad;
    document.getElementById('propertiesMetros').value = propiedades[index].Metros;
    document.getElementById('propertiesDormitorios').value = propiedades[index].Dormitorios;
    document.getElementById('propertiesBanos').value = propiedades[index].Banos;
    
    if (propiedades[index].Garage == 'Si') {
        document.getElementById('v3').checked = true;
    } else if (propiedades[index].Garage == 'No')  {
        document.getElementById('v4').checked = true;
    }

    if (propiedades[index].Parrillero == 'Si') {
        document.getElementById('v5').checked = true;
    } else if (propiedades[index].Parrillero == 'No') {
        document.getElementById('v6').checked = true;
    }
    
    if (propiedades[index].Wifi == 'Si') {
        document.getElementById('v7').checked = true;
    } else if (propiedades[index].Wifi == 'No') {
        document.getElementById('v8').checked = true;
    }

    if (propiedades[index].Mascotas == 'Si') {
        document.getElementById('v9').checked = true;
    } else if (propiedades[index].Mascotas == 'No') {
        document.getElementById('v10').checked = true;
    }
    
    document.getElementById('propertiesPrecio').value = propiedades[index].Precio;

    var xx = 0;
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].Id == propiedades[index].Propietario) {
            xx = i;
        }
    }
    document.getElementById('propertiesPropietario').selectedIndex = xx;
}

function propertiesRemove() {
    var index = document.getElementById('dbPropiedades').selectedIndex;
    if (propiedades[index].Vendida == 0) {
        // propietario por id
        for (let i = 0; i < clientes.length; i++) {
            if (clientes[i].Id == propietario) {
                clientes[i].Uso = clientes[i].Uso - 1;
            }
        }

        propiedadesBackup.push(propiedades[index]);
        propiedades.splice(index, 1);
        alert('Propiedad eliminada con exito')
        refrescarPropiedades();
    } else {
        alert('No se puede eliminar una propiedad vendida.');
    }
}


function propertiesClear() {
    document.getElementById('v1').checked = false;
    document.getElementById('v2').checked = false;
    document.getElementById('propertiesDireccion').value = '';
    document.getElementById('propertiesBarrio').value = '';
    document.getElementById('propertiesCiudad').value = '';
    document.getElementById('propertiesMetros').value = '';
    document.getElementById('propertiesDormitorios').value = '';
    document.getElementById('propertiesBanos').value = '';
    document.getElementById('v3').checked = false;
    document.getElementById('v4').checked = false;
    document.getElementById('v5').checked = false;
    document.getElementById('v6').checked = false;
    document.getElementById('v7').checked = false;
    document.getElementById('v8').checked = false;
    document.getElementById('v9').checked = false;
    document.getElementById('v10').checked = false;
    document.getElementById('propertiesPrecio').value = '';
    document.getElementById('propertiesPropietario').selectedIndex = 0;
}


function propertiesModify() {
    // loadVentas();
    var index = document.getElementById('dbPropiedades').selectedIndex;
    getData();
    arrEmpty.push(tipo, direccion, barrio, ciudad, metros, dormitorios, banos, garage, parrillero, wifi, mascotas, precio)
    if (empty()) {
        alert('Hay elementos en blanco.')
    } else {
        arrInteger.push(metros, banos, dormitorios, precio)
        if (integer()) {
            alert('La extencion, cantidad de baños, dormitorios y el precio deben ser en formato numerico.')
        } else {
            var x = false;
            for(let i = 0; i < propiedades.length; i++) {
                if (direccion == propiedades[i].Direccion && direccion != propiedades[index].Direccion) {
                    alert(`La direccion ${direccion} ya se encuentra en la lista de propiedades`);
                    x = true
                }
            }
            if (x == false) {
                for (let i = 0; i < clientes.length; i++) {
                    if (clientes[i].Id == propiedades[index].Propietario) {
                        clientes[i].Uso = clientes[i].Uso - 1;
                    }
                }

                propiedades[index] = ({
                    Id          : propiedades[index].Id,
                    Tipo        : tipo,
                    Direccion   : direccion,
                    Barrio      : barrio,
                    Ciudad      : ciudad,
                    Metros      : parseInt(metros),
                    Dormitorios : parseInt(dormitorios),
                    Banos       : parseInt(banos),
                    Garage      : garage,
                    Parrillero  : parrillero,
                    Wifi        : wifi,
                    Mascotas    : mascotas,
                    Precio      : parseInt(precio),
                    Propietario : parseInt(propietario),
                    Vendida     : propiedades[index].Vendida
                })

                for (let i = 0; i < clientes.length; i++) {
                    if (clientes[i].Id == propietario) {
                        clientes[i].Uso = clientes[i].Uso + 1;
                    }
                }

                alert('La propiedad se ha modificado correctamente.')
                refrescarPropiedades()
            }
        }
    }
}

function loadPropietario() {
    var db = document.getElementById('propertiesPropietario');
    db.innerHTML = '';
    for (let i = 0 ; i < clientes.length ; i++) {
        var linea = document.createElement('option');
        linea.text = `#${clientes[i].Id} | ${clientes[i].Nombre} ${clientes[i].Apellido}`;
        db.add(linea);
    }
}










function ventasLoadPropiedades() {
    var db = document.getElementById('sellPropiedad');
    db.innerHTML = '';
    for (var i = 0; i < propiedades.length; i++) {
        var line = document.createElement('option');

        let index = 0;
        for (let x = 0; x < clientes.length; x++) {
            if (clientes[x].Id == propiedades[i].Propietario) {
                index = x;
            }
        }

        line.text = `${propiedades[i].Id} | ${propiedades[i].Tipo} | ${propiedades[i].Direccion} | Propietario CI: ${clientes[index].Ci} - $${propiedades[i].Precio}`
        db.add(line);
    }
}

function ventasLoadCompradores() {
    var db = document.getElementById('sellComprador');
    db.innerHTML = '';
    for (let i = 0; i < clientes.length; i++) {
        var line = document.createElement('option');
        line.text = `${clientes[i].Id} | ${clientes[i].Nombre} ${clientes[i].Apellido}`
        db.add(line);
    }
}

function ventasLoadVendedores() {
    var db = document.getElementById('sellVendedor');
    db.innerHTML = '';
    for (let i = 0; i < vendedores.length; i++) {
        var line = document.createElement('option');
        line.text = `${vendedores[i].Id} | ${vendedores[i].Nombre} ${vendedores[i].Apellido}`
        db.add(line);
    }
}

var ventas = new Array();
var idVentas = new Array();

var vFecha;
var vPropiedad;
var vMonto;
var vComprador;
var vVendedor;

function refrescarVentas() {
    sellLimpiar();

    saveVentas();
    saveIdVentas();
    savePropiedades();
    saveClientes();
    saveVendedores();

    loadVentas();
    loadIdVentas();
    loadPropiedades();
    loadClientes();
    loadVendedores();

    ventasLoadPropiedades();
    ventasLoadCompradores();
    ventasLoadVendedores();
    showVentas();
}

function getVenta() {
    vFecha = document.getElementById('sellFecha').value;
    vPropiedad = document.getElementById('sellPropiedad').value;
    vMonto = document.getElementById('sellMonto').value;
    vComprador = document.getElementById('sellComprador').value;
    vVendedor = document.getElementById('sellVendedor').value;
}

function vender() {
    getVenta();
    arrEmpty.push(vFecha, vPropiedad, vComprador, vVendedor)
    if (empty()) {
        alert('Hay elementos vacios.');
    } else {
        monto();
     
        var i = document.getElementById('sellPropiedad').selectedIndex;
        var p = propiedades[i].Id;

        var ii = document.getElementById('sellComprador').selectedIndex;
        var c = clientes[ii].Id;
        
        var iii = document.getElementById('sellVendedor').selectedIndex;
        var v = vendedores[iii].Id;

        if (propiedades[i].Vendida == 0) {
            if (clientes[ii].Ci == vendedores[iii].Ci || c == propiedades[i].Propietario) {
                alert('Algo salio mal.')
            } else {
                for (let x = 0; x < clientes.length; x++) {
                    if (clientes[x].Id == propiedades[i].Propietario) {
                        clientes[x].Uso = clientes[x].Uso - 1;
                    }
                }

                propiedades[i].Vendida = 1;
                propiedades[i].Propietario = c;
                vendedores[iii].Cartera = vendedores[iii].Cartera + Math.round((3 * propiedades[i].Precio) / 100);

                
                var newId = idVentas.length;
                idVentas.push(newId);
                
                ventas.push({
                    Id: newId,
                    Fecha: vFecha,
                    Propiedad: p,
                    Monto: vMonto,
                    Comprador: c,
                    Vendedor: v
                })

                vendedores[iii].Uso = vendedores[iii].Uso + 1;
                clientes[ii].Uso = clientes[ii].Uso + 1;
                
                refrescarVentas();
            }
        } else {
            alert('Propiedad ya vendida.');
        }
    }
}

function sellLimpiar() {
    document.getElementById('sellPropiedad').selectedIndex = 0;
    document.getElementById('sellMonto').value = '';
    document.getElementById('sellComprador').selectedIndex = 0;
    document.getElementById('sellVendedor').selectedIndex = 0;
}

function showVentas() {
    var db = document.getElementById('dbVentas');
    db.innerHTML = '';
    for (let i = 0; i < ventas.length; i++) {
        var line = document.createElement('option');
        
        var indexVendedor = 0;
        for (let x = 0; x < vendedores.length; x++) {
            if (vendedores[x].Id == ventas[i].Vendedor) {
                indexVendedor = x;
            }
        }
        
        var indexComprador = 0;
        for (let x = 0; x < clientes.length; x++) {
            if (clientes[x].Id == ventas[i].Comprador) {
                indexComprador = x;
            }
        }
        
        var indexPropiedad = 0;
        for (let x = 0; x < propiedades.length; x++) {
            if (propiedades[x].Id == ventas[i].Propiedad) {
                indexPropiedad = x;
            }
        }
        
        line.text = `V#${ventas[i].Id} | ${ventas[i].Fecha} | P#${ventas[i].Propiedad} - ${propiedades[indexPropiedad].Direccion} | Vendedor: ${ventas[i].Vendedor} - ${vendedores[indexVendedor].Nombre} ${vendedores[indexVendedor].Apellido} | Comprador: ${ventas[i].Comprador} - ${clientes[indexComprador].Nombre} ${clientes[indexComprador].Apellido} = $${ventas[i].Monto}`
        db.add(line);
    }
}




function monto() {
    var index = document.getElementById('sellPropiedad').selectedIndex;
    var box = document.getElementById('sellMonto');
    box.value = '$' + propiedades[index].Precio;
    vMonto = parseInt(propiedades[index].Precio);
}





