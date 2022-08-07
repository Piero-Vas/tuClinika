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
    infoEmpty: "Pagoas 0",
    infoFiltered: "(de _MAX_ )",
    info: "Pagos _TOTAL_ ",
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
        if (data.fotoPro == "") {
          mifoto = "../../img/png/person.png";
        } else {
          mifoto = data.fotoPro;
        }
        return `   
                        <div style="display:flex" class="align-items-center">
                        <div style="position:relative">
                            <img src="${mifoto}" class="img_foto_prof"/>
                            
                        </div>                     
                        <div>
                        <div class="nombre_solicitud">
                        ${data.nombrePro}
                        </div>
                        </div>
                        </div>

                        `;
      },
    },
    {
      width: "280px",
      data: null,
      createdCell: function (td, cellData, rowData, row, col) {
        // $(td).css('text-align', 'center');
        $(td).css("vertical-align", "middle");
      },
      render: function (data, type, full, meta) {
        let mifoto;
        if (data.foto == "") {
          mifoto = "../../img/png/person.png";
        } else {
          mifoto = data.foto;
        }
        return `<div style="display:flex" class="align-items-center">
        <div style="position:relative">
            <img src="${mifoto}" class="img_foto_prof"/>
            
        </div>                     
        <div>
        <div class="nombre_solicitud">
        ${data.nombrePro}
        </div>
        </div>
        </div>

        `;
      },
    },
    {
      width: "280px",
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
        var today = new Date(data.fechaPagoCita);

        let dia = today.toLocaleDateString("es-ES", options);
        let ray = today.toLocaleDateString("es-ES");
        let a = new Date(data.fechaPagoCita);
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
                        <div class="nombre_solicitud"   title="${dia}">
                            ${ray}
                        </div>
                        <div class="correo_solicitud">${horas}:${minutow}</div>
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
        $(td).css("text-align", "center");
      },
      render: function (data, type, full, meta) {
        return `
                <div>
                <div class="nombre_solicitud">
                S/. ${data.precio} 
                </div>
           </div>
                `;
      },
    },
    
  ],
});

function getSolicitudes() {
  db.collection("citas")
    .where("estadoUser", "!=", "Inactivo")
    /* .orderBy("fechaRegistroMilisegundos", "desc") */
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




getSolicitudes();

