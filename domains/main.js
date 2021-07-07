// Funciones auxiliares para verificar elementos vacios.
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

// Funciones auxiliares para verificar elementos integer.
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

// Seccion de clientes

var clientes = new Array();
var clientesBackup = new Array();

var cI;
var nombre;
var apellido;
var telefono;
var eMail;
var direccion;

// Funcion empleada para refresacar todos componentes del html de forma conjunta 
function refrescarClientes() {
    clearClientes();
    
    saveClientes();

    loadClientes();
    loadVendedores();
    loadVentas();

    showClientes();
}

// Esta funcion saca el contenido de los campos de texto, almancenandolos en variables globales,
// las cuales pueden ser leidas por otras funciones
function getClientes() {
    cI = document.getElementById('cCI').value;
    nombre = document.getElementById('cNombre').value;
    apellido = document.getElementById('cApellido').value;
    telefono = document.getElementById('cTelefono').value;
    email = document.getElementById('cEmail').value;
    direccion = document.getElementById('cDireccion').value;
}

// Funcion mediante la cual se verifica y posteriormente agrega un nuevo objeto clientes al array 'clientes'
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

// Verifica y remueve un cliente del array 'clientes'
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

// Muestra los clientes almacenados en su select correspondiente
function showClientes() {
    var db = document.getElementById('dbClientes');
    db.innerHTML = '';
    for (let i = 0; i < clientes.length; i++) {
        var line = document.createElement('option');
        line.text = `#${clientes[i].Id} | ${clientes[i].Nombre} ${clientes[i].Apellido} - ${clientes[i].Ci} - ${clientes[i].Direccion} - ${clientes[i].Telefono} - ${clientes[i].Email}`;
        db.add(line);
    }
}

// Coloca los datos del index del array 'clientes' en los campos de texto
function selCliente() {
    var index = document.getElementById('dbClientes').selectedIndex;

    document.getElementById('cCI').value = clientes[index].Ci;
    document.getElementById('cNombre').value = clientes[index].Nombre;
    document.getElementById('cApellido').value = clientes[index].Apellido;
    document.getElementById('cTelefono').value = clientes[index].Telefono;
    document.getElementById('cEmail').value = clientes[index].Email;
    document.getElementById('cDireccion').value = clientes[index].Direccion;
}

// Limpia los campos de texto referentes a los clientes
function clearClientes() {
    document.getElementById('cCI').value = '';
    document.getElementById('cNombre').value = '';
    document.getElementById('cApellido').value = '';
    document.getElementById('cTelefono').value = '';
    document.getElementById('cEmail').value = '';
    document.getElementById('cDireccion').value = '';
}

// Modifica el clientes seleccionado, con previa validacion
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










// Seccion de vendedores

var vendedores = new Array();
var vendedoresBackup = new Array();

// Demas atributos no especificados puesto que son compatridos con clientes,
// se toma la determinacion de evadir causantes de 'bugs'
var segsoc;

// Funcion empleada para refrescar los componentes que refieren al proceso de vendedores
function refrescarVendedores() {
    clearVendedores();
    
    saveVendedores();

    loadClientes();
    loadVendedores();

    showVendedores();
}

// Funcion encargada de refrescar las variables globales
function getVendedores() {
    cI = document.getElementById('vCI').value;
    nombre = document.getElementById('vNombre').value;
    apellido = document.getElementById('vApellido').value;
    telefono = document.getElementById('vTelefono').value;
    email = document.getElementById('vEmail').value;
    direccion = document.getElementById('vDireccion').value;
    segsoc = document.getElementById('vSegSoc').value;
}

// Funcion que agrega vendedores, previa validacion
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

// Funcion que remueve vendedores, si este no se encuentra en uso
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

// Funcion empleada para mostrar los vendedores en el campo correspondiente
function showVendedores() {
    var db = document.getElementById('dbVendedores');
    db.innerHTML = '';
    for (let i = 0; i < vendedores.length; i++) {
        var line = document.createElement('option');
        line.text = `${vendedores[i].Id} | ${vendedores[i].Nombre} | ${vendedores[i].Apellido} | ${vendedores[i].Ci} | ${vendedores[i].Direccion} | ${vendedores[i].Telefono} | ${vendedores[i].SS} | ${vendedores[i].Email}`;
        db.add(line);
    }
}

