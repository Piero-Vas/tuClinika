let docUser = aver('docUsuario');
db.collection("usuarios").doc(docUser).onSnapshot((doc) => {
    document.getElementById('_name_user').innerHTML = doc.data().nombres.split(' ')[0] + ' ' + doc.data().apellidos.split(' ')[0]
    document.getElementById('_avatar_user').setAttribute('src', doc.data().foto)
});


let cantidadRegistros
oTable_Especialidades = $("#_table_listas_especialidades").DataTable({
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
        {width: "50px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('text-align', 'center');
            },
            render: function (data, type, full, meta) {
                return `                        
                        <img src="${data.foto}" style="height:30px;cursor:pointer" onclick="changeImage(this,'${data.idEspecialidad}')"/>

                        `
            }
        },
        {
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {

            },
            render: function (data, type, full, meta) {
                return `
                        <div class="name_prof" onclick="changeNombreModal(this,'${data.idEspecialidad}')">${data.nombre}</div>`
            }
        },
        
        {
            width: "50px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'bottom');
            },
            render: function (data, type, full, meta) {
                let visi = '';
                if (data.eliminado == 0) {
                    visi = 'checked'
                }
                return `                     
                        <label class="switch">
                            <input type="checkbox" ${visi} onchange="chageVisibility(this,'${data.idEspecialidad}')">
                            <span class="slider round"></span>
                        </label>
                        `
            }
        },
        {
            width: "80px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('text-align', 'center');
            },
            render: function (data, type, full, meta) {
                
                let miOp = `<select class="form-select form-select-sm" onchange="changePosition(this,'${data.idEspecialidad}')">`
                let micuerpo = ``;
                let miopf = `</select>`
                for (let i = 1; i <= cantidadRegistros; i++) {
                    let op
                    if (i == data.pos) {
                        op = `<option value="${i}" selected>${i}</option>`

                    } else {
                        op = `<option value="${i}">${i}</option>`

                    }
                    micuerpo = micuerpo + op
                }
                return miOp + micuerpo + miopf
            }
        },
        // {
        //     width: "20px",
        //     data: null,
        //     createdCell: function (td, cellData, rowData, row, col) {},
        //     render: function (data, type, full, meta) {
        //         return `
                
        //         <button  title="Eliminar especialidad" class="btn btn-primary btn-primary-clinika btn-sm btn-icon-split" onclick="deleteProfesion(this,'${data.idEspecialidad}')" style="">
        //             <span class="icon text-primary">
        //                 <i class="fas fa-trash-alt"></i>
        //             </span>
        //         </button>
        //         `;
        //     }
        // }

    ]

});


function getProfesiones() {
    let profe = document.getElementById('_opt_profesion')
    db.collection("profesion")
        .orderBy("nombre")
        .onSnapshot((querySnapshot) => {

            let miarray = [];
            querySnapshot.forEach((doc) => {
                miarray.push(doc.data());
            });
            cantidadRegistros = miarray.length
            console.log(miarray)
            miarray.forEach(e=>{
                let opt = document.createElement('option')
                opt.setAttribute('value',e.idProfesion)
                opt.innerHTML = e.nombre
                profe.appendChild(opt)
            })
        });
}
function pickEspeciality(ele){    
    if(ele.value.trim()=='all'){
        db.collection("especialidad")
        .orderBy("pos")
        .onSnapshot((querySnapshot) => {
    
            let miarray = [];
            querySnapshot.forEach((doc) => {
                miarray.push(doc.data());
            });
            cantidadRegistros = miarray.length
            console.log(miarray)
            oTable_Especialidades.clear().rows.add(miarray).draw();
        });
    }else{
        db.collection("especialidad")
        .where('idProfesion',"==",ele.value)
        .orderBy("pos")
        .onSnapshot((querySnapshot) => {
    
            let miarray = [];
            querySnapshot.forEach((doc) => {
                miarray.push(doc.data());
            });
            cantidadRegistros = miarray.length
            console.log(miarray)
            oTable_Especialidades.clear().rows.add(miarray).draw();
        });

    }
}

function chageVisibility(ele, idDoc) {
    let val
    if (ele.checked == true) {
        val = 0
    } else {
        val = 1
    }
    setTimeout(() => {
        db.collection("especialidad").doc(idDoc)
            .update({
                "eliminado": val
            })

    }, 400)
}

function changePosition(el, docId) {
    db.collection("especialidad").doc(docId)
        .update({
            "pos": parseInt(el.value) 
        })
}

function changeNombreModal(inpu,docId){
    document.getElementById('_name_new').value = inpu.innerHTML.trim()
    document.getElementById('_guardar_nombre').setAttribute('doc_id',docId)
    $('#changeName').modal('show')
}

document.getElementById('_save_name_form').addEventListener('submit',(e)=>{
    e.preventDefault()
    let btn = document.getElementById('_guardar_nombre')
    saveName(btn)

})

