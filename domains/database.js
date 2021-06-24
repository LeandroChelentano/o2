function loadAllClientes() {
    try {
        window.localStorage.getItem('clientes').length;
    } catch(err) {
        window.localStorage.setItem('clientes', '[]');    
    }
    try {
        window.localStorage.getItem('clientesBackup').length;
    } catch(err) {
        window.localStorage.setItem('clientesBackup', '[]');    
    }
    try {
        window.localStorage.getItem('vendedores').length;
    } catch(err) {
        window.localStorage.setItem('vendedores', '[]');    
    }
    loadClientes();
    loadClientesBackup();
    loadVendedores();
    // loadVentas();
    var ventas = new Array()
    showClientes();
}

function loadAllVendedores() {
    try {
        window.localStorage.getItem('vendedores').length;
    } catch(err) {
        window.localStorage.setItem('vendedores', '[]');    
    }
    try {
        window.localStorage.getItem('vendedoresBackup').length;
    } catch(err) {
        window.localStorage.setItem('vendedoresBackup', '[]');    
    }
    loadVendedores();
    loadVendedoresBackup();
    // loadVentas();
    var ventas = new Array()
    showVendedores();
}

function loadAllPropiedades() {
    try {
        window.localStorage.getItem('clientes').length;
    } catch(err) {
        window.localStorage.setItem('clientes', '[]');    
    }
    loadClientes();
    
    try {
        window.localStorage.getItem('propiedades').length;
    } catch(err) {
        window.localStorage.setItem('propiedades', '[]');
    }
    try {
        window.localStorage.getItem('propiedadesBackup').length;
    } catch(err) {
        window.localStorage.setItem('propiedadesBackup', '[]');
    }
    loadPropiedades();
    loadPropiedadesBackup();
    showProperties();
}

function loadAllVentas() {
    try {
        window.localStorage.getItem('clientes').length;
    } catch(err) {
        window.localStorage.setItem('clientes', '[]');    
    }
    try {
        window.localStorage.getItem('vendedores').length;
    } catch(err) {
        window.localStorage.setItem('vendedores', '[]');    
    }
    loadClientes();
    loadVendedores();

    try {
        window.localStorage.getItem('propiedades').length;
    } catch(err) {
        window.localStorage.setItem('propiedades', '[]');
    }
    try {
        window.localStorage.getItem('propiedadesBackup').length;
    } catch(err) {
        window.localStorage.setItem('propiedadesBackup', '[]');
    }
    loadPropiedades();
    loadPropiedadesBackup();

    try {
        window.localStorage.getItem('ventas').length;
    } catch(err) {
        window.localStorage.setItem('ventas', '[]'); 
    }
    try {
        window.localStorage.getItem('idVentas').length;
    } catch(err) {
        window.localStorage.setItem('idVentas', '[]'); 
    }
    loadVentas();
    loadIdVentas();
    refrescarVentas();
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



// Utilidades

function cls() {
    window.localStorage.clear();
}