var reportes = function(){
	
	var initEvents = function(){
		$(document).ready(function(){
			user.verifyUser();
			getDataTable();
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
	                    '<td>'+data[i].out_cant_dias+'</td>'+
                    '</tr>');
                $(".btn-save").hide();
                $(".loading").hide();
			}
			$("#tblReport").DataTable();
		})
	}


	return{
		initEvents:initEvents,
	}
}();
reportes.initEvents();