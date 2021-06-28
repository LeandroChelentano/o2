function toggleMenu() {
    var menu = document.getElementById('menu');
    if (menu.style.display == 'block') {
        menu.style.display = 'none'
        document.getElementById('ventaCara').style.display = 'none';
    } else {
        menu.style.display = 'block'
    }
}

function close3() {
    document.getElementById('transacciones').style.display = 'none'
}

function closeFilter() {
    document.getElementById('filter').style.display = 'none'
}

function showTransacciones() {
    toggleMenu();
    document.getElementById('transacciones').style.display = 'block'
    loadTransaccionesClientes();
}

function showMasCostosa() {
    document.getElementById('filter').style.display = 'none';
    if (document.getElementById('ventaCara').style.display == 'block') {
        document.getElementById('ventaCara').style.display = 'none';
    } else {
        document.getElementById('ventaCara').style.display = 'block';
        ventaMasCara();
    }
}

function showFiltros() {
    document.getElementById('ventaCara').style.display = 'none';
    if (document.getElementById('filter').style.display == 'block') {
        document.getElementById('filter').style.display = 'none';
    } else {
        document.getElementById('filter').style.display = 'block';
        loadFilter();
    }
    // loadFilter();
}

// Consultas

// 3.Dado un Cliente mostrar sus transacciones,
// es decir sus ventas o compras que ha realizado.
function transaccion() {
    var db = document.getElementById('dbConsulta3');
    db.innerHTML = '';
    var index = document.getElementById('consultaClientes').selectedIndex;
    for (let i = 0; i < ventas.length; i++) {
        //  bucle que recorre ventas para encontrar si el cliente vendio algun propiedad
        if (ventas[i].Anterior == clientes[index].Id) {
            var line = document.createElement('option');
            for (let x = 0; x < propiedades.length; x++) {
                if (propiedades[x].Id == ventas[i].Propiedad) {
                    line.text = `VENTA: #${ventas[i].Id} (${ventas[i].Fecha}) | ${propiedades[x].Tipo} - ${propiedades[x].Direccion} - $${ventas[i].Monto}`;
                    db.add(line);
                }
            }
        }
        // loop a ventas para encontrar si el cliente compro alguna propiedad
        if (ventas[i].Comprador == clientes[index].Id) {
            var line = document.createElement('option');
            for (let x = 0; x < propiedades.length; x++) {
                if (propiedades[x].Id == ventas[i].Propiedad) {
                    line.text = `COMPRA: #${ventas[i].Id} (${ventas[i].Fecha}) | ${propiedades[x].Tipo} - ${propiedades[x].Direccion} - $${ventas[i].Monto}`;
                    db.add(line);
                }
            }
        }
    }
}

function loadTransaccionesClientes() {
    var db = document.getElementById('consultaClientes');
    db.innerHTML = '';
    for (let i = 0; i < clientes.length; i++) {
        var line = document.createElement('option');
        line.text = `#${clientes[i].Id} | ${clientes[i].Nombre} ${clientes[i].Apellido}`
        db.add(line);
    }
}

// 4. Mostrar la propiedad que se vendió con el precio más alto
// y el vendedor querealizó dicha transacción.
function ventaMasCara() {
    ventaCara = Number.MIN_VALUE;
    vendedorMasCara = '';
    if (ventas.length > 0){
        for (let i = 0; i < ventas.length; i++){
            if (ventas[i].Monto > ventaCara){
                for(let o = 0; o < vendedores.length; o++){
                    if (vendedores[o].Id == ventas[i].Vendedor){
                        vendedorMasCara = vendedores[o].Nombre;
                    }
                }
                ventaCara = ventas[i].Monto;
            }
        }
    }
    
    if(ventaCara > 0){
        textoVentaCara = `Vendedor: ${vendedorMasCara} - Monto: $${ventaCara}`;
    }
    else{
        textoVentaCara = `Vendedor: ${vendedorMasCara} - Monto: $`;
    }
    document.getElementById('VentaMasCara').value = textoVentaCara;
}
// 5. Dado el nombre de un barrio y un monto de dinero,
// mostrar las propiedades que están a la venta por debajo de ese precio en esa ciudad.
function filtrar() {
    xx = document.getElementById('filtrarBarrio').selectedIndex;
    fBarrio = barrios[xx].Id;
    fPrecio = document.getElementById('MontoFiltro').value;
    var db = document.getElementById('dbFilter');
    db.innerHTML = '';

    if (document.getElementById('MontoFiltro').value != '') {
        if (isNaN(fPrecio) && fPrecio > 0) {
            alert('El precio debe ser numerico.')
        } else {
            for (let  i = 0; i < propiedades.length; i++) {
                if (propiedades[i].Vendida == 0) {
                    if (propiedades[i].Barrio = fBarrio && propiedades[i].Precio <= fPrecio) {
                        var line = document.createElement('option');
                        line.text = `#${propiedades[i].Id} | ${propiedades[i].Direccion} - $${propiedades[i].Precio}`
                        db.add(line);
                    }
                }
            }
        }
    }
}

function loadFilter() {
    var db = document.getElementById('filtrarBarrio');
    db.innerHTML = '';
    for (let i = 0; i < barrios.length; i++) {
        var line = document.createElement('option');
        line.text = `#${barrios[i].Id} | ${barrios[i].Nombre}`
        db.add(line);
    }
}