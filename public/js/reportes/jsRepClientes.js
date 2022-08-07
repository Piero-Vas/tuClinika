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
    infoEmpty: "Profesiones 0",
    infoFiltered: "(de _MAX_ )",
    info: "Profesiones _TOTAL_ ",
  },
  columns: [
    {
      width: "280px",
      data: null,
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).css("vertical-align", "middle");
      },
      render: function (data, type, full, meta) {
        let mifoto;
        if (data.foto == "") {
          mifoto = "../../img/png/person.png";
        } else {
          mifoto = data.foto;
        }
        let color;
        if (data.statusConnexion == true) {
          color = "#50cd89";
        } else {
          color = "#cdcdcd";
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

                        `;
      },
    },
    {
      width: "100px",
      data: null,
      createdCell: function (td, cellData, rowData, row, col) {
        // $(td).css('text-align', 'center');
        $(td).css("vertical-align", "middle");
      },
      render: function (data, type, full, meta) {
        return `
                <div>
                <div class="nombre_solicitud">
                ${data.pass} 
                </div>
                
           </div>
                `;
      },
    },
    {
      width: "100px",
      data: null,
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).css("text-align", "center");
        $(td).css("vertical-align", "middle");
      },
      render: function (data, type, full, meta) {
        var options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        var today = new Date(data.fechaRegistro);

        let dia = today.toLocaleDateString("es-ES", options);
        let ray = today.toLocaleDateString("es-ES");
        let a = new Date(data.fechaRegistro);
        let horas =
          a.getHours().toString().length == 1
            ? `0${a.getHours()}`
            : a.getHours();
        let minutow =
          a.getMinutes().toString().length == 1
            ? `0${a.getMinutes()}`
            : a.getMinutes();
        return `
                    <div>
                        <div class="pais_solicitud"   title="${dia}">
                            ${ray}
                        </div>
                        <div class="correo_solicitud">${horas}:${minutow}</div>
                    </div>
                `;
      },
    },
    {
      width: "40px",
      data: null,
      createdCell: function (td, cellData, rowData, row, col) {
        // $(td).css('text-align', 'center');
        $(td).css("vertical-align", "middle");
      },
      render: function (data, type, full, meta) {
        return `
                <div>
                <div class="nombre_solicitud">
                ${data.pais} 
                </div>
                <div class="correo_solicitud">${data.ciudad}</div>
           </div>
                `;
      },
    },
    {
      width: "40px",
      data: null,
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).css("text-align", "center");
        $(td).css("vertical-align", "middle");
      },
      render: function (data, type, full, meta) {
        let estadoS;
        let color;
        if (data.eliminado == 0) {
          estadoS = "Activo";
          color = "success";
        } else if (data.eliminado == 1) {
          estadoS = "Inactivo";
          color = "danger";
        }
        return `
                <button  title="Cambiar estado"  class="btn btn-primary btn-primary-clinika btn-sm btn-icon-split" onclick="cambiarEstadoEliminado('${data.docUsuario}','${data.eliminado}')">
                <span class="badge btn-${color}-light-clinika text-${color}" style="padding:5px 8px;font-size:10px">${estadoS}</span>
                </button>
                `;
      },
    },
    {
      width: "20px",
      data: null,
      createdCell: function (td, cellData, rowData, row, col) {
        $(td).css("text-align", "center");
        $(td).css("vertical-align", "middle");
      },
      render: function (data, type, full, meta) {
        return `
                
                <button  title="Ver detalles"  class="btn btn-primary btn-primary-clinika btn-sm btn-icon-split" onclick="verModalDetalle(this,'${data.docUsuario}')">
                    <span class="icon text-primary">
                        <i class="fas fa-eye"></i>
                    </span>
                </button>
                <button  title="Ver detalles"  class="btn btn-primary btn-primary-clinika btn-sm btn-icon-split" onclick="verModalCitas(this,'${data.docUsuario}')">
                    <span class="icon text-primary">
                    <i class="fa fa-clipboard"></i>
                    </span>
                </button>
                
                `;
      },
    },
  ],
});

function getSolicitudes() {
  db.collection("usuarios")
    .where("tipoUsuario", "==", 2)
    .orderBy("fechaRegistroMilisegundos", "desc")
    .onSnapshot((querySnapshot) => {
      let miarray = [];
      querySnapshot.forEach((doc) => {
        miarray.push(doc.data());
      });
      console.log(miarray);
      oTable_Solicitudes.clear().rows.add(miarray).draw();
    });
}

function _formatNumber(number) {
  let numberStr = number.toString();
  if (number < 10) {
    numberStr = "0" + numberStr;
  }
  return numberStr;
}

function modalCrearProfesional() {
  $("#_modal_create_profesional").modal("show");
}

function verModalDetalle(ele, id) {
  getDetailProfie(id);
  $("#_ver_detail_modal").modal("show");
}
function verChats() {
  getDetailChats();
  $("#_ver_detail_modal_4").modal("show");
}

function verModalCitas(ele, id) {
  getDetailCitas(id);

  $("#_ver_detail_modal_2").on("hidden.bs.modal", function () {
    document.querySelector(".cita_profesional").innerHTML =
      "Seleccione una cita";
    document.querySelector(".cita_hora").innerHTML = "Seleccione una cita";
    document.querySelector(".cita_monto").innerHTML = "Seleccione una cita";
    document.querySelector(".cita_motivo").innerHTML = "Seleccione una cita";
    document.querySelector(".cita_descripcion").innerHTML =
      "Seleccione una cita";
    document.querySelector(".avatar_cita_detail").setAttribute("src", "");
  });
}

function getDetailCitas(docUsuario) {
  db.collection("citas")
    .where("user", "==", docUsuario)
    .where("estadopro", "==", "false")
    // .orderBy("fechaRegistroMilisegundos", "desc")
    .get()
    .then((querySnapshot) => {
      //No cuenta con Pagos disponibles
      //No tiene historial de Citas
      if (querySnapshot.docs.length != 0) {
        $("#_ver_detail_modal_2").modal("show");
        let miscitas = document.querySelector(".detalle_citas");
        miscitas.innerHTML = "";
        querySnapshot.docs.forEach((e) => {
          const date = new Date(e.data().fecha);
          const dateF = `${_formatNumber(date.getDate())}/${_formatNumber(
            date.getMonth() + 1
          )}/${date.getFullYear()}`;
          let text = "La cita";
          let pro =
            e.data().estadoVencido == "false" &&
            (e.data().estadoUser == "Liberado" ||
              e.data().estadoUser == "Activo")
              ? " fue realizada"
              : e.data().estadoVencido == "true" &&
                (e.data().estadoUser == "Liberado" ||
                  e.data().estadoUser == "Activo")
              ? " no se realizo a tiempo"
              : e.data().estadoUser == "Activo" && e.data().estadoVencido == ""
              ? " se encuentra disponible"
              : e.data().estadoUser == "Inactivo" &&
                e.data().estadoVencido == ""
              ? " esta pendiente de pago"
              : e.data().estadoUser == "Inactivo" &&
                e.data().estadoVencido == "true"
              ? " no fue pagada a tiempo"
              : "";

          let di = document.createElement("div");
          di.setAttribute("class", "det_c");
          di.innerHTML = `
                
                <div class="d-flex justify-content-between align-items-center" style="margin-bottom:20px; padding-bottom: 10px;">
                <div class="d-flex align-items-center">
                <div>
                    <img class="img_prof" src="${
                      e.data().fotoPro == ""
                        ? "../../img/png/person.png"
                        : e.data().fotoPro
                    }" />
                </div>
                <div>
                    <div class="nombreProf">
                    ${e.data().nombrePro}
                    </div>
                    <div class="ubigeo_prof">
                    <i>${e.data().hora}</i>
                    </div>
                </div>
                </div>
                <div>
                <button  title="Ver detalles"  class="btn btn-sm btn-primary shadow-sm " onclick="verCita('${
                  e.data().nombrePro
                }','${dateF}','${e.data().precio}','${e.data().motivo}','${
            text + pro
          }','${e.data().fotoPro}' )">
                Más detalles   
                <span class="icon text-light ml-1">
                    <i class="fa fa-plus"></i>
                </span>
                </button>
                </div>
            </div>
                `;
          miscitas.appendChild(di);
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "No tiene historial de Citas",
          showConfirmButton: false,
          timer: 1500,
        });

        $("#_ver_detail_modal_2").modal("hide");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function verCita(profesional, hora, monto, motivo, des, foto) {
  document.querySelector(".cita_profesional").innerHTML = profesional;
  document.querySelector(".cita_hora").innerHTML = hora;
  document.querySelector(".cita_monto").innerHTML = "S/. " + monto;
  document.querySelector(".cita_motivo").innerHTML = motivo;
  document.querySelector(".cita_descripcion").innerHTML = des;
  document.querySelector(".avatar_cita_detail").setAttribute("src", foto);
  console.log(foto);
}

function getDetailChats() {
  
    let docUser = aver("docUsuario");
  let mischat = document.querySelector(".chats");
  mischat.innerHTML = "";
  // document.querySelector('.repo_c').innerHTML = `( ${querySnapshot.data().bloqueos.length} )`

  db.collection("salas")
    .where("usuariosChat", "array-contains", docUser)
    .get()
    .then((value) => {
            value.docs.forEach((e) => {
        let misChatusu = [];
        e.data().usuariosChat.forEach((e) => {
          if (e != docUser) {
            misChatusu.push(e);
          }
        });
        
        db.collection("usuarios")
          .where("docUsuario", "==", misChatusu[0])
          .get()
          .then((value) => {
            
            let di = document.createElement("div");
            di.setAttribute("class", "det_u");
            di.setAttribute("style", "cursor:pointer");
            di.setAttribute("idSala", e.data().idSala);
            di.setAttribute("otroChat", misChatusu[0]);
            di.setAttribute("miChat", docUser);
            di.setAttribute("onclick", "verChat2(this)");
            if (value.docs[0].data().eliminado == 0) {
                estadoS = "Activo";
                color = "success";
              } else if (value.docs[0].data().eliminado == 1) {
                estadoS = "Inactivo";
                color = "danger";
              }
              
            di.innerHTML = `
            
                        <div class="d-flex" style="padding-bottom: 10px;border-bottom: 1px #e3e3e3 solid;">
                            <div>
                                <img class="img_prof" src="${
                                  value.docs[0].data().foto == ""
                                    ? "../../img/png/person.png"
                                    : value.docs[0].data().foto
                                }" />
                            </div>
                            <div>
                                <div class="nombreProf">
                                ${
                                  value.docs[0].data().nombres +
                                  " " +
                                  value.docs[0].data().apellidos
                                }
                                </div>
                                <div class="ubigeo_prof">
                                <i>${value.docs[0].data().email}</i>
                                <span class="badge btn-${color}-light-clinika text-${color}" style="margin-left:10px; padding:5px 8px;font-size:10px">${estadoS}</span>
                            </div>
                        </div>
                        `;
                        mischat.appendChild(di)
          });
      });
    });
}
function getDetailProfie(docUsuario) {
  db.collection("calificacion")
    .where("docCalifica", "==", docUsuario)
    .get()
    .then((querySnapshot) => {
      document.querySelector(".rating_").innerHTML = querySnapshot.size;
      document.querySelector(".op_c").innerHTML = `( ${querySnapshot.size} )`;
      let mirating = document.querySelector(".rating_u");
      mirating.innerHTML = "";
      let nombreProf = "";
      querySnapshot.docs.forEach((e) => {
        let di = document.createElement("div");
        di.setAttribute("class", "det_u");
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
            `;
        mirating.appendChild(di);
      });
    });

  db.collection("usuarios")
    .doc(docUsuario)
    .get()
    .then((querySnapshot) => {
      let miarray = [];

      document.querySelector(".nombre_user").innerHTML =
        querySnapshot.data().nombres + " " + querySnapshot.data().apellidos;
      document.querySelector(".ubi_user").innerHTML =
        querySnapshot.data().pais + "-" + querySnapshot.data().ciudad;
      document.querySelector(".descripcion_user").innerHTML =
        querySnapshot.data().sobremi == ""
          ? "Sin descripción"
          : querySnapshot.data().sobremi;
      document.querySelector(".edad_").innerHTML = querySnapshot.data().edad;

      document.querySelector(".correo_").value = querySnapshot.data().email;
      document.querySelector(".edadV_").value = querySnapshot.data().edad;
      document.querySelector(".altura_").value =
        querySnapshot.data().altura + "cm";
      document.querySelector(".peso_").value = querySnapshot.data().peso + "kg";

      let enfermedades = document.querySelector(".enfermedades_u");
      enfermedades.innerHTML = "";
      document.querySelector(".en_c").innerHTML = `( ${
        querySnapshot.data().enfermedades.length
      } )`;
      querySnapshot.data().enfermedades.forEach((e) => {
        let di = document.createElement("div");
        di.setAttribute("class", "det_u");
        di.innerHTML = " - " + e;
        enfermedades.appendChild(di);
      });

      let alergias = document.querySelector(".alergias_u");
      alergias.innerHTML = "";
      document.querySelector(".al_c").innerHTML = `( ${
        querySnapshot.data().alergias.length
      } )`;
      querySnapshot.data().alergias.forEach((e) => {
        let di = document.createElement("div");
        di.setAttribute("class", "det_u");
        di.innerHTML = " - " + e;
        alergias.appendChild(di);
      });

      let tratamientos = document.querySelector(".tratamientos_u");
      tratamientos.innerHTML = "";
      document.querySelector(".tra_c").innerHTML = `( ${
        querySnapshot.data().tratamientos.length
      } )`;
      querySnapshot.data().tratamientos.forEach((e) => {
        let di = document.createElement("div");
        di.setAttribute("class", "det_u");
        di.innerHTML = " - " + e;
        tratamientos.appendChild(di);
      });

      let antecedentes = document.querySelector(".antecedentes_u");
      antecedentes.innerHTML = "";
      document.querySelector(".ant_c").innerHTML = `( ${
        querySnapshot.data().antecedentes.length
      } )`;
      querySnapshot.data().antecedentes.forEach((e) => {
        let di = document.createElement("div");
        di.setAttribute("class", "det_u");
        di.innerHTML = " - " + e;
        antecedentes.appendChild(di);
      });

      let suscripcion = document.querySelector(".suscripciones_u");
      suscripcion.innerHTML = "";
      db.collection("suscripcion")
        .where("docUsuario", "==", docUsuario)
        .get()
        .then((valor) => {
          document.querySelector(
            ".sc_c"
          ).innerHTML = `( ${valor.docs.length} )`;
          valor.docs.forEach((e) => {
            let di = document.createElement("div");
            di.setAttribute("class", "det_u");
            const dateA = new Date();
            const dateF = new Date(e.data().fechaFin);
            const dateI = new Date(e.data().fechaInicio);
            di.innerHTML = `
            <div class="d-flex" style="padding-bottom: 10px;border-bottom: 1px #e3e3e3 solid;">
                            <div>
                                <div class="nombreProf">
                                ${e.data().nombre}
                                </div>
                                <div class="ubigeo_prof">
                                <i>De: ${_formatNumber(
                                  dateI.getDate()
                                )}/${_formatNumber(
              dateI.getMonth() + 1
            )}/${dateI.getFullYear()}</i>
                                <i>Hasta: ${_formatNumber(
                                  dateF.getDate()
                                )}/${_formatNumber(
              dateF.getMonth() + 1
            )}/${dateF.getFullYear()}</i>
                                </div>
                            </div>
                        </div>
            `;
            suscripcion.appendChild(di);
          });
        });

      let mischat = document.querySelector(".chat_u");
      mischat.innerHTML = "";
      // document.querySelector('.repo_c').innerHTML = `( ${querySnapshot.data().bloqueos.length} )`

      db.collection("salas")
        .where("usuariosChat", "array-contains", docUsuario)
        .get()
        .then((value) => {
          document.querySelector(
            ".ch_c"
          ).innerHTML = `( ${value.docs.length} )`;

          value.docs.forEach((e) => {
            let misChatusu = [];
            e.data().usuariosChat.forEach((e) => {
              if (e != docUsuario) {
                misChatusu.push(e);
              }
            });

            db.collection("usuarios")
              .where("docUsuario", "==", misChatusu[0])
              .get()
              .then((value) => {
                let di = document.createElement("div");
                di.setAttribute("class", "det_u");
                di.setAttribute("style", "cursor:pointer");
                di.setAttribute("idSala", e.data().idSala);
                di.setAttribute("otroChat", misChatusu[0]);
                di.setAttribute("miChat", docUsuario);
                di.setAttribute("onclick", "verChat(this)");
                di.innerHTML = `
                        <div class="d-flex" style="padding-bottom: 10px;border-bottom: 1px #e3e3e3 solid;">
                            <div>
                                <img class="img_prof" src="${
                                  value.docs[0].data().foto == ""
                                    ? "../../img/png/person.png"
                                    : value.docs[0].data().foto
                                }" />
                            </div>
                            <div>
                                <div class="nombreProf">
                                ${
                                  value.docs[0].data().nombres +
                                  " " +
                                  value.docs[0].data().apellidos
                                }
                                </div>
                                <div class="ubigeo_prof">
                                <i>${value.docs[0].data().email}</i>
                                </div>
                            </div>
                        </div>
                        `;
                mischat.appendChild(di);
              });
          });
        });

      db.collection("suscripcion")
        .where("docUsuario", "==", docUsuario)
        .get()
        .then((value) => {
          document.querySelector(".detalles_con_sub").innerHTML = "";
          let suscripcion = document.querySelector(".detalles_con_sub");
          const dateA = new Date();
          const dateF = new Date(value.docs[0].data().fechaFin);
          const dateI = new Date(value.docs[0].data().fechaInicio);
          console.log(dateI);
          console.log(dateF);
          var day1 = Date.UTC(
            dateF.getFullYear(),
            dateF.getMonth() + 1,
            dateF.getDate()
          );
          var day2 = Date.UTC(
            dateA.getFullYear(),
            dateA.getMonth() + 1,
            dateA.getDate()
          );
          days = 1000 * 3600 * 24;
          let diferencia = (day2 - day1) / days;
          let positivo = diferencia * -1;

          let di = document.createElement("div");
          di.setAttribute("class", "card_detail col-12");
          di.innerHTML = `
                <div class="suscripcion_title col-md-12">
                    Detalles de Suscripción
                    <i class="fas fa-star ml-2" style="color: rgb(231, 231, 0);"></i>
                </div>
                <div class="row">
                    <div class="detalles_sub col-md-12 col-12">

                        <div class="suscripcion_user col-md-6">
                            Precio :                
                        </div>
                        <div class="detalle_sub col-md-6">
                            <div class="precios"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="detalles_sub col-md-12 col-12">

                        <div class="suscripcion_user col-md-6">
                            Suscripción :                
                        </div>
                        <div class="detalle_sub col-md-6">
                            <div class="sub">

                            </div>       
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="detalles_sub col-md-12 col-12">

                        <div class="suscripcion_user col-md-6">
                            Fecha Inicio :                
                        </div>
                        <div class="detalle_sub col-md-6">
                            <div class="fechaI"></div>      
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="detalles_sub col-md-12 col-12">

                        <div class="suscripcion_user col-md-6">
                            Fecha Final :                
                        </div>
                        <div class="detalle_sub col-md-6">
                            <div class="fechaF"></div>      
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="detalles_sub col-md-12 col-12">

                        <div class="suscripcion_user col-md-6">
                            Días Restantes :                
                        </div>
                        <div class="detalle_sub col-md-6">
                            <div class="diasR"></div>     
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="detalles_sub col-md-12 col-12">

                        <div class="suscripcion_user col-md-6">
                            Tipo de Suscripción :                
                        </div>
                        <div class="detalle_sub col-md-6">
                            <div class="tipoS"></div>       
                        </div>
                    </div>
                </div>
                `;
          suscripcion.appendChild(di);
          document.querySelector(".detalles_sin_sub").innerHTML = "";
          document.querySelector(".precios").innerHTML =
            value.docs[0].data().precio == ""
              ? "No"
              : value.docs[0].data().precio;
          console.log(value.docs[0].data().precio);
          document.querySelector(".sub").innerHTML =
            value.docs[0].data().activo == false ? "No" : "Activa";
          document.querySelector(".fechaI").innerHTML =
            value.docs[0].data().fechaInicio == ""
              ? "No"
              : `${_formatNumber(dateI.getDate())}/${_formatNumber(
                  dateI.getMonth() + 1
                )}/${dateI.getFullYear()}`;
          document.querySelector(".fechaF").innerHTML =
            value.docs[0].data().fechaFin == ""
              ? "No"
              : `${_formatNumber(dateF.getDate())}/${_formatNumber(
                  dateF.getMonth() + 1
                )}/${dateF.getFullYear()}`;
          document.querySelector(".diasR").innerHTML =
            diferencia < 0 ? positivo + " días" : 0 + " días";
          document.querySelector(".tipoS").innerHTML =
            value.docs[0].data().nombre == ""
              ? "No"
              : value.docs[0].data().nombre;
        })
        .catch((error) => {
          document.querySelector(".detalles_sin_sub").innerHTML = "";
          console.log(error);
          let suscripcion = document.querySelector(".detalles_sin_sub");
          let di = document.createElement("div");
          di.setAttribute("class", "txt col-12");
          di.innerHTML = `
                <div class="suscripcion_title col-md-12">
                   No tiene una Suscripción
                </div>
                `;
          suscripcion.appendChild(di);
          document.querySelector(".detalles_con_sub").innerHTML = "";
        });

      let bloqueados = document.querySelector(".bloqueo_u");
      bloqueados.innerHTML = "";
      document.querySelector(".bl_c").innerHTML = `( ${
        querySnapshot.data().bloqueos.length
      } )`;
      querySnapshot.data().bloqueos.forEach((e) => {
        db.collection("usuarios")
          .where("docUsuario", "==", e)
          .get()
          .then((value) => {
            let di = document.createElement("div");
            di.setAttribute("class", "det_u");
            di.innerHTML = `
                <div class="d-flex" style="padding-bottom: 10px;border-bottom: 1px #e3e3e3 solid;">
                    <div>
                        <img class="img_prof" src="${
                          value.docs[0].data().foto == ""
                            ? "../../img/png/person.png"
                            : value.docs[0].data().foto
                        }" />
                    </div>
                    <div>
                        <div class="nombreProf">
                        ${
                          value.docs[0].data().nombres +
                          " " +
                          value.docs[0].data().apellidos
                        }
                        </div>
                        <div class="ubigeo_prof">
                        ${
                          value.docs[0].data().pais +
                          " - " +
                          value.docs[0].data().ciudad
                        }
                        </div>
                    </div>
                </div>
                `;
            bloqueados.appendChild(di);
          });
      });

      let misreportes = document.querySelector(".reportes_u");
      misreportes.innerHTML = "";
      // document.querySelector('.repo_c').innerHTML = `( ${querySnapshot.data().bloqueos.length} )`

      db.collection("reporte")
        .where("docEnvia", "==", docUsuario)
        .get()
        .then((value) => {
          document.querySelector(
            ".repo_c"
          ).innerHTML = `( ${value.docs.length} )`;
          value.docs.forEach((e) => {
            db.collection("usuarios")
              .where("docUsuario", "==", e.data().docRecibe)
              .get()
              .then((value) => {
                let di = document.createElement("div");
                di.setAttribute("class", "det_u");
                di.innerHTML = `
                        <div class="d-flex" style="padding-bottom: 10px;border-bottom: 1px #e3e3e3 solid;">
                            <div>
                                <img class="img_prof" src="${
                                  value.docs[0].data().foto == ""
                                    ? "../../img/png/person.png"
                                    : value.docs[0].data().foto
                                }" />
                            </div>
                            <div>
                                <div class="nombreProf">
                                ${
                                  value.docs[0].data().nombres +
                                  " " +
                                  value.docs[0].data().apellidos
                                }
                                </div>
                                <div class="ubigeo_prof">
                                <i>${e.data().contenido}</i>
                                </div>
                            </div>
                        </div>
                        `;
                misreportes.appendChild(di);
              });
          });
        });

      let miFoto =
        querySnapshot.data().foto == ""
          ? "../../img/png/person.png"
          : querySnapshot.data().foto;
      document.querySelector(".avatar_user_detail").setAttribute("src", miFoto);
      if (querySnapshot.data().statusConnexion == true) {
        document
          .querySelector(".online_detail")
          .setAttribute("style", "background:#50cd89");
      } else {
        document
          .querySelector(".online_detail")
          .setAttribute("style", "background:#cdcdcd");
      }

      // querySnapshot.forEach((doc) => {

      //     console.log(doc.data())
      // });
    });
  db.collection("salas")
    .where("usuariosChat", "array-contains", docUsuario)
    // .where("idUsuario","==",idUsuario)
    .get()
    .then((querySnapshotR) => {
      document.querySelector(".chats_").innerHTML = querySnapshotR.size;
    });
}

