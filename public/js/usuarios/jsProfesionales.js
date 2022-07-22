let docUser = aver('docUsuario');
db.collection("usuarios").doc(docUser).onSnapshot((doc) => {
    document.getElementById('_name_user').innerHTML = doc.data().nombres.split(' ')[0] + ' ' + doc.data().apellidos.split(' ')[0]
    document.getElementById('_avatar_user').setAttribute('src', doc.data().foto)
});


oTable_Solicitudes = $("#_table_listas_solicitudes").DataTable({
    responsive: true,
    pageLength: 20,
    lengthMenu: [
        [5, 10, 20, -1],
        [5, 10, 20, 'Todos']
    ],
    data: null,
    ordering: false,
    language: {
        zeroRecords: '<span style="filter: opacity(0.5);"><i class="fas fa-search" style="font-size:45px;margin-top:15px;margin-bottom: 15px;"></i><br><br> <b>Sin resultados</b></p><p style="color:#d4d4d4">No se encontró ninguna solicitud</p> </span>',
        emptyTable: '<span style="filter: opacity(0.5);"><i class="fas fa-search" style="font-size:45px;margin-top:15px;margin-bottom: 15px;"></i><br><br> <b>Sin resultados</b></p><p style="color:#d4d4d4">No se encontró ninguna solicitud</p> </span>',
        lengthMenu: "Mostrar _MENU_ registros",
        paginate: {
            "first": "Primero",
            "last": "Último",
            "next": "",
            "previous": ""
        },
        lengthMenu: "_MENU_",
        search: "",
        infoEmpty: "Profesiones 0",
        infoFiltered: "(de _MAX_ )",
        info: "Profesiones _TOTAL_ "
    },
    columns: [
        {
            width: "280px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                let mifoto 
                if(data.foto == ''){
                    mifoto = '../../img/png/person.png'
                }else{
                    mifoto = data.foto
                }
                let color
                if(data.statusConnexion == true){
                    color = '#50cd89'
                }else{
                    color = '#cdcdcd'
                }
                return `   
                        <div style="display:flex" class="align-items-center">
                        <div style="position:relative">
                            <img src="${mifoto}" class="img_foto_prof"/>
                            <div class="online_" style="background:${color}"></div>
                        </div>                     
                        <div>
                        <div class="nombre_solicitud">
                        ${data.nombres} ${data.apellidos}
                        </div>
                        <div class="correo_solicitud">${data.email}</div>
                        </div>
                        </div>

                        `
            }
        },
        {
            width: "100px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                // $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                
                
                return `
                <div>
                <div class="nombre_solicitud">
                ${data.pass} 
                </div>
                
           </div>
                `
            }
        },
        {
            width: "100px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                // $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                
                
                return `
                <div>
                <div class="nombre_solicitud">
                ${data.profesion} 
                </div>
                <div class="correo_solicitud">${data.especialidad}</div>
           </div>
                `
            }
        },
        {
            width: "40px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                // $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                
                
                return `
                <div>
                <div class="nombre_solicitud">
                ${data.pais} 
                </div>
                <div class="correo_solicitud">${data.ciudad}</div>
           </div>
                `
            }
        },
        
                   
        {
            width: "40px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                let estadoS
                let color
                if(data.eliminado == 0){
                    estadoS = 'Activo'
                    color = 'success'
                }else if(data.eliminado == 1){
                    estadoS = 'Inactivo'
                    color = 'danger'
                }
                return `
                <span class="badge btn-${color}-light-clinika text-${color}" style="padding:5px 8px;font-size:10px">${estadoS}</span>
                
                `;
            }
        },
        {
            width: "20px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                return `
                
                <button  title="Ver detalles"  class="btn btn-primary btn-primary-clinika btn-sm btn-icon-split" onclick="verModalDetalle(this,'${data.docUsuario}')">
                    <span class="icon text-primary">
                        <i class="fas fa-eye"></i>
                    </span>
                </button>
                
                `;
            }
        }

    ]

});

function getSolicitudes() {
    db.collection("usuarios")
        .where("tipoUsuario","==",1)
        .orderBy("fechaRegistroMilisegundos", "desc")
        .onSnapshot((querySnapshot) => {
            let miarray = [];
            querySnapshot.forEach((doc) => {
                miarray.push(doc.data());
            });
            console.log(miarray)
            oTable_Solicitudes.clear().rows.add(miarray).draw();
        });
}

function getProfesiones(){
    let proO = document.getElementById('_opt_profesion')
    let espO = document.getElementById('_opt_especialidad')
    db.collection("profesion")
    .where("eliminado","==",0)
    .orderBy("nombre")
    .onSnapshot((querySnapshot) => {
        let miarray = [];
        proO.innerHTML = ''
        espO.innerHTML = ''
        // <option value="all" disabled>Selecciona una profesión</option>
        let op = document.createElement('option')
        op.setAttribute('value','')
        op.setAttribute('disabled','disabled')
        op.setAttribute('selected','selected')
        op.innerHTML = 'Selecciona una profesión'
        proO.appendChild(op)
        querySnapshot.forEach((doc) => {
            let op = document.createElement('option')
            op.setAttribute('value',doc.data().idProfesion)
            op.setAttribute('name_prof',doc.data().nombre)
            op.innerHTML = doc.data().nombre
            proO.appendChild(op)
            miarray.push(doc.data());
        });
        console.log(miarray)
    });
}

function getEspecialidad(){
    let proO = document.getElementById('_opt_profesion')
    let espO = document.getElementById('_opt_especialidad')
    let vaProfesion = proO.value
    db.collection("especialidad")
    .where("eliminado","==",0)
    .where("idProfesion","==",vaProfesion)
    .orderBy('nombre')
    .get()
    .then((querySnapshot) => {
        let miarray = [];
        espO.innerHTML = ''
        let op = document.createElement('option')
        op.setAttribute('value','')
        op.setAttribute('disabled','disabled')
        op.setAttribute('selected','selected')
        op.innerHTML = 'Selecciona una especialidad'
        espO.appendChild(op)
        querySnapshot.forEach((doc) => {
            let op = document.createElement('option')
            op.setAttribute('value',doc.data().idEspecialidad)
            op.setAttribute('name_prof',doc.data().nombre)
            op.innerHTML = doc.data().nombre
            espO.appendChild(op)
            miarray.push(doc.data());
        });
        console.log(miarray)
    })  
}

document.getElementById('_reg_prof').addEventListener('submit',(e)=>{
    e.preventDefault()
    let btn = document.getElementById('_crear_profesional_btn')

    let nombre = document.getElementById('_nombre_profesional')
    let apellido = document.getElementById('_apellido_profesional')
    let correo = document.getElementById('_correo_profesional')
    let pass = document.getElementById('_pass_profesional')
    let pais = document.getElementById('_pais_profesional')
    let ciudad = document.getElementById('_ciudad_profesional')
    let sexo = document.getElementById('_sexo_profesional')
    let edad = document.getElementById('_edad_profesional')
    let profesion = document.getElementById('_opt_profesion')
    let especialidad = document.getElementById('_opt_especialidad')

    if(profesion.value.trim() == '' || especialidad.value.trim() == ''){
        Swal.fire(
            'Ups!',
            'Debes llenar los campos y seleccionar una profesión y especialidad',
            'warning'
          )
    }else{
        activar(btn)   
        var sfDocRef = db.collection("usuarios").doc('--stats--');
        db.runTransaction((transaction) => {
            let timeAhora = Date.now()
            let hoy = new Date(timeAhora)
            let momento = hoy.toISOString()
            let fin = momento.toString().substr(0,23)+'000'
            return transaction.get(sfDocRef).then((sfDoc) => {
                let miContador = sfDoc.data().cantidadProfesionales+1
                let miContadorUsu = sfDoc.data().cantidadUsuarios
                let miContadorAdmin = sfDoc.data().cantidadAdmin
                transaction.set(sfDocRef, 
                {   'cantidadUsuarios': miContadorUsu,
                    'cantidadProfesionales' : miContador,
                    'cantidadAdmin' : miContadorAdmin
                });
                transaction.set(db.collection("usuarios").doc(`pro_${miContador}`), 
                { 
                    'altura'                        : 0,
                    'apellidos'                     : apellido.value,
                    'app'                           : 1,
                    'bloqueos'                      : [],
                    'calificacion'                  : 0,
                    'calificacionCantidad'          : 0,
                    'ciudad'                        : ciudad.value,
                    'contactos'                     : [],
                    'docUsuario'                    : `pro_${miContador}`,
                    'edad'                          : parseInt(edad.value),
                    'eliminado'                     : 0,
                    'email'                         : correo.value,
                    'especialidad'                  : $('#_opt_especialidad').find('option:selected').text(),
                    'fechaRegistro'                 : fin,
                    'fechaRegistroMilisegundos'     : timeAhora,
                    'foto'                          : '',
                    'idEspecialidad'                : especialidad.value,
                    'idProfesion'                   : profesion.value,
                    'idUsuario'                     : miContador,
                    'nombres'                       : nombre.value,
                    'pais'                          : pais.value,
                    'pass'                          : pass.value,
                    'peso'                          : 0,
                    'primeraVez'                    : 1,
                    'profesion'                     : $('#_opt_profesion').find('option:selected').text(),
                    'sexo'                          : sexo.value,
                    'sobremi'                       : '',
                    'statusConnexion'               : false,
                    'tipoUsuario'                   : 1,
                    'token_MAC'                     : '',
                    'telefono'                      : '',
                    'alergias'                      :[],
                    'antecedentes'                  :[],
                    'enfermedades'                  :[],
                    'tratamientos'                  :[],
                },{merge: true});
            });
        }).then(() => {
            desactivar(btn)  
            $('#_modal_create_profesional').modal('hide')
            limpiarCrearProfesionales()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cuenta profesional creada correctamente',
                showConfirmButton: false,
                timer: 1500
              })

        }).catch((error) => {
            desactivar(btn)
            console.log(error)
            Swal.fire(
                'Error',
                'Error de servidor. Comunicarse con el área de sistemas',
                'error'
              )
        });


    }





})


function limpiarCrearProfesionales(){
    document.getElementById('_nombre_profesional').value=''
    document.getElementById('_apellido_profesional').value=''
    document.getElementById('_correo_profesional').value=''
    document.getElementById('_pass_profesional').value=''
    document.getElementById('_pais_profesional').value=''
    document.getElementById('_ciudad_profesional').value=''
    document.getElementById('_edad_profesional').value=''
}




function modalCrearProfesional(){
    $('#_modal_create_profesional').modal('show')
}


function verModalDetalle(ele,id){
    getDetailProfie(id)
    $('#_ver_detail_modal').modal('show')
}


function getDetailProfie(docUsuario){
    db.collection("usuarios")
    .doc(docUsuario)
    // .where("eliminado","==",0)
    // .where("idUsuario","==",idUsuario)
    .get()
    .then((querySnapshot) => {
        let miarray = [];
        document.querySelector('.nombre_user').innerHTML = querySnapshot.data().nombres+' '+querySnapshot.data().apellidos
        document.querySelector('.ubi_user').innerHTML = querySnapshot.data().pais+'-'+querySnapshot.data().ciudad
        document.querySelector('.descripcion_user').innerHTML = querySnapshot.data().sobremi==''?'Sin descripción':querySnapshot.data().sobremi
        document.querySelector('.edad_').innerHTML = querySnapshot.data().edad
        document.querySelector('.rating_').innerHTML = querySnapshot.data().calificacion
        document.querySelector('.correo_').value = querySnapshot.data().email
        document.querySelector('.edadV_').value = querySnapshot.data().edad
        document.querySelector('.profesion_').value = querySnapshot.data().profesion
        document.querySelector('.especialidad_').value = querySnapshot.data().especialidad

        let contactosp = document.querySelector('.contactos_p')
        contactosp.innerHTML = ''
        document.querySelector('.co_c').innerHTML = `( ${querySnapshot.data().contactos.length} )`
        let misContactosArray = []
        querySnapshot.data().contactos.forEach(e=>{
            // misContactosArray.push(e)
            db.collection("usuarios")
            .where('docUsuario','==',e)
            .get()
            .then((value)=>{
                let di = document.createElement('div')
                di.setAttribute('class','det_u')
                di.innerHTML = `
                <div class="d-flex" style="padding-bottom: 10px;border-bottom: 1px #e3e3e3 solid;">
                    <div>
                        <img class="img_prof" src="${value.docs[0].data().foto==''?'../../img/png/person.png':value.docs[0].data().foto}" />
                    </div>
                    <div>
                        <div class="nombreProf">
                        ${value.docs[0].data().nombres+' '+value.docs[0].data().apellidos}
                        </div>
                        <div class="ubigeo_prof">
                        ${value.docs[0].data().pais+' - '+value.docs[0].data().ciudad}
                        </div>
                    </div>
                </div>
                `
                contactosp.appendChild(di)

            })
        })

        let mischat = document.querySelector('.chat_u')
        mischat.innerHTML = ''
        // document.querySelector('.repo_c').innerHTML = `( ${querySnapshot.data().bloqueos.length} )`
            
            db.collection("salas")
            .where('usuariosChat','array-contains',docUsuario)  
            .get()
            .then((value)=>{
                document.querySelector('.ch_c').innerHTML = `( ${value.docs.length} )`
                
                value.docs.forEach(e=>{
                    let misChatusu = []
                    e.data().usuariosChat.forEach(e=>{
                        if(e != docUsuario){
                            misChatusu.push(e);
                        }
                    })

                    db.collection("usuarios")
                    .where('docUsuario','==',misChatusu[0])
                    .get()
                    .then((value)=>{
                        let di = document.createElement('div')
                        di.setAttribute('class','det_u')
                        di.setAttribute('style','cursor:pointer')
                        di.setAttribute('idSala',e.data().idSala)
                        di.setAttribute('otroChat',misChatusu[0])
                        di.setAttribute('miChat',docUsuario)
                        di.setAttribute('onclick','verChat(this)')
                        di.innerHTML = `
                        <div class="d-flex" style="padding-bottom: 10px;border-bottom: 1px #e3e3e3 solid;">
                            <div>
                                <img class="img_prof" src="${value.docs[0].data().foto==''?'../../img/png/person.png':value.docs[0].data().foto}" />
                            </div>
                            <div>
                                <div class="nombreProf">
                                ${value.docs[0].data().nombres+' '+value.docs[0].data().apellidos}
                                </div>
                                <div class="ubigeo_prof">
                                <i>${value.docs[0].data().email}</i>
                                </div>
                            </div>
                        </div>
                        `
                        mischat.appendChild(di)
                    })
                })
            })


        let bloqueados = document.querySelector('.bloqueo_u')
        bloqueados.innerHTML = ''
        document.querySelector('.bl_c').innerHTML = `( ${querySnapshot.data().bloqueos.length} )`
        querySnapshot.data().bloqueos.forEach(e=>{
            db.collection("usuarios")
            .where('docUsuario','==',e)
            .get()
            .then((value)=>{
                let di = document.createElement('div')
                di.setAttribute('class','det_u')
                di.innerHTML = `
                <div class="d-flex" style="padding-bottom: 10px;border-bottom: 1px #e3e3e3 solid;">
                    <div>
                        <img class="img_prof" src="${value.docs[0].data().foto==''?'../../img/png/person.png':value.docs[0].data().foto}" />
                    </div>
                    <div>
                        <div class="nombreProf">
                        ${value.docs[0].data().nombres+' '+value.docs[0].data().apellidos}
                        </div>
                        <div class="ubigeo_prof">
                        ${value.docs[0].data().pais+' - '+value.docs[0].data().ciudad}
                        </div>
                    </div>
                </div>
                `
                bloqueados.appendChild(di)

            })
        })

        let misreportes = document.querySelector('.reportes_u')
        misreportes.innerHTML = ''
        // document.querySelector('.repo_c').innerHTML = `( ${querySnapshot.data().bloqueos.length} )`
            
            db.collection("reporte")
            .where('docEnvia','==',docUsuario)  
            .get()
            .then((value)=>{
                document.querySelector('.repo_c').innerHTML = `( ${value.docs.length} )`
                value.docs.forEach(e=>{
                    db.collection("usuarios")
                    .where('docUsuario','==',e.data().docRecibe)
                    .get()
                    .then((value)=>{
                        let di = document.createElement('div')
                        di.setAttribute('class','det_u')
                        di.innerHTML = `
                        <div class="d-flex" style="padding-bottom: 10px;border-bottom: 1px #e3e3e3 solid;">
                            <div>
                                <img class="img_prof" src="${value.docs[0].data().foto==''?'../../img/png/person.png':value.docs[0].data().foto}" />
                            </div>
                            <div>
                                <div class="nombreProf">
                                ${value.docs[0].data().nombres+' '+value.docs[0].data().apellidos}
                                </div>
                                <div class="ubigeo_prof">
                                <i>${e.data().contenido}</i>
                                </div>
                            </div>
                        </div>
                        `
                        misreportes.appendChild(di)
                    })
                })
            })
        

    db.collection("calificacion")
    .where('docCalificado','==',docUsuario)
    .get()
    .then((querySnapshot)=>{
        document.querySelector('.op_c').innerHTML = `( ${querySnapshot.size} )`
        let mirating = document.querySelector('.rating_u')
        mirating.innerHTML = ''
        querySnapshot.docs.forEach(e=>{   

            let di = document.createElement('div')
            di.setAttribute('class','det_u')
            di.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-star" style="color:#F9A312;margin-right:10px"></i>

                <div><strong>${e.data().calificacion}</strong></div>
            </div>
            <div style="padding:2px 2px 2px 25px">
                <span class="nombreProf id_${e.data().fechaMilisegundos.toString()}"></span>
            </div>
            <div class="_n_opinion">
                <i>${e.data().opinion}</i>
            </div>
            `
            mirating.appendChild(di)
            
            
                db.collection("usuarios")
                .where('docUsuario','==',e.data().docCalifica)
                .get()
                .then((value)=>{
                    document.querySelector(`.id_${e.data().fechaMilisegundos.toString()}`).innerHTML = value.docs[0].data().nombres+' '+value.docs[0].data().apellidos
                })

        })

    })



        let miFoto = querySnapshot.data().foto==''?'../../img/png/person.png':querySnapshot.data().foto
        document.querySelector('.avatar_user_detail').setAttribute('src',miFoto)
        if(querySnapshot.data().statusConnexion == true){
            
            document.querySelector('.online_detail').setAttribute('style','background:#50cd89')
        }else{
            document.querySelector('.online_detail').setAttribute('style','background:#cdcdcd')

        }
        
        // querySnapshot.forEach((doc) => {
            
            //     console.log(doc.data())
            // });
        })  
        db.collection("salas")
        .where("usuariosChat","array-contains",docUsuario)
        // .where("idUsuario","==",idUsuario)
        .get()
        .then((querySnapshotR) => {
        document.querySelector('.chats_').innerHTML = querySnapshotR.size
        
    })  

}


