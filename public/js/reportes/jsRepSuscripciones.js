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
        infoEmpty: "Suscripciones 0",
        infoFiltered: "(de _MAX_ )",
        info: "Suscripciones _TOTAL_ "
    }, 
    // Profesional
    // Suscripcion
    // Fecha Inicio
    // Fecha Fin
    // Dias Restantes
    // Tipo de Suscripcion
    columns: [
        //Profesional
        {
            
            width: "280px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                let mifoto 
                if(data.fotoP == ''){
                    mifoto = '../../img/png/person.png'
                }else{
                    mifoto = data.fotoP
                }
                console.log(data);
                console.log(data.fotoP);
                console.log(data.nombrePaciente)
                console.log(data.correo)
                return `   
                        <div style="display:flex" class="align-items-center">
                            <div style="position:relative">
                                <img src="${mifoto}" class="img_foto_prof"/>
                                <div class="online_" ></div>
                            </div>                     
                            <div>
                                <div class="nombre_solicitud">
                                    ${data.nombrePaciente}
                                </div>
                                <div class="correo_solicitud">${data.correo}</div>
                            </div>
                        </div>

                        `
            }
        },
        //Suscripcion(activa o no)
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
                if(data.activo == true){
                    estadoS = 'Activo'
                    color = 'success'
                }else if(data.activo == false){
                    estadoS = 'Inactivo'
                    color = 'danger'
                }
                return `
                <span class="badge btn-${color}-light-clinika text-${color}" style="padding:5px 8px;font-size:10px">${estadoS}</span>
                
                `;
            }
        },       
        //Fecha Inicio
        {
            width: "100px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var today  = new Date(data.fechaInicio);

                let dia = today.toLocaleDateString("es-ES", options);
                let ray = today.toLocaleDateString("es-ES");
                let a = new Date(data.fechaInicio)
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
        //Fecha Fin
        {
            width: "100px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var today  = new Date(data.fechaFin);

                let dia = today.toLocaleDateString("es-ES", options);
                let ray = today.toLocaleDateString("es-ES");
                let a = new Date(data.fechaFin)
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
        //Dias restantes          
        {
            width: "100px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                const dateI = new Date()
                const dateF = new Date(data.fechaFin)
                var day1 = Date.UTC(dateF.getFullYear(), dateF.getMonth()+1,dateF.getDate())
                var day2 = Date.UTC(dateI.getFullYear(), dateI.getMonth()+1,dateI.getDate())
                days = (1000 * 3600 * 24)
                let diferencia = (day2-day1)/days
                let diaRestante = diferencia * -1
                if(diaRestante < 0){
                    diaRestante = 0
                }
                return `
                    <div>
                        <div class="pais_solicitud"   ">
                            ${diaRestante}
                        </div>
                    </div>
                `
            }
        },
        //Tipo de Sub(mes o anual)
        {
            width: "100px",
            data: null,
            createdCell: function (td, cellData, rowData, row, col) {
                $(td).css('text-align', 'center');
                $(td).css('vertical-align', 'middle');
            },
            render: function (data, type, full, meta) {
                return `
                    <div>
                        <div class="pais_solicitud"   ">
                            ${data.nombre}
                        </div>
                    </div>
                `
            }
        }

    ]

});

function getSolicitudes() {
    let i = 0;
    let miarray = [];
    let temporal = [];
    db.collection("suscripcion")
        .orderBy("fechaInicio", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                temporal.push(doc.data());
            });
          console.log('Soy el primero');  
        })
        .then(() =>{
            miarray = temporal;
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
            temporal.forEach(function (element){
                db.collection("usuarios")
                    .where('docUsuario','==',element.docUsuario)
                    .get()
                    .then((value)=>{
                        miarray[i]['nombrePaciente'] = value.docs[0].data().nombres+' '+value.docs[0].data().apellidos
                        miarray[i]['correo'] = value.docs[0].data().email
                        miarray[i]['fotoP'] = value.docs[0].data().foto
                }).then(()=>{
                    i++;
                })

            });
            console.log('Soy el ultimo'); 
            console.log(miarray);
            oTable_Solicitudes.clear().rows.add(miarray).draw();
            
        }

        )
        
        ;
}


getSolicitudes()