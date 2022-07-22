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
                $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var today  = new Date(data.fechaRegistro);

                let dia = today.toLocaleDateString("es-ES", options);
                let ray = today.toLocaleDateString("es-ES");
                let a = new Date(data.fechaRegistro)
                let horas = a.getHours().toString().length == 1? `0${a.getHours()}`: a.getHours()
                let minutow = a.getMinutes().toString().length == 1? `0${a.getMinutes()}`: a.getMinutes()
                return `
                    <div>
                        <div class="pais_solicitud"   title="${dia}">
                            ${ray}
                        </div>
                        <div class="correo_solicitud">${horas}:${minutow}</div>
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
        .where("tipoUsuario","==",2)
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
    db.collection("calificacion")
    .where('docCalifica','==',docUsuario)
    .get()
    .then((querySnapshot)=>{
        document.querySelector('.rating_').innerHTML = querySnapshot.size
        document.querySelector('.op_c').innerHTML = `( ${querySnapshot.size} )`
        let mirating = document.querySelector('.rating_u')
        mirating.innerHTML = ''
        let nombreProf = '';
        querySnapshot.docs.forEach(e=>{
           
            let di = document.createElement('div')
            di.setAttribute('class','det_u')
            di.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-star" style="color:#F9A312;margin-right:10px"></i>

                <div><strong>${e.data().calificacion}</strong></div>
            </div>
            <div style="padding:2px 2px 2px 25px">
                <span class="nombreProf">${e.data().personaCalifica}</span>
            </div>
            <div class="_n_opinion">
                <i>${e.data().opinion}</i>
            </div>
            `
            mirating.appendChild(di)
            
        })

    })


    db.collection("usuarios")
    .doc(docUsuario)
    .get()
    .then((querySnapshot) => {
        let miarray = [];

        document.querySelector('.nombre_user').innerHTML = querySnapshot.data().nombres+' '+querySnapshot.data().apellidos
        document.querySelector('.ubi_user').innerHTML = querySnapshot.data().pais+'-'+querySnapshot.data().ciudad
        document.querySelector('.descripcion_user').innerHTML = querySnapshot.data().sobremi==''?'Sin descripción':querySnapshot.data().sobremi
        document.querySelector('.edad_').innerHTML = querySnapshot.data().edad
        
        document.querySelector('.correo_').value = querySnapshot.data().email
        document.querySelector('.edadV_').value = querySnapshot.data().edad
        document.querySelector('.altura_').value = querySnapshot.data().altura +'cm'
        document.querySelector('.peso_').value = querySnapshot.data().peso + 'kg'


        let enfermedades = document.querySelector('.enfermedades_u')
        enfermedades.innerHTML = ''
        document.querySelector('.en_c').innerHTML = `( ${querySnapshot.data().enfermedades.length} )`
        querySnapshot.data().enfermedades.forEach(e=>{
            let di = document.createElement('div')
            di.setAttribute('class','det_u')
            di.innerHTML = ' - '+e
            enfermedades.appendChild(di)
        })
        
        let alergias = document.querySelector('.alergias_u')
        alergias.innerHTML = ''
        document.querySelector('.al_c').innerHTML = `( ${querySnapshot.data().alergias.length} )`
        querySnapshot.data().alergias.forEach(e=>{
            let di = document.createElement('div')
            di.setAttribute('class','det_u')
            di.innerHTML = ' - '+e
            alergias.appendChild(di)
        })
        
        let tratamientos = document.querySelector('.tratamientos_u')
        tratamientos.innerHTML = ''
        document.querySelector('.tra_c').innerHTML = `( ${querySnapshot.data().tratamientos.length} )`
        querySnapshot.data().tratamientos.forEach(e=>{
            let di = document.createElement('div')
            di.setAttribute('class','det_u')
            di.innerHTML = ' - '+e
            tratamientos.appendChild(di)
        })
        
        let antecedentes = document.querySelector('.antecedentes_u')
        antecedentes.innerHTML = ''
        document.querySelector('.ant_c').innerHTML = `( ${querySnapshot.data().antecedentes.length} )`
        querySnapshot.data().antecedentes.forEach(e=>{
            let di = document.createElement('div')
            di.setAttribute('class','det_u')
            di.innerHTML = ' - '+e
            antecedentes.appendChild(di)
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




getSolicitudes()