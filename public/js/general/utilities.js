
function iniciarSesion(user,docUsuario){  
    document.cookie = "docUsuario = " + docUsuario;
    document.cookie = "email = " + user;
    window.location = "./Dashboard.html";
}

function cerrarSesion(){
    document.cookie="docUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie="email=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie="nombres=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie="apellidos=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location = "./index.html";
}

function activar(elemento){    
    let texto = elemento.querySelector('span');
    let spiner = elemento.querySelector('.spinner');
    texto.classList.toggle('loaderUnactive');
    spiner.classList.toggle('loaderUnactive');
    // spiner.classList.remove('loaderActive');
    // spiner.classList.add('loaderActive');
}

function desactivar(elemento){    
    let texto = elemento.querySelector('span');
    let spiner = elemento.querySelector('.spinner');
    texto.classList.toggle('loaderUnactive');
    spiner.classList.toggle('loaderUnactive');
}

function aver(name){
    return document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1") || null;
}