// Funcion encargada de mostrar los atributos del vendedor seleccionado en los campos correspondientes
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

// Funcion empleada para limpiar los campos de texto referidos a los vendedores
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

// Funcion empleada para modificar el vendedor seleciconado, previa modificacion
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










// Seccion de Propiedades

var propiedades = new Array();
var propiedadesBackup = new Array();

var tipo;
var direccion;
var barrio;
var ciudad;
var metros;
var dormitorios;
var banos;
var garage;
var parrillero;
var wifi;
var mascotas;
var precio;
var propietario;

// Funcion para refresacar las variables globales de las propiedades
function getData() {
    if (document.getElementById('v1').checked) {
        tipo = 'Casa';
    } else if (document.getElementById('v2').checked) {
        tipo = 'Apartamento';
    } else {
        tipo = '';
    }
    
    barrio = barrios[document.getElementById('propertiesBarrio').selectedIndex].Id;
    ciudad = barrios[document.getElementById('propertiesBarrio').selectedIndex].Ciudad;
    
    direccion = document.getElementById('propertiesDireccion').value;
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

// Funcion para refresacar todos los componentes de las propiedades
function refrescarPropiedades() {
    propertiesClear();

    savePropiedades();
    saveClientes();

    loadPropiedades();
    loadClientes();

    displayBarrios();
    showProperties();
}

// Funcion que carga los barrios en el select correspondientes, para posterior seleccion
function displayBarrios() {
    var db = document.getElementById('propertiesBarrio');
    db.innerHTML = '';
    for (let i = 0; i < barrios.length; i++) {
        var line = document.createElement('option');
        line.text = `#${barrios[i].Id} | ${barrios[i].Nombre}`;
        db.add(line);
    }
}

// Funcion que muestra la ciudad correspondiente al barrio elegido
function displayCiudad() {
    var index = document.getElementById('propertiesBarrio').selectedIndex;
    for (let i = 0; i < ciudades.length; i++) {
        if (ciudades[i].Id == barrios[index].Ciudad) {
            document.getElementById('propertiesCiudad').value = `#${ciudades[i].Id} - ${ciudades[i].Nombre}`;
        }
    }
}

// Funcion utilizada para agregar una propiedad, con validacion previa
function propertiesAdd() {
    getData();
    if (document.getElementById('propertiesBarrio').selectedIndex == -1) {
        alert('Hay elementos en blanco.');
    } else {
        arrEmpty.push(tipo, direccion, metros, dormitorios, banos, garage, parrillero, wifi, mascotas, precio)
        if (empty()) {
            alert('Hay elementos en blanco.');
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
}

// Funcion empleada para mostrar los datos registrados sobre las propiedades en el array correspondiente
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

// Funcion que muestra en los campos de texto correspondientes los datos seleccionados
function selectP() {
    var index = document.getElementById('dbPropiedades').selectedIndex;
    if (propiedades[index].Tipo == 'Casa') {
        document.getElementById('v1').checked = true;
    } else if (propiedades[index].Tipo == 'Apartamento') {
        document.getElementById('v2').checked = true;
    }
    
    document.getElementById('propertiesDireccion').value = propiedades[index].Direccion;

    for (let i = 0; i < barrios.length; i++) {
        if (barrios[i].Id == propiedades[index].Barrio) {
            document.getElementById('propertiesBarrio').selectedIndex = i;
        }
    }
    
    for (let i = 0; i < ciudades.length; i++) {
        if (ciudades[i].Id == propiedades[index].Ciudad) {
            document.getElementById('propertiesCiudad').value = `#${ciudades[i].Id} | ${ciudades[i].Nombre}`;
        }
    }
    
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

// Elimina una propiedad con validacion previa del indice seleccionado
function propertiesRemove() {
    var index = document.getElementById('dbPropiedades').selectedIndex;
    if (propiedades[index].Vendida == 0) {
        
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

// Funcion empleada para limpiar los campos de texto referentes a las propiedades
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

// Funcion que permite la modificacion de una propiedad seleccionada
function propertiesModify() {
    var index = document.getElementById('dbPropiedades').selectedIndex;
    getData();
    if (document.getElementById('propertiesBarrio').selectedIndex == -1) {
        alert('Hay elementos en blanco.')
    } else {
        arrEmpty.push(tipo, direccion, metros, dormitorios, banos, garage, parrillero, wifi, mascotas, precio)
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
}

// Muestra los propietario en el campo correspondiente para posterior seleccion
function loadPropietario() {
    var db = document.getElementById('propertiesPropietario');
    db.innerHTML = '';
    for (let i = 0 ; i < clientes.length ; i++) {
        var linea = document.createElement('option');
        linea.text = `#${clientes[i].Id} | ${clientes[i].Nombre} ${clientes[i].Apellido}`;
        db.add(linea);
    }
}










// Seccion de Ventas

// Funcion que carga las propiedades para posterior seleccion
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

// Funcion que carga los compradores para posterior seleccion
function ventasLoadCompradores() {
    var db = document.getElementById('sellComprador');
    db.innerHTML = '';
    for (let i = 0; i < clientes.length; i++) {
        var line = document.createElement('option');
        line.text = `${clientes[i].Id} | ${clientes[i].Nombre} ${clientes[i].Apellido}`
        db.add(line);
    }
}

// Funcion que carga los vendedores para posterior seleccion
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

// Funcion empleada para refrescar todas los componentes de una u otra forma relacionados con ventas
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

// Funcion creada con el fin de refrescar las variables globales de las ventas
function getVenta() {
    vFecha = document.getElementById('sellFecha').value;
    vPropiedad = document.getElementById('sellPropiedad').value;
    vMonto = document.getElementById('sellMonto').value;
    vComprador = document.getElementById('sellComprador').value;
    vVendedor = document.getElementById('sellVendedor').value;
}

// Funcion que valida todos los datos referentes a las ventas, corrige variables y finalmente realiza la venta
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
                vendedores[iii].Cartera = vendedores[iii].Cartera + Math.round((3 * propiedades[i].Precio) / 100);
                
                
                var newId = idVentas.length;
                idVentas.push(newId);
                
                ventas.push({
                    Id: newId,
                    Fecha: vFecha,
                    Propiedad: p,
                    Monto: vMonto,
                    Anterior: propiedades[i].Propietario,
                    Comprador: c,
                    Vendedor: v
                })
                
                propiedades[i].Propietario = c;
                vendedores[iii].Uso = vendedores[iii].Uso + 1;
                clientes[ii].Uso = clientes[ii].Uso + 1;
                
                refrescarVentas();
            }
        } else {
            alert('Propiedad ya vendida.');
        }
    }
}

// Funcion que limpia los campos de las ventas
function sellLimpiar() {
    document.getElementById('sellPropiedad').selectedIndex = 0;
    document.getElementById('sellMonto').value = '';
    document.getElementById('sellComprador').selectedIndex = 0;
    document.getElementById('sellVendedor').selectedIndex = 0;
}

// Funcion que muestra en su lugar correspondiente todos los objetos de ventas
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

// Funcion que carga en monto de la propiedad seleccionada
function monto() {
    var index = document.getElementById('sellPropiedad').selectedIndex;
    var box = document.getElementById('sellMonto');
    box.value = '$' + propiedades[index].Precio;
    vMonto = parseInt(propiedades[index].Precio);
}










// Seccion de Ciudades

var ciudades = new Array();
var idCiudades = new Array();

var ciudadNombre;

// Funcion empleada para refrescar componentes relacionados con las ciudades
function refrescarCiudadesBarrios() {
    barrioClear();
    ciudadClear();

    savePropiedades();
    saveCiudades();
    saveIdCiudades();
    saveBarrios();
    saveIdBarrios();
    
    loadPropiedades();
    loadCiudades();
    loadIdCiudades();
    loadBarrios();
    loadIdBarrios();

    cargarCiudadesEnSel();

    showBarrios();
    showCiudades();
}

// Funcion que actualiza la valiable global correspondiente a la ciudad
function getCiudades() {
    ciudadNombre = document.getElementById('ciudadNombre').value;
}

// Funcion que agrega una ciudad a los registros, previa validacion
function ciudadAdd() {
    getCiudades();
    if (ciudadNombre == '') {
        alert('El nombre esta vacio.');
    } else {
        var existence = false;
        for (let i = 0; i < ciudades.length; i++) {
            if (ciudades[i].Nombre == ciudadNombre) {
                existence = true;
            } 
        }
        if (existence == true) {
            alert('Nombre ya utilizado.');
        } else {
            var newId = idCiudades.length;
            idCiudades.push(newId);

            ciudades.push({
                Id: newId,
                Nombre: ciudadNombre,
                Uso: 0
            })

            refrescarCiudadesBarrios();
        }
    }
}

// Funcion que elimina una ciudad, en caso de que no se encuentre en uso
function ciudadRemove() {
    var index = document.getElementById('dbCiudades').selectedIndex;
    if (ciudades[index].Uso > 0) {
        alert('No puedes eliminar una ciudad en uso.')
    } else {
        ciudades.splice(index, 1);
        refrescarCiudadesBarrios();
    }
} 

// Modifica una ciudad, previa validacion
function ciudadModify() {
    getCiudades();
    var index = document.getElementById('dbCiudades').selectedIndex;
    var existence = false;
    for (let i = 0; i < ciudades.length; i++) {
        if (ciudades[i].Nombre == ciudadNombre && ciudades[i].Nombre != ciudades[index].Nombre) {
            existence = true;
        } 
    }
    if (existence == true) {
        alert('Nombre en uso.')
    } else {
        ciudades[index].Nombre = ciudadNombre;
        refrescarCiudadesBarrios();
    }
}

// Funcion empleada para limpiar el campo de texto del nombre de la ciudad
function ciudadClear() {
    document.getElementById('ciudadNombre').value = '';
}

// Funcion que muestra las ciudades en su lugar correspondiente
function showCiudades() {
    var db = document.getElementById('dbCiudades');
    db.innerHTML = '';
    for (let i = 0; i < ciudades.length; i++) {
        var line = document.createElement('option');
        line.text = `#${ciudades[i].Id} | ${ciudades[i].Nombre}`;
        db.add(line);
    }
}

// Funcion que muestra el elemento en su campo correspondiente
function selCiudad() {
    var index = document.getElementById('dbCiudades').selectedIndex;
    document.getElementById('ciudadNombre').value = ciudades[index].Nombre;
}

// Funcion que carga las ciudades en un select para ser asignadas a barrios
function cargarCiudadesEnSel() {
    var db = document.getElementById('barrioCiudad');
    db.innerHTML = '';
    for (let i = 0; i < ciudades.length; i++) {
        var line = document.createElement('option');
        line.text = `#${ciudades[i].Id} | ${ciudades[i].Nombre}`;
        db.add(line);
    }
}










// Seccion de Barrios

var barrios = new Array();
var idBarrios = new Array();

var barrioNombre;
var barrioCiudad;

// Funcion empleada para refrescar las variables globales de laos barrios
function getBarrios() {
    barrioNombre = document.getElementById('barrioNombre').value;
    var index = document.getElementById('barrioCiudad').selectedIndex;
    barrioCiudad = ciudades[index].Id; 
}

// Funcion que agrega un barrio previa validacion
function barrioAdd() {
    getBarrios();
    if (barrioNombre == '') {
        alert('Hay elementos vacios.');
    } else {
        var exitence = false;
        var nombreCiudad = '';
        for (let i = 0; i < barrios.length; i++) {
            if (barrios[i].Nombre == barrioNombre && barrios[i].Ciudad == barrioCiudad) {
                exitence = true;
            }
        }
        if (exitence) {
            alert('Combinacion ya existente.')
        } else {
            var newId = idBarrios.length;
            idBarrios.push(newId);
    
            for (let i = 0; i < ciudades.length; i++) {
                if (ciudades[i].Id == barrioCiudad) {
                    ciudades[i].Uso = ciudades[i].Uso + 1;
                }
            }
    
            barrios.push({
                Id: newId,
                Nombre: barrioNombre,
                Ciudad: barrioCiudad
            })
    
            refrescarCiudadesBarrios();       
        }
    }
}

// Funcion empleada para eliminar un barrio, si este no es encuentra en uso
function barrioRemove() {
    var index = document.getElementById('dbBarrios').selectedIndex;
    var existence = false;
    for (let i = 0; i < ventas.length; i++) {
        if (ventas[i].Barrio == barrios[index].Id) {
            existence = true;
        }
    }
    if (existence == true) {
        alert('No puedes eliminar un barrio en uso.')
    } else {
        for (let i = 0; i < ciudades.length; i++) {
            if (ciudades[i].Id == barrios[index].Ciudad) {
                ciudades[i].Uso = ciudades[i].Uso - 1;
            }
        }
        barrios.splice(index, 1);
    }
    refrescarCiudadesBarrios();
} 

// Funcion para modificar un barrio, previa validacion y modificacion de atributos complementarios
function barrioModify() {
    getBarrios();
    var index = document.getElementById('dbBarrios').selectedIndex;
    if (document.getElementById('barrioNombre') == '') {
        alert('Hay elementos en blanco.');
    } else {
        var existence = false;
        for (let i = 0; i < ventas.length; i++) {
            if (ventas[i].Barrio == barrios[index].Id) {
                existence = true;
            }
        }
        if (existence == true) {
            alert('No puedes eliminar un barrio en uso.')
        } else {
            
            for (let i = 0; i < propiedades.length; i++) {
                if (propiedades[i].Barrio == barrios[index].Id) {
                    propiedades[i].Ciudad = barrioCiudad
                }
            }

            for (let i = 0; i < ciudades.length; i++) {
                if (ciudades[i].Id == barrios[index].Ciudad) {
                    ciudades[i].Uso = ciudades[i].Uso - 1;
                }
            }

            barrios[index] = ({
                Id: barrios[index].Id,
                Nombre: barrioNombre,
                Ciudad: barrioCiudad
            })

            for (let i = 0; i < ciudades.length; i++) {
                if (ciudades[i].Id == barrios[index].Ciudad) {
                    ciudades[i].Uso = ciudades[i].Uso + 1;
                }
            }
            refrescarCiudadesBarrios();
        }
    }
    
}

// Funcion empleada para limpiar los campos correctamentes a los barrios
function barrioClear() {
    document.getElementById('barrioNombre').value = '';
    document.getElementById('barrioCiudad').selectedIndex = 0;
}

// Funcion que muestra en el select correspondiente todos los barrios registrados
function showBarrios() {
    var db = document.getElementById('dbBarrios');
    db.innerHTML = '';
    for (let i = 0; i < barrios.length; i++) {
        var line = document.createElement('option');

        var index = 0;
        for (let x = 0; x < ciudades.length; x++) {
            if (ciudades[x].Id == barrios[i].Ciudad) {
                index = x;
            }
        }

        line.text = `#${barrios[i].Id} | ${barrios[i].Nombre} - Pretenece a: #${barrios[i].Ciudad} | ${ciudades[index].Nombre}`;
        db.add(line);
    }
}

// Funcion empleada para mostrar en el campo correspondiente todos los atributos de un barrios seleccionado
function selBarrio() {
    var index = document.getElementById('dbBarrios').selectedIndex;
    document.getElementById('barrioNombre').value = barrios[index].Nombre;
    
    for (let i = 0; i < ciudades.length; i++) {
        if (ciudades[i].Id == barrios[index].Ciudad) {
            document.getElementById('barrioCiudad').selectedIndex = i;
        }
    }
}