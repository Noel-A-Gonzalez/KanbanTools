var reportes = function(){
	
	var initEvents = function(){
		$(document).ready(function(){
			user.verifyUser();
			getDataTable();
			initReport();
		});
	}

	/*Obtiene los datos de la base para llenar la tabla*/
	var getDataTable = function(){
		$.get("../report/getDataTable")
		.done(function(data){
			var num = 0;

    		for(i=0;i<data.length;i++){
    			num++;
    			var fechaI = moment(data[i].out_fec_inicio).add(1, 'day');
    			var fechaInicio = moment(fechaI).format('DD/MM/YYYY');
    			var fechaF = moment(data[i].out_fec_fin).add(1, 'day');
    			var fechaFin = moment(fechaF).format('DD/MM/YYYY');
			    $('#tblReport>tbody').append(
                    '<tr>'+
	                    '<td>Tarea '+ num +'</td>'+
	                    '<td>'+data[i].out_title+'</td>'+
	                    '<td>'+fechaInicio+'</td>'+
	                    '<td>'+fechaFin+'</td>'+
	                    '<td>'+(data[i].out_cant_dias+1) +'</td>'+
                    '</tr>');
                $(".btn-save").hide();
                $(".loading").hide();
			}
			$("#tblReport").DataTable();
		})
	}

	var initReport = function(){
		$.get("../report/getDataReport")
		.done(function(data){
			var dataJSON = jQuery.parseJSON(data[0].sp_report_posit_ini_fin);
			$('#container').highcharts({
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: 'Tiempo de progreso de las tareas finalizadas'
		        },
		        subtitle: {
		            text: 'Click en cada columna para ver mas información..'
		        },
		        xAxis: {
		            type: 'category'
		        },
		        yAxis: {
		            title: {
		                text: 'Total de días desde su inicio a su fin'
		            }

		        },
		        legend: {
		            enabled: true
		        },
		        plotOptions: {
		            series: {
		                borderWidth: 0,
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.y:.0f}'
		                }
		            }
		        },

		        tooltip: {
		            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> dias<br/>'
		        },

		        series: [{
		            name: 'Tareas',
		            colorByPoint: true,
		            data: dataJSON
		        }],
		        drilldown: {
		            series: [{
		                name: '1',
		                id: '1',
		                data: [
		                    [
		                        'TO-DO',
		                        24
		                    ],
		                    [
		                        'DOING',
		                        17
		                    ],
		                    [
		                        'VERIFY',
		                        5
		                    ],
		                    [
		                        'DONE',
		                        6
		                    ]
		                ]
		            }, {
		                name: '3',
		                id: '3',
		                data: [
		                    [
		                        'TO-DO',
		                        5
		                    ],
		                    [
		                        'DOING',
		                        4
		                    ],
		                    [
		                        'VERIFY',
		                        3
		                    ],
		                    [
		                        'DONE',
		                        7
		                    ]
		                ]
		            }]
		        }
		    });

		});	 
	}


	return{
		initEvents:initEvents,
	}
}();
reportes.initEvents();