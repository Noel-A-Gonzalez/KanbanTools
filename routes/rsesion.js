var express = require('express');
	rsession = express.Router();
  	json = require('express-json');

rsession.get('/getSession', function(req, res){
	res.end(req.user);
})

rsession.get('/getSesion', function(req, res){
	var jsonStringify, datos;
	 	data = {};
  		sql = client.query("SELECT u_permiso as permiso, u_username as name, u_surname as ape, u_photo as image FROM app_kanban.users WHERE u_email = ($1)", [req.user], function(err, result) {
		    if (err) {
		      console.error('error running query', err);
		      return;
		    }
	  	});

  	sql.on('row', function(row) {
	    data['permiso'] = row.permiso;
	    data['user'] = req.user;
	    data['name'] = row.name;
	    data['ape'] = row.ape;
	    data['image'] = row.image;
	    jsonStringify = JSON.stringify(data);
	    datos = JSON.parse(jsonStringify);
	    res.jsonp(datos);
  	});
});

rsession.get('/getAllUser', function(req, res){
	var jsonStringify, data;
	 	data = {};
  	sql = client.query("SELECT user_id as userid, u_username as nombre, u_surname as apellido, u_email as email, u_permiso as permiso FROM app_kanban.users", function(err, result) {
	    if (err) {
	        console.log(err);
	        return;
	     }else{
	       	jsonStringify = JSON.stringify(result.rows);
	      	data = JSON.parse(jsonStringify)
	     	res.jsonp(data);
	     }
	});
});

rsession.get('/getDataUser', function(req, res){
	var user = req.user;
	var jsonStringify, data;
	console.log(user);
  	sql = client.query("SELECT * FROM app_kanban.users WHERE u_email = ($1)", [user], function(err, result) {
	    if (err) {
	        console.log(err);
	        return;
	     }else{
	       	jsonStringify = JSON.stringify(result.rows);
	      	data = JSON.parse(jsonStringify)
	     	res.jsonp(data);
	     }
	});
});



module.exports = rsession;