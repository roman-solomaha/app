const router = require('express').Router();
import Category from '../schemas/Category';

router.get('/list', (req, res) => {
	return Category.find((err, categories) => {
		if (err) {
			res.statusCode = 500;
			console.error('Internal error(%d): %s', res.statusCode, err.message);
			return res.send({error: 'Server error'});
		}

		if (!categories.length) {
			const category = new Category({
				name: 'first',
				title: 'First category'
			});

			category.save(err => {
				if (err) {
					console.log(err);
					if (err.name == 'ValidationError') {
						res.statusCode = 400;
						res.send({error: 'Validation error'});
					} else {
						res.statusCode = 500;
						res.send({error: 'Server error'});
					}
					return console.error('Internal error(%d): %s', res.statusCode, err.message);
				}
			});
		}

		return res.send(categories);
	});
});

router.get('/item', (req, res) => {
	return Category.find({name: req.query.name}, (err, category) => {
		if (err) {
			res.statusCode = 500;
			console.error('Internal error(%d): %s', res.statusCode, err.message);
			return res.send({error: 'Server error'});
		}
		if (!category.length) {
			res.statusCode = 404;
			return res.send({error: 'Not found'});
		}
		console.log(category);
		return res.send({status: 'OK', category});
	});
});

router.get('/create', (req, res) => {
	const category = new Category({
		name: req.query.name,
		title: req.query.title
	});

	category.save(err => {
		if (err) {
			console.log(err);
			if (err.name == 'ValidationError') {
				res.statusCode = 400;
				res.send({error: 'Validation error'});
			} else {
				res.statusCode = 500;
				res.send({error: 'Server error'});
			}
			return console.error('Internal error(%d): %s', res.statusCode, err.message);
		}
		console.info('category created');
		return res.send({status: 'OK', category});
	});
});

router.get('/update', (req, res) => {
	const condition = {name: req.query.name};
	const values = {
		title: req.query.title,
		updated: Date.now()
	};

	return Category.findOneAndUpdate(condition, values, {new: true}, (err, category) => {
		if (!category) {
			res.statusCode = 404;
			return res.send({error: 'Not found'});
		}

		if (!err) {
			console.info("category updated");
			return res.send(category);
		} else {
			if (err.name == 'ValidationError') {
				res.statusCode = 400;
				res.send({error: 'Validation error'});
			} else {
				res.statusCode = 500;
				console.error('Internal error(%d): %s', res.statusCode, err.message);
				return res.send({error: 'Server error'});
			}
			console.error('Internal error(%d): %s', res.statusCode, err.message);
		}
	});
});

router.get('/delete', (req, res) => {
	return Category.findOne({name: req.query.name}, (err, category) => {
		if (err) {
			res.statusCode = 500;
			console.error('Internal error(%d): %s', res.statusCode, err.message);
			return res.send({error: 'Server error'});
		}

		if (!category) {
			res.statusCode = 404;
			return res.send({error: 'Not found'});
		}
		return category.remove(err => {
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