function verChat(elemento){
    let idSala = elemento.getAttribute('idSala')
    let otroChat = elemento.getAttribute('otroChat')
    let miChat = elemento.getAttribute('miChat')




    document.querySelector('.espacio_chat').innerHTML=`
    <div style="width:100%;text-align:center">
        <div class="spinner-border text-primary mt-4" role="status">
            <span class="sr-only">Loading...</span>
        </div> 
    </div>
`
    mostrarChat()

        let misreportes = document.querySelector('.espacio_chat')
        
        db.collection("mensajes")
        .where('idSala','==', idSala)  
        .get()
        .then((value)=>{
            misreportes.innerHTML = ''
            console.log(value.docs[0].data())
            value.docs.forEach(e=>{
                if(e.data().enviado_por == otroChat){
                    let di = document.createElement('div')
                    di.setAttribute('class','det_u_c')

                    if(e.data().tipoMensaje == 1){
                        di.innerHTML = `
                        <div class="elqueenvia" >
                            ${e.data().mensaje}
                        </div>
                        `
                        
                    }else if(e.data().tipoMensaje == 2){
                        di.innerHTML = `
                        <div class="elqueenvia" >
                            <img src="${e.data().fotomensaje}" style="width:100%"/>
                            <br>
                            <br>
                            <div>
                            ${e.data().mensaje}
                            </div>
                        </div>
                        `
                    }else if(e.data().tipoMensaje == 3){
                        di.innerHTML = `
                        <div class="elqueenvia" >                        
                            <a href="${e.data().fotomensaje}" download="${e.data().nombreArchivo}">
                                <img src="../../img/png/adjunto.png" style="width:30px;margin-right:10px"/>
                            ${e.data().nombreArchivo}
                            </a>
                        </div>
                        `
                        
                    }else if(e.data().tipoMensaje == 4){
                        di.innerHTML = `
                        <div class="elqueenvia" >
                        <audio controls style="width: 100%;">
                        <source src="${e.data().fotomensaje}" type="audio/ogg">
                        <source src="${e.data().fotomensaje}" type="audio/mpeg">
                        Your browser does not support the audio element.
                        </audio>                            
                        </div>`
                        
                    }
                    misreportes.appendChild(di)
                }else{
                    let di = document.createElement('div')
                    di.setAttribute('class','det_u_c')
                    
                    if(e.data().tipoMensaje == 1){
                        di.innerHTML = `
                        <div class="elquerecibe" style="margin-left: auto;">
                            ${e.data().mensaje}
                        </div>
                        `
                        
                    }else if(e.data().tipoMensaje == 2){
                        di.innerHTML = `
                        <div class="elquerecibe" style="margin-left: auto;">
                            <img src="${e.data().fotomensaje}" style="width:100%"/>
                            <br>
                            <br>
                            <div>
                            ${e.data().mensaje}
                            </div>
                        </div>
                        `
                    }else if(e.data().tipoMensaje == 3){
                        di.innerHTML = `
                        <div class="elquerecibe" style="margin-left: auto;">
                            <a href="${e.data().fotomensaje}" download="${e.data().nombreArchivo}">
                                <img src="../../img/png/adjunto.png" style="width:30px;margin-right:10px"/>
                            ${e.data().nombreArchivo}
                            </a>
                        </div>
                        `
                        
                    }else if(e.data().tipoMensaje == 4){
                        di.innerHTML = `
                        <div class="elquerecibe" style="margin-left: auto;">
                        <audio controls style="width: 100%;">
                        <source src="${e.data().fotomensaje}" type="audio/ogg">
                        <source src="${e.data().fotomensaje}" type="audio/mpeg">
                        Your browser does not support the audio element.
                        </audio>                            
                        </div>`
                        
                    }

                    misreportes.appendChild(di)

                }
            })
            })


}

function mostrarChat(){
    let ch = document.querySelector('._ver_chat')
    ch.classList.add('_ver_chat_active')
}
function cerrarChat(){
    let ch = document.querySelector('._ver_chat')
    ch.classList.remove('_ver_chat_active')
}








getProfesiones()
getSolicitudes()