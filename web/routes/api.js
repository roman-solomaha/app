const express = require('express');
const router = express.Router();
const CategoryModel = require('../libraries/mongoose').CategoryModel;

router.get('/categories', function (req, res) {
	return CategoryModel.find(function (err, categories) {
		if (!err) {
			return res.send(categories);
		} else {
			res.statusCode = 500;
			console.error('Internal error(%d): %s', res.statusCode, err.message);
			return res.send({error: 'Server error'});
		}
	});
});

router.post('/categories', function (req, res) {
	const category = new CategoryModel({
		name: req.body.name,
		title: req.body.title,
		items: req.body.items
	});

	category.save(function (err) {
		if (!err) {
			console.info('category created');
			return res.send({status: 'OK', category});
		} else {
			console.log(err);
			if (err.name == 'ValidationError') {
				res.statusCode = 400;
				res.send({error: 'Validation error'});
			} else {
				res.statusCode = 500;
				res.send({error: 'Server error'});
			}
			console.error('Internal error(%d): %s', res.statusCode, err.message);
		}
	});
});

router.get('/categories/:id', function (req, res) {
	return CategoryModel.findById(req.params.id, function (err, category) {
		if (!category) {
			res.statusCode = 404;
			return res.send({error: 'Not found'});
		}
		if (!err) {
			return res.send({status: 'OK', category});
		} else {
			res.statusCode = 500;
			console.error('Internal error(%d): %s', res.statusCode, err.message);
			return res.send({error: 'Server error'});
		}
	});
});

router.put('/categories/:id', function (req, res) {
	return CategoryModel.findById(req.params.id, function (err, category) {
		if (!category) {
			res.statusCode = 404;
			return res.send({error: 'Not found'});
		}

		category.name = req.body.name;
		category.title = req.body.title;
		category.items = req.body.items;
		return category.save(function (err) {
			if (!err) {
				console.info("category updated");
				return res.send({status: 'OK', category});
			} else {
				if (err.name == 'ValidationError') {
					res.statusCode = 400;
					res.send({error: 'Validation error'});
				} else {
					res.statusCode = 500;
					res.send({error: 'Server error'});
				}
				console.error('Internal error(%d): %s', res.statusCode, err.message);
			}
		});
	});
});

router.delete('/categories/:id', function (req, res) {
	return CategoryModel.findById(req.params.id, function (err, category) {
		if (!category) {
			res.statusCode = 404;
			return res.send({error: 'Not found'});
		}
		return category.remove(function (err) {
			if (!err) {
				console.info("category removed");
				return res.send({status: 'OK'});
			} else {
				res.statusCode = 500;
				console.error('Internal error(%d): %s', res.statusCode, err.message);
				return res.send({error: 'Server error'});
			}
		});
	});
});


module.exports = router;
