db.collection("reporte")
.where('visto',"==",false)
.onSnapshot((querySnapshot) => {
let box = document.querySelector('.box_new_reports')
box.innerHTML=""
querySnapshot.forEach((doc) => {
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date(doc.data().fecha);

let dia = today.toLocaleDateString("es-ES", options);

let mes = document.createElement('a')
mes.setAttribute('class','dropdown-item d-flex align-items-center')
mes.setAttribute('href','./Rep_clientes.html')
mes.innerHTML = `
<div class="mr-3">
    <div class="icon-circle bg-primary">
        <i class="fas fa-envelope text-white"></i>
    </div>
</div>
<div>
    <div class="small text-gray-500" style="font-size: 10px;">${dia}</div>
    <p class="font-weight-bold" style="font-size: 11px;line-height: 1.3;">
    ${doc.data().nombreUserReporta} ha reportado a <span style="font-weight:900" class="text-primary"> ${doc.data().nombreUserReportado} </span>
    </p>
    <p class="font-weight-bold" style="font-size: 11px;line-height: 1.3;">
    ${doc.data().contenido}
    </p>
</div>
`
box.appendChild(mes)
});
});

        db.collection("pro_solicitudes")
        .where('estado',"==",0)
        .where('visto',"==",0)
        .orderBy("fechaMilisegundos", "desc")
        .limit(4)
        .onSnapshot((querySnapshot) => {
            let box = document.querySelector('.box_new_messg')
            querySnapshot.forEach((doc) => {
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var today  = new Date(doc.data().fecha);

                let dia = today.toLocaleDateString("es-ES", options);

                let mes = document.createElement('a')
                mes.setAttribute('class','dropdown-item d-flex align-items-center')
                mes.setAttribute('href','./SolicitudProfesional.html')
                mes.innerHTML = `
                <div class="mr-3">
                    <div class="icon-circle bg-primary">
                        <i class="fas fa-envelope text-white"></i>
                    </div>
                </div>
                <div>
                    <div class="small text-gray-500" style="font-size: 10px;">${dia}</div>
                    <p class="font-weight-bold" style="font-size: 11px;line-height: 1.3;">
                    ${doc.data().nombres} ${doc.data().apellidos} ha postulado para <span style="font-weight:900" class="text-primary"> ${doc.data().profesion} </span>
                    </p>
                </div>
                `
                box.appendChild(mes)
            });
            
        });


        if(document.querySelector('._pro_solicitudes_dash')){
            db.collection("pro_solicitudes")
            .where('estado',"==",0)
            .onSnapshot((querySnapshot) => {
                document.querySelector('._pro_solicitudes_dash').innerHTML = querySnapshot.size
            });

        }
       
        if(document.querySelector('._chats_dash')){
            db.collection("suscripcion")
            .where('activo',"==",true)
            .onSnapshot((querySnapshot) => {
                document.querySelector('._chats_dash').innerHTML = querySnapshot.size
            });

        }
        
        if(document.querySelector('._user_pro_dash')){
            db.collection("usuarios")
            .where('app',"==",2)
            .onSnapshot((querySnapshot) => {
                document.querySelector('._user_pro_dash').innerHTML = querySnapshot.size
                    
            });

        }
        if(document.querySelector('._user_pro_online_dash')){
            db.collection("usuarios")
            .where('app',"==",1)
            .onSnapshot((querySnapshot) => {
                document.querySelector('._user_pro_online_dash').innerHTML = querySnapshot.size
                    
            });
        }


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}