let docUser = aver("docUsuario");
db.collection("usuarios")
  .doc(docUser)
  .onSnapshot((doc) => {
    document.getElementById("_name_user").innerHTML =
      doc.data().nombres.split(" ")[0] +
      " " +
      doc.data().apellidos.split(" ")[0];
    document
      .getElementById("_avatar_user")
      .setAttribute("src", doc.data().foto);
  });

oTable_Solicitudes = $("#_table_listas_solicitudes").DataTable({
  responsive: true,
  pageLength: 20,
  lengthMenu: [
    [5, 10, 20, -1],
    [5, 10, 20, "Todos"],
  ],
  data: null,
  ordering: false,
  language: {
    zeroRecords:
      '<span style="filter: opacity(0.5);"><i class="fas fa-search" style="font-size:45px;margin-top:15px;margin-bottom: 15px;"></i><br><br> <b>Sin resultados</b></p><p style="color:#d4d4d4">No se encontró ninguna solicitud</p> </span>',
    emptyTable:
      '<span style="filter: opacity(0.5);"><i class="fas fa-search" style="font-size:45px;margin-top:15px;margin-bottom: 15px;"></i><br><br> <b>Sin resultados</b></p><p style="color:#d4d4d4">No se encontró ninguna solicitud</p> </span>',
    lengthMenu: "Mostrar _MENU_ registros",
    paginate: {
      first: "Primero",
      last: "Último",
      next: "",
      previous: "",
    },
    lengthMenu: "_MENU_",
    search: "",
    infoEmpty: "Chats 0",
    infoFiltered: "(de _MAX_ )",
    info: "Chats _TOTAL_ ",
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
      /* width: "280px", */
      data: null,
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).css("vertical-align", "middle");
      },
      render: function (data, type, full, meta) {
        return `   
                        <div style="display:flex" class="align-items-center">
                            <div style="position:relative">
                                <img src="1" class="img_foto_prof"/>
                                <div class="online_" ></div>
                            </div>                     
                            <div>
                                <div class="nombre_solicitud">
                                ${data.idSala}
                                </div>
                                <div class="correo_solicitud">
                                ${data.idSala}</div>
                            </div>
                        </div>

                        `;
      },
    },
    //Suscripcion(activa o no)
    {
      /* width: "40px", */
      data: null,
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).css("text-align", "center");
        $(td).css("vertical-align", "middle");
      },
      render: function (data, type, full, meta) {
        let estadoS;
        let color;

        return `
                <span class="badge " style="padding:5px 8px;font-size:10px">${data.idSala}</span>
                
                `;
      },
    },
    {
     /*  width: "20px", */
      data: null,
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).css("text-align", "center");
        $(td).css("vertical-align", "middle");
      },
      render: function (data, type, full, meta) {
        let misChatusu = []
        data.usuariosChat.forEach(e=>{
          if(e!='admin_1'){
            misChatusu.push(e)
          }
        })
        return `
                <button  title="Ver chat"  class="btn btn-primary btn-primary-clinika btn-sm btn-icon-split" onclick="verChat('${data.idSala}','${misChatusu[0]}')">
                    <span class="icon text-primary">
                    <i class="fa fa-comment-dots"></i>
                    </span>
                </button>
                
                `;
      },
    },
  ],
});

