function loadGlobal() {
    try {
        window.localStorage.getItem('propiedades').length;
    } catch(err) {
        window.localStorage.setItem('propiedades', '[]');
    }
    loadPropiedades();
    try {
        window.localStorage.getItem('propiedadesBackup').length;
    } catch(err) {
        window.localStorage.setItem('propiedadesBackup', '[]');
    }
    loadPropiedadesBackup();
    
    try {
        window.localStorage.getItem('vendedores').length;
    } catch(err) {
        window.localStorage.setItem('vendedores', '[]');    
    }
    loadVendedores();
    try {
        window.localStorage.getItem('vendedoresBackup').length;
    } catch(err) {
        window.localStorage.setItem('vendedoresBackup', '[]');    
    }
    loadVendedoresBackup();

    try {
        window.localStorage.getItem('ventas').length;
    } catch(err) {
        window.localStorage.setItem('ventas', '[]'); 
    }
    loadVentas();
    try {
        window.localStorage.getItem('idVentas').length;
    } catch(err) {
        window.localStorage.setItem('idVentas', '[]'); 
    }
    loadIdVentas();

    try {
        window.localStorage.getItem('clientes').length;
    } catch(err) {
        window.localStorage.setItem('clientes', '[]');    
    }
    loadClientes();
    try {
        window.localStorage.getItem('clientesBackup').length;
    } catch(err) {
        window.localStorage.setItem('clientesBackup', '[]');    
    }
    loadClientesBackup();

    try {
        window.localStorage.getItem('ciudades').length;
    } catch(err) {
        window.localStorage.setItem('ciudades', '[]');    
    }
    loadCiudades();
    try {
        window.localStorage.getItem('idCiudades').length;
    } catch(err) {
        window.localStorage.setItem('idCiudades', '[]');    
    }
    loadIdCiudades();

    try {
        window.localStorage.getItem('barrios').length;
    } catch(err) {
        window.localStorage.setItem('barrios', '[]');    
    }
    loadBarrios();
    try {
        window.localStorage.getItem('idBarrios').length;
    } catch(err) {
        window.localStorage.setItem('idBarrios', '[]');    
    }
    loadIdBarrios();
}




function loadAllClientes() {
    loadGlobal();
    showClientes();
}

function loadAllVendedores() {
    loadGlobal();
    showVendedores();
}

function loadAllPropiedades() {
    loadGlobal();
    showProperties();

    // for external proposes
    displayBarrios()
}

function loadAllVentas() {
    loadGlobal();
    refrescarVentas();
}

function loadAllBarrios() {
    loadGlobal();
    cargarCiudadesEnSel();
    showBarrios();
    showCiudades();
}

// Independientes

function saveClientes() { // guardar en ls
    window.localStorage.removeItem('clientes');
    window.localStorage.setItem('clientes', JSON.stringify(clientes));
}

function saveClientesBackup() {
    window.localStorage.removeItem('clientesBackup');
    window.localStorage.setItem('clientesBackup', JSON.stringify(clientesBackup));
}

function loadClientes() {
    clientes = JSON.parse(window.localStorage.getItem('clientes'));
}

function loadClientesBackup() {
    clientesBackup = JSON.parse(window.localStorage.getItem('clientesBackup'));
}




function saveVendedores() { // guardar en ls
    window.localStorage.removeItem('vendedores');
    window.localStorage.setItem('vendedores', JSON.stringify(vendedores));
}

function saveVendedoresBackup() {
    window.localStorage.removeItem('vendedoresBackup');
    window.localStorage.setItem('vendedoresBackup', JSON.stringify(vendedoresBackup));
}

function loadVendedores() {
    vendedores = JSON.parse(window.localStorage.getItem('vendedores'));
}

function loadVendedoresBackup() {
    vendedoresBackup = JSON.parse(window.localStorage.getItem('vendedoresBackup'));
}




function savePropiedades() {
    window.localStorage.removeItem('propiedades');
    window.localStorage.setItem('propiedades', JSON.stringify(propiedades));   
}

function savePropiedadesBackup() { 
    window.localStorage.removeItem('propiedadesBackup');
    window.localStorage.setItem('propiedadesBackup', JSON.stringify(propiedadesBackup));
}

function loadPropiedades() {
    propiedades = JSON.parse(window.localStorage.getItem('propiedades'));
}

function loadPropiedadesBackup() {
    propiedadesBackup = JSON.parse(window.localStorage.getItem('propiedadesBackup'));
}




function saveVentas() {
    window.localStorage.removeItem('ventas');
    window.localStorage.setItem('ventas', JSON.stringify(ventas));
}

function saveIdVentas() {
    window.localStorage.removeItem('idVentas');
    window.localStorage.setItem('idVentas', JSON.stringify(idVentas));
}

function loadVentas() {
    ventas = JSON.parse(window.localStorage.getItem('ventas'));
}

function loadIdVentas() {
    idVentas = JSON.parse(window.localStorage.getItem('idVentas'));
}




function saveCiudades() {
    window.localStorage.removeItem('ciudades');
    window.localStorage.setItem('ciudades', JSON.stringify(ciudades));
}

function saveIdCiudades() {
    window.localStorage.removeItem('idCiudades');
    window.localStorage.setItem('idCiudades', JSON.stringify(idCiudades));
}

function saveBarrios() {
    window.localStorage.removeItem('barrios');
    window.localStorage.setItem('barrios', JSON.stringify(barrios));
}

function saveIdBarrios() {
    window.localStorage.removeItem('idBarrios');
    window.localStorage.setItem('idBarrios', JSON.stringify(idBarrios));
}

function loadCiudades() {
    ciudades = JSON.parse(window.localStorage.getItem('ciudades'));
}

function loadIdCiudades() {
    idCiudades = JSON.parse(window.localStorage.getItem('idCiudades'));
}

function loadBarrios() {
    barrios = JSON.parse(window.localStorage.getItem('barrios'));
}

function loadIdBarrios() {
    idBarrios = JSON.parse(window.localStorage.getItem('idBarrios'));
}



// Utilidades

function cls() {
    window.localStorage.clear();
}