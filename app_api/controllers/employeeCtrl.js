var models = require('../models');

// show all products
module.exports.showAll = function(req,res){
	models.Employee.findAll()
		.then(function(employee){
			//res.send(employee);
			res.render('employees', {employee: employee});
		})
		.catch(function(err){
			console.error(err);
			res.status(500);
			res.send(err);
		});
};

// create a product 

module.exports.create = function(req,res) {
    var employee = req.body;
    models.Employee.create(employee)
        .then(function(employee){
            res.sendStatus(201);
        })
        .catch(function(err){
        	res.status(500);
        	res.send(err);
        });
};

// delete a product

module.exports.destroy = function(req,res){
	var id = req.params.id;
	models.Employee.destroy({
		where : {
			employee_id : id
		}
	})
	.then(function(){
		res.sendStatus(202);
	})
	.catch(function(err){
		res.status(500);
		res.send(err);
	})
};

// update a product

module.exports.update = function(req,res){
	
    var updatedEmployee = req.body;
    models.Employee.upsert(updatedEmployee)
        .then(function(){
            res.sendStatus(202);
        });
}; 

// show a single product 

module.exports.show = function(req,res){
	models.Employee.findById(req.params.id, {
		// include : [{
		// 	model : models.position,
		// 	model : models.is_admin
		// }]
	})
		.then(function(employee){
			res.send(employee);
		})
};