function getSolicitudes() {
  db.collection("salas")
    .where("usuariosChat", "array-contains", 'admin_1')
    .get()
    .then((value) => {
      let miarray = [];
      value.forEach((doc) => {
        miarray.push(doc.data());
      });
      
      
      oTable_Solicitudes.clear().rows.add(miarray).draw();
      
    });
}
function verChat(idSala1,otroChat1) {
  let idSala = idSala1;
  let otroChat = otroChat1;

  document.querySelector(".espacio_chat").innerHTML = `
    <div style="width:100%;text-align:center">
        <div class="spinner-border text-primary mt-4" role="status">
            <span class="sr-only">Loading...</span>
        </div> 
    </div>
    
`;
  document.querySelector(".body_c").innerHTML = `
                <input id="mensaje" class="mensaje" placeholder="Mensaje" type="text"><button  title="Ver chat"  class="btn btn-primary btn-primary-clinika btn-sm btn-icon-split" onclick="enviarMensaje('${idSala1}','${otroChat1}')">
                    <span class="icon" style="border-radius: 0%; border: solid 2px #0047BB; color:#0047BB">
                    <i class="fa fa-paper-plane" ></i>
                    </span>
                </button>
  `;
  mostrarChat();
  let misreportes = document.querySelector(".espacio_chat");
  db.collection("mensajes")
    .where("idSala", "==", idSala)
    .get()
    .then((value) => {
      misreportes.innerHTML = "";
      value.docs.forEach((e) => {
        if (e.data().enviado_por == otroChat) {
          let di = document.createElement("div");
          di.setAttribute("class", "det_u_c");

          if (e.data().tipoMensaje == 1) {
            const dateF = new Date(e.data().fechaEnvio);
            const formateada = (`${_formatNumber(dateF.getHours())}:${_formatNumber(dateF.getMinutes())}`);
            di.innerHTML = `
                        <div class="elqueenvia" >
                        <div>${e.data().mensaje}</div><br>
                        <div style="margin-top: -20px; display:flex; justify-content:end;">${formateada}</div>
                            
                            
                        </div>
                        `;
            
          } else if (e.data().tipoMensaje == 2) {
            di.innerHTML = `
                        <div class="elqueenvia" >
                            <img src="${
                              e.data().fotomensaje
                            }" style="width:100%"/>
                            <br>
                            <br>
                            <div>
                            ${e.data().mensaje}
                            </div>
                        </div>
                        `;
          } else if (e.data().tipoMensaje == 3) {
            di.innerHTML = `
                        <div class="elqueenvia" >                        
                            <a href="${e.data().fotomensaje}" download="${
              e.data().nombreArchivo
            }">
                                <img src="../../img/png/adjunto.png" style="width:30px;margin-right:10px"/>
                            ${e.data().nombreArchivo}
                            </a>
                        </div>
                        `;
          } else if (e.data().tipoMensaje == 4) {
            di.innerHTML = `
                        <div class="elqueenvia" >
                        <audio controls style="width: 100%;">
                        <source src="${e.data().fotomensaje}" type="audio/ogg">
                        <source src="${e.data().fotomensaje}" type="audio/mpeg">
                        Your browser does not support the audio element.
                        </audio>                            
                        </div>`;
          }
          misreportes.appendChild(di);
        } else {
          let di = document.createElement("div");
          di.setAttribute("class", "det_u_c");

          if (e.data().tipoMensaje == 1) {
            const dateF = new Date(e.data().fechaEnvio);
            const formateada = (`${_formatNumber(dateF.getHours())}:${_formatNumber(dateF.getMinutes())}`);
            di.innerHTML = `
                        <div class="elquerecibe" style="margin-left: auto;">
                            <div>${e.data().mensaje}</div><br><div style="margin-top: -20px; display:flex; justify-content:end;">${formateada}</div>
                        </div>
                        `;
          } else if (e.data().tipoMensaje == 2) {
            di.innerHTML = `
                        <div class="elquerecibe" style="margin-left: auto;">
                            <img src="${
                              e.data().fotomensaje
                            }" style="width:100%"/>
                            <br>
                            <br>
                            <div>
                            ${e.data().mensaje}
                            </div>
                        </div>
                        `;
          } else if (e.data().tipoMensaje == 3) {
            di.innerHTML = `
                        <div class="elquerecibe" style="margin-left: auto;">
                            <a href="${e.data().fotomensaje}" download="${
              e.data().nombreArchivo
            }">
                                <img src="../../img/png/adjunto.png" style="width:30px;margin-right:10px"/>
                            ${e.data().nombreArchivo}
                            </a>
                        </div>
                        `;
          } else if (e.data().tipoMensaje == 4) {
            di.innerHTML = `
                        <div class="elquerecibe" style="margin-left: auto;">
                        <audio controls style="width: 100%;">
                        <source src="${e.data().fotomensaje}" type="audio/ogg">
                        <source src="${e.data().fotomensaje}" type="audio/mpeg">
                        Your browser does not support the audio element.
                        </audio>                            
                        </div>`;
          }
          
          misreportes.appendChild(di);
        }
      });
    });
}
function _formatNumber(number) {
  let numberStr = number.toString();
  if (number < 10) {
    numberStr = "0" + numberStr;
  }
  return numberStr;
}
function mostrarChat() {
  let ch = document.querySelector("._ver_chat");
  ch.classList.add("_ver_chat_active");
}
function cerrarChat() {
  let ch = document.querySelector("._ver_chat");
  ch.classList.remove("_ver_chat_active");
}

getSolicitudes();

function enviarMensaje(idSala1,otroChat1){
  let idSala = idSala1
  let mensaje = document.querySelector(".mensaje").value
  let milisegundos = Math.round(new Date().getTime())
  
  let fecha = new Date()
  let fora = (`${fecha.getFullYear()}-${_formatNumber(fecha.getMonth()+1)}-${_formatNumber(fecha.getDate())} ${ _formatNumber(fecha.getHours())}:${_formatNumber(fecha.getMinutes())}:${_formatNumber(fecha.getSeconds())}`)
  
  
  if(mensaje != ''){
    try {
      db.runTransaction((transaction) => {
        console.log("logrado")
        
        transaction.set(
          
          db.collection('mensajes')
          .doc(`${milisegundos}`+'_admin_1'),
          {
            "idSala":idSala,
            'enviado_por':"admin_1",
            'envioMilisegundos':milisegundos,
            'eliminado':0,
            'fechaEnvio':fora,
            'fotomensaje':'',
            'mensaje':mensaje,
            'extArchivo':'',
            'nombreArchivo':'',
            'duracion':0,
            'tipoMensaje':1,
            'vistoEmisor':true,
            'vistoReceptor':false
          }          
        )
        transaction.update(
          db.collection('salas').doc(idSala),{
            'ultimoMensajeContenido':mensaje,
            'ultimoMensajeFecha':toString(fecha),
            'ultimoMensajeMilisegundos':milisegundos,
            'ultimoMensajeTipo':1,
            'cantidadMensajes':1,
          }
        )
        return Promise.resolve();
      })
      .catch(err => {
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    } 
  }
  document.getElementById("mensaje").value = ""
  cerrarChat();
  verChat(idSala,otroChat1);
   /*  $( "#ver_chat" ).load(window.location.href + " #espacio_chat" ); */


}