function verChat(elemento) {
  let idSala = elemento.getAttribute("idSala");
  let otroChat = elemento.getAttribute("otroChat");
  let miChat = elemento.getAttribute("miChat");

  document.querySelector(".espacio_chat").innerHTML = `
    <div style="width:100%;text-align:center">
        <div class="spinner-border text-primary mt-4" role="status">
            <span class="sr-only">Loading...</span>
        </div> 
    </div>
`;
  mostrarChat();

  let misreportes = document.querySelector(".espacio_chat");

  db.collection("mensajes")
    .where("idSala", "==", idSala)
    .get()
    .then((value) => {
      misreportes.innerHTML = "";
      console.log(value.docs[0].data());
      value.docs.forEach((e) => {
        if (e.data().enviado_por == otroChat) {
          let di = document.createElement("div");
          di.setAttribute("class", "det_u_c");

          if (e.data().tipoMensaje == 1) {
            const dateF = new Date(e.data().fechaEnvio);
            const formateada = (`${_formatNumber(dateF.getHours())}:${dateF.getMinutes()}`);
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
            const formateada = (`${_formatNumber(dateF.getHours())}:${dateF.getMinutes()}`);
            di.innerHTML = `
                        <div class="elqueenvia" >
                        <div>${e.data().mensaje}</div><br>
                        <div style="margin-top: -20px; display:flex; justify-content:end;">${formateada}</div>
                            
                            
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

function verChat2(elemento) {
  /* $("#_ver_detail_modal_4").modal("hide"); */
    let idSala = elemento.getAttribute("idSala");
    let otroChat = elemento.getAttribute("otroChat");
    let miChat = elemento.getAttribute("miChat");
  
    document.querySelector(".espacio_chat2").innerHTML = `
      <div style="width:100%;text-align:center">
          <div class="spinner-border text-primary mt-4" role="status">
              <span class="sr-only">Loading...</span>
          </div> 
      </div>
  `;
    mostrarChat2();
  
    let misreportes = document.querySelector(".espacio_chat2");
  
    db.collection("mensajes")
      .where("idSala", "==", idSala)
      .get()
      .then((value) => {
        misreportes.innerHTML = "";
        console.log(value.docs[0].data());
        value.docs.forEach((e) => {
          if (e.data().enviado_por == otroChat) {
            let di = document.createElement("div");
            di.setAttribute("class", "det_u_c");
  
            if (e.data().tipoMensaje == 1) {
              const dateF = new Date(e.data().fechaEnvio);
              const formateada = (`${_formatNumber(dateF.getHours())}:${dateF.getMinutes()}`);
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
              const formateada = (`${_formatNumber(dateF.getHours())}:${dateF.getMinutes()}`);
              di.innerHTML = `
                          <div class="elqueenvia" >
                          <div>${e.data().mensaje}</div><br>
                          <div style="margin-top: -20px; display:flex; justify-content:end;">${formateada}</div>
                              
                              
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

function mostrarChat() {
  let ch = document.querySelector("._ver_chat");
  ch.classList.add("_ver_chat_active");
}
function cerrarChat() {
  let ch = document.querySelector("._ver_chat");
  ch.classList.remove("_ver_chat_active");
}

function mostrarChat2() {
  document.querySelector(".titulo").innerHTML = "CHAT"
    let ch = document.querySelector("._ver_chat2");
    ch.classList.add("_ver_chat2_active");
  }
  function cerrarChat2() {
    let ch = document.querySelector("._ver_chat2");
    ch.classList.remove("_ver_chat2_active");
  }



getSolicitudes();


function enviarMensaje(){
  let mensaje = document.querySelector(".input").value
  let milisegundos = Math.round(new Date().getTime()/1000)
  let fecha = new Date()
  
  
  let docUser = aver("docUsuario");

  db.runTransaction((transaction) => {
    transaction.set(

      db.collection('mensaje')
      .doc(toString(milisegundos)+'_'+'admin_1'),
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
  })

  console.log(Math.round(fecha))
}

function cambiarEstadoEliminado(id, estado) {
  Swal.fire({
      title: estado == 1 ? '¿Desea activar al paciente?' : '¿Desea desactivar al paciente?',
      text: estado == 1 ? "El paciente podra ser parte de nuestra familia" : "El paciente dejara de ser parte de nuestra familia",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6659FF',
      cancelButtonColor: '#bbbbbb',
      confirmButtonText: estado == 1 ? 'Si, activar!' : 'Si, desactivar!',
      cancelButtonText: 'Lo pensaré',
  }).then((result) => {
      if (result.isConfirmed) {
          db.collection("usuarios")
              .doc(id)
              .update({
                  "eliminado": estado == 1 ? 0 : 1
              }).then(async (querySnapshot) => {
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Solicitud aprobada!',
                      showConfirmButton: false,
                      timer: 1000
                  });
                  if(estado == 0){
                      
                      $.ajax({
                          type: "POST",
                          url: "https://tuclinika.000webhostapp.com/api/cambioEliminado",
                          data: `{
                            "docUsuario": '${id}',
                            "package": "com.example.tuclinika" ,
                          }`,
                          success: function (result) {
                             console.log(result);
                          },
                          dataType: "json"
                        });
                  }
              })
              .catch((error) => {
                  Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'Error de servidor',
                      showConfirmButton: false,
                      timer: 1000
                  })
              });
      }
  })
}