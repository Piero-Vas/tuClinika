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
                return `                        
                       <div>
                            <div class="nombre_solicitud">
                            ${data.nombres} ${data.apellidos}
                            </div>
                            <div class="correo_solicitud">${data.correo}</div>
                       </div>

                        `
            }
        },
        {
            width: "90px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                return `
                <div class="colegiatura_solicitud">
                ${data.colegiatura}
                </div>        
                `
            }
        },
        {
            width: "250px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                // $(td).css('text-align', 'center');
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
            width: "90px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
               
                return `                     
                       <div class="pais_solicitud">
                       ${data.pais}
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
                
                
                return `
                    <img src="${data.fotocredencial}" class="img_solicitud" onclick="verImagen('${data.fotocredencial}')" style="cursor:pointer" />
                        
                    
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
                var today  = new Date(data.fecha);

                let dia = today.toLocaleDateString("es-ES", options);
                let ray = today.toLocaleDateString("es-ES");
                let a = new Date(data.fecha)
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
            width: "20px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {},
            render: function (data, type, full, meta) {
                return `
                
                <button  title="Aprobar solicitud"  class="btn btn-primary btn-success-clinika btn-sm btn-icon-split" onclick="aprobarSolicitud(this,'${data.id}')">
                    <span class="icon text-success">
                        <i class="fas fa-check"></i>
                    </span>
                </button>
                <button  title="Desaprobar solicitud" class="btn btn-primary btn-danger-clinika btn-sm btn-icon-split" onclick="desaprobarSolicitud(this,'${data.id}')">
                    <span class="icon text-danger">
                        <i class="fas fa-times"></i>
                    </span>
                </button>
                `;
            }
        }

    ]

});

function getSolicitudes() {
    db.collection("pro_solicitudes")
        .where('estado',"==",0)
        .orderBy("fechaMilisegundos", "desc")
        .onSnapshot((querySnapshot) => {
            let miarray = [];
            let miarrayId = [];
            querySnapshot.forEach((doc) => {
                miarray.push(Object.assign(doc.data(),{'id':doc.id}));
            });
            console.log(miarray)
            oTable_Solicitudes.clear().rows.add(miarray).draw();
        });
}

function verImagen(link){
    let ima = document.getElementById('_lugar_de_imagen')
    let imao = document.getElementById('ver_original')
    imao.setAttribute('href',link)
    ima.setAttribute('src',link)
    $('#_image_mdodal').modal('show')
}

function aprobarSolicitud(ele,id){
    Swal.fire({
        title: '¿Aprobar solicitud?',
        text: "No olvides crear su usuario en el apartado de USUARIOS PROFESIONALES",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#6659FF',
        cancelButtonColor: '#bbbbbb',
        confirmButtonText: 'Si, aprobar!',
        cancelButtonText: 'Lo pensaré',        
      }).then((result) => {
        if (result.isConfirmed) {
            db.collection("pro_solicitudes")
            .doc(id)
            .update({
            "estado": 1
            }).then((querySnapshot) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Solicitud aprobada! No olvides crear su usuario profesional',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
            .catch((error) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error de servidor',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
        }
      })
}
function desaprobarSolicitud(ele,id){
    Swal.fire({
        title: '¿Rechazar solicitud?',
        text: "No cumple con los requisitos",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#6659FF',
        cancelButtonColor: '#bbbbbb',
        confirmButtonText: 'Si, rechazar!',
        cancelButtonText: 'Lo pensaré',        
      }).then((result) => {
        if (result.isConfirmed) {
            db.collection("pro_solicitudes")
            .doc(id)
            .update({
            "estado": 2
            }).then((querySnapshot) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Solicitud rechazada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch((error) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error de servidor',
                    showConfirmButton: false,
                    timer: 2000
                })
            });
        }
      })
}
function verSolicitudesEstado(){
    var batch = db.batch();
    
    db.collection("pro_solicitudes")
    .where('visto',"==",0)
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc)=>{
            console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
            batch.update(db.collection("pro_solicitudes").doc(doc.id),{'visto':1})
        })
        batch.commit()
    });
}
verSolicitudesEstado()
getSolicitudes()