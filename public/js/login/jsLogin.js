const _user = document.getElementById('_user')
const _pass = document.getElementById('_pass')
const _btn = document.querySelector('.loaderButtonLogin')

document.getElementById('_form_welcome').addEventListener('submit',(e)=>{
    e.preventDefault()
    activar(_btn)
    
    db.collection("usuarios")
    .where("email", "==", _user.value)
    .where("pass","==",_pass.value)
    .where("app","==",3)
    .where("eliminado","==",0)
    .where("tipoUsuario","==",0)
    .get()
    .then((querySnapshot) => {        
        if(!querySnapshot.empty){
            desactivar(_btn)
            querySnapshot.forEach((doc) => {               
                iniciarSesion(doc.data().email,
                doc.data().docUsuario)
            });

        }else{
            desactivar(_btn)
            Swal.fire(
                'Ups',
                'Credenciales incorrectas',
                'error'
              )
        }
    })
    .catch((error) => {
        desactivar(_btn)
        console.log("Error getting documents: ", error);
    });

})