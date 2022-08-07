// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
async function usuarios(){
  var profesionales = await db.collection("usuarios")
  .where('app',"==",1)
  .get();

  var pacientes = await db.collection("usuarios").where('app',"==",2).get();

  var solicitud = await db.collection("pro_solicitudes").where('estado',"==",0).get();

  var total = profesionales.size + pacientes.size + solicitud.size;
  console.log(total)

  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Profesionales: %", "Pacientes: %", "Solicitudes: %"],
      datasets: [{
        data: [Math.round(((profesionales.size)*100)/total), Math.round(((pacientes.size)*100)/total), Math.round(((solicitud.size)*100)/total)],
        backgroundColor: ['#7239ea', '#6659FF', '#50cd89'],
        hoverBackgroundColor: ['#7239ea', '#6659FF', '#50cd89'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
  
}
usuarios();
