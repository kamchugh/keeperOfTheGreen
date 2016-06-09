var express = require('express');
var router = express.Router();
var employeeCtrl = require('../../app_api/controllers/employeeCtrl');

router.get('/', employeeCtrl.showAll);

router.get('/:id', employeeCtrl.show);

router.post('/', employeeCtrl.create);

router.delete('/:id', employeeCtrl.destroy);

router.put('/:id', employeeCtrl.update);

module.exports = router;