document.getElementById('_save_image_form').addEventListener('submit',(e)=>{
    e.preventDefault()
    let btn = document.getElementById('_guardar_imagen')
    saveImageLink(btn)

})

function saveImageLink(ele){
    activar(ele)
    let docId = ele.getAttribute('id_prof')
    let valLink = document.getElementById('_link_new').value
    db.collection("especialidad").doc(docId)
    .update({
        "foto": valLink
    })
    .then(() => {
        desactivar(ele)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Imagen editada correctamente',
            showConfirmButton: false,
            timer: 1500
        })
        $('#_change_image').modal('hide')
    })
}
function saveName(ele){
    activar(ele)
    let docId = ele.getAttribute('doc_id')
    let valNombre = document.getElementById('_name_new').value
    db.collection("especialidad").doc(docId)
    .update({
        "nombre": valNombre
    })
    .then(() => {
        desactivar(ele)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Nombre editado correctamente',
            showConfirmButton: false,
            timer: 1500
        })
        $('#changeName').modal('hide')
    })
}

function verImagen(ele){
    let cuadro = document.getElementById('_place_for_image')
    if(ele.value.trim()==''){
        cuadro.setAttribute('src','https://firebasestorage.googleapis.com/v0/b/tu-clinika.appspot.com/o/imagen%20(1).png?alt=media&token=940dab5d-cef8-4265-bbe4-0be4b5e3acb2')
        console.log('a')
    }
    cuadro.setAttribute('src',ele.value)
}
function verImagenModal(ele){
    let cuadro = document.getElementById('_place_for_image_modal')
    cuadro.setAttribute('src',ele.value)
}

function _save_profesion(btn){
    
    activar(btn)
    let ele = document.getElementById('_opt_profesion')
    let name = document.getElementById('_nombre_profesion').value
    let link = document.getElementById('_link_imagen_profesion').value
    let idprof = document.getElementById('_opt_profesion').value
    if(name.trim() == '' || link.trim() == '' || ele.value.trim()=='all'){
        desactivar(btn)     
        Swal.fire(
            'Ups!',
            'Debes llenar los campos y seleccionar una profesión para registrar una especialidad',
            'warning'
          )
    }else{
        var sfDocRef = db.collection("especialidad").doc('--stats--');
        db.runTransaction((transaction) => {
            return transaction.get(sfDocRef).then((sfDoc) => {
                let miContador = sfDoc.data().cantidadEspecialidades+1
                transaction.set(sfDocRef, 
                { 
                    'cantidadEspecialidades' : miContador,
                });
                transaction.set(db.collection("especialidad").doc(`esp_${miContador}`), 
                { 
                    'eliminado' : 0,
                    'idProfesion':idprof,
                    'idEspecialidad':`esp_${miContador}`,
                    'nombre' : name,
                    'pos' : 1,
                    'foto': link
                },{merge: true});
            });
        }).then(() => {
            desactivar(btn)        
            document.getElementById('_nombre_profesion').value=''
            document.getElementById('_link_imagen_profesion').value=''
            let cuadro = document.getElementById('_place_for_image')
            cuadro.setAttribute('src','https://firebasestorage.googleapis.com/v0/b/tu-clinika.appspot.com/o/imagen%20(1).png?alt=media&token=940dab5d-cef8-4265-bbe4-0be4b5e3acb2')
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'especialidad agregada correctamente',
                showConfirmButton: false,
                timer: 1500
              })
        }).catch((error) => {
            desactivar(btn)
            Swal.fire(
                'Error',
                'Error de servidor. Comunicarse con el área de sistemas',
                'error'
              )
        });
    }
}

function deleteProfesion(ele,idProf){
    Swal.fire({
        title: '¿Eliminar especialidad?',
        text: "No podrás recuperar este registro luego de eliminarlo",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#6659FF',
        cancelButtonColor: '#bbbbbb',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar',        
      }).then((result) => {
        if (result.isConfirmed) {
            var sfDocRef = db.collection("especialidad").doc('--stats--');
            db.runTransaction((transaction) => {
                return transaction.get(sfDocRef).then((sfDoc) => {
                    let miContador = sfDoc.data().cantidadEspecialidades-1
                    transaction.set(sfDocRef, 
                    { 
                        'cantidadEspecialidades' : miContador,
                    });
                    transaction.delete(db.collection("especialidad").doc(idProf));
                });
            }).then(() => {      
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'especialidad eliminada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch((error) => {
                Swal.fire(
                    'Error',
                    'Error de servidor. Comunicarse con el área de sistemas',
                    'error'
                )
            });

          
        }
      })
}

function changeImage(ele,docProf){
    let boxImage = document.getElementById('_place_for_image_modal')
    let linkNew = document.getElementById('_link_new')
    let btn = document.getElementById('_guardar_imagen')
    btn.setAttribute('id_Prof',docProf)
    linkNew.value = ele.getAttribute('src')
    boxImage.setAttribute('src',ele.getAttribute('src'))
    $('#_change_image').modal('show')

}
getProfesiones()