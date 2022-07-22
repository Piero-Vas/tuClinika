let docUser = aver('docUsuario');
db.collection("usuarios").doc(docUser).onSnapshot((doc) => {
        // console.log("Current data: ", doc.data());
        document.getElementById('_name_user').innerHTML = doc.data().nombres.split(' ')[0]+ ' ' + doc.data().apellidos.split(' ')[0]
        document.getElementById('_avatar_user').setAttribute('src',doc.data().foto)
    });





