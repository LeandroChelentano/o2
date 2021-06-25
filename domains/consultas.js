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

function showTransacciones() {
    toggleMenu();
    document.getElementById('transacciones').style.display = 'block'
}

function showMasCostosa() {
    if (document.getElementById('ventaCara').style.display == 'block') {
        document.getElementById('ventaCara').style.display = 'none';
    } else {
        document.getElementById('ventaCara').style.display = 'block';
    